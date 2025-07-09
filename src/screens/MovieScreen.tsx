import { useNavigation } from "@react-navigation/native";
import { ReactElement, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { ItemType } from "../contexts/ListContext";
import useList from "../hooks/useList";
import { NavigationProps } from "../types/navigator";

const MovieScreen = (): ReactElement => {
  const navigation = useNavigation<NavigationProps>();
  const { items } = useList();

  const [movies, setMovies] = useState(
    items?.filter((item) => item.type === "movie"),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ItemType }) => (
          <Pressable
            style={({ pressed }) => [
              styles.itemContainer,
              pressed && styles.itemPressed,
            ]}
            onPress={() =>
              navigation.navigate("ItemDetail", { itemId: item.id })
            }
          >
            <Text style={styles.itemText}>
              🎬 {item.title} ({item.rating}
              /10)
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>Aucun élément.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  itemPressed: {
    backgroundColor: "#e0e0e0",
  },
  itemText: {
    fontSize: 16,
  },
});

export default MovieScreen;
