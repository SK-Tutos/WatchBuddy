import { useLazyQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { TextInputLabel } from '../components/TextInputLabel';
import { OMDB_API_KEY } from '../constants/api-keys';
import { ItemType } from '../contexts/ListContext';
import useList from '../hooks/useList';
import { GET_BOOK_INFOS } from '../services/getBookInfos';
import { NavigationProps } from '../types/navigator';

type Suggestion = {
  poster: string;
  title: string;
  type: string;
  year: string;
  author?: string;
};

const AddItemScreen = ({
  navigation,
}: {
  navigation: NavigationProps;
}): ReactElement => {
  const { setItemStorage } = useList();

  const [getBookInfos, { loading, error, data }] = useLazyQuery(GET_BOOK_INFOS);

  const shouldFetch = useRef(true);

  const schema = Yup.object({
    type: Yup.string().oneOf(['movie', 'book']).required(),
    title: Yup.string().required('Titre requis'),
    rating: Yup.number()
      .typeError('Note invalide')
      .min(0)
      .max(10)
      .required('Note requise'),
    author: Yup.string().when('type', {
      is: 'book',
      then: () => Yup.string().required("Nom de l'auteur requis"),
      otherwise: () => Yup.string().notRequired(),
    }),
    poster: Yup.string().notRequired(),
    year: Yup.string().notRequired(),
    id: Yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 'movie',
      title: '',
      rating: undefined,
      author: '',
      poster: null,
      year: null,
      id: Math.random().toString(),
    },
    resolver: yupResolver(schema),
  });

  const type = watch('type');
  const title = watch('title');
  const poster = watch('poster');
  const year = watch('year');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (!shouldFetch.current) {
      shouldFetch.current = true;
      return;
    }

    const fetchSuggestions = async () => {
      if (title.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        if (type === 'movie') {
          const response = await axios.get('https://www.omdbapi.com/', {
            params: {
              s: title,
              apikey: OMDB_API_KEY,
            },
          });

          if (response.data.Search) {
            console.log('response.data.Search ', response.data.Search);
            const parsedSuggestions: Suggestion[] = response.data.Search.map(
              (item: any) => ({
                poster: item.Poster,
                title: item.Title,
                type: item.Type,
                year: item.Year,
              }),
            );
            setSuggestions(parsedSuggestions);
          } else {
            setSuggestions([]);
          }
        } else if (type === 'book') {
          getBookInfos({
            variables: {
              title: title,
            },
          });
        }
      } catch (error) {
        console.error('Erreur suggestions:', error);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [title, type]);

  useEffect(() => {
    if (data && data.book) {
      const book = data.book;
      const suggestion: Suggestion = {
        title: book.title,
        poster: book.cover || null,
        year: book.publishDate || '',
        type: 'book',
        author: book.author,
      };
      setSuggestions([suggestion]);
    }
  }, [data]);

  const onSubmit = (data: ItemType) => {
    setItemStorage(data);
    reset();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un élément</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, type === 'movie' && styles.activeButton]}
          onPress={() => {
            setValue('type', 'movie');
            setSuggestions([]);
          }}
        >
          <Text
            style={type === 'movie' ? styles.activeText : styles.inactiveText}
          >
            🎬 Film
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, type === 'book' && styles.activeButton]}
          onPress={() => {
            setValue('type', 'book');
            setSuggestions([]);
          }}
        >
          <Text
            style={type === 'book' ? styles.activeText : styles.inactiveText}
          >
            📖 Livre
          </Text>
        </TouchableOpacity>
      </View>

      {poster && (
        <Image
          source={{ uri: poster }}
          style={{ width: 80, height: 120 }}
          resizeMode="cover"
        />
      )}

      <TextInputLabel label="Titre" />
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Titre"
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text);
              }}
              value={value}
            />
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                keyExtractor={(item, index) => item.title + index}
                style={styles.suggestionBox}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      shouldFetch.current = false;
                      setValue('title', item.title);
                      setValue(
                        'poster',
                        item.poster === 'N/A' ? null : item.poster,
                      );
                      setValue('year', item.year);
                      if (type === 'book') {
                        setValue('author', item.author);
                      }
                      setSuggestions([]);
                    }}
                  >
                    <Text style={styles.suggestionItem}>
                      {item.title} ({item.year})
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </>
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <TextInputLabel label="Année" />
      <TextInput
        style={styles.input}
        placeholder="Année"
        editable={false}
        value={year || undefined}
      />

      {type === 'book' && (
        <>
          <TextInputLabel label="Auteur" />
          <Controller
            control={control}
            name="author"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Auteur"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.author && (
            <Text style={styles.error}>{errors.author.message}</Text>
          )}
        </>
      )}

      <TextInputLabel label="Note (0 à 10)" />
      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Note"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
          />
        )}
      />
      {errors.rating && (
        <Text style={styles.error}>{errors.rating.message}</Text>
      )}

      <Button title="Valider" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  suggestionBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    maxHeight: 150,
    marginBottom: 8,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default AddItemScreen;
