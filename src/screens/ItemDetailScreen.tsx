import { yupResolver } from "@hookform/resolvers/yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";
import useList from "../hooks/useList";
import { RootStackParamList } from "../types/navigator";

type FormItemType = {
  title: string;
  rating: number;
  author?: string;
};

const ItemDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ItemDetail">>();
  const { itemId } = route.params;
  const navigation = useNavigation();
  const { items, updateItem, removeItem } = useList();

  const item = items ? items.find((it) => it.id === itemId) : null;

  if (!item) {
    return <Text>Item introuvable.</Text>;
  }

  const schema = Yup.object({
    title: Yup.string().required("Titre requis"),
    rating: Yup.number().min(0).max(10).required("Note requise"),
    author: Yup.string().when("type", {
      is: "book",
      then: () => Yup.string().required("Auteur requis"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: item.title,
      rating: item.rating,
      author: item.author,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormItemType) => {
    updateItem({ ...item, ...data });
    Alert.alert("Succès", "Item mis à jour.");
  };

  const onDelete = () => {
    Alert.alert("Supprimer ?", "Cette action est irréversible.", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          removeItem(item.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détail de l'élément</Text>

      {item.poster && (
        <Image source={{ uri: item.poster }} style={styles.poster} />
      )}

      <Text style={styles.label}>Titre</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      {item.type === "book" && (
        <>
          <Text style={styles.label}>Auteur</Text>
          <Controller
            control={control}
            name="author"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.author && (
            <Text style={styles.error}>{errors.author.message}</Text>
          )}
        </>
      )}

      <Text style={styles.label}>Note (0 à 10)</Text>
      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value?.toString()}
            keyboardType="numeric"
            onChangeText={onChange}
          />
        )}
      />
      {errors.rating && (
        <Text style={styles.error}>{errors.rating.message}</Text>
      )}

      <Button title="Sauvegarder" onPress={handleSubmit(onSubmit)} />
      <View style={{ marginTop: 20 }}>
        <Button title="🗑️ Supprimer" color="red" onPress={onDelete} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  poster: {
    width: 120,
    height: 180,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default ItemDetailScreen;
