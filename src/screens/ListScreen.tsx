import { useNavigation } from "@react-navigation/native";
import { ReactElement, useEffect } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ItemType } from "../contexts/ListContext";
import useList from "../hooks/useList";
import { NavigationProps } from "../types/navigator";

const ListScreen = (): ReactElement => {
  const navigation = useNavigation<NavigationProps>();
  const { items } = useList();

  useEffect(() => {
    console.log("ListScreen items : ", items);
  }, [items]);

  return (
    <View style={styles.container}>
      <Button
        title="Ajouter un élément"
        onPress={() => navigation.navigate("AddItem")}
      />
      <FlatList
        data={items}
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
              {item.type === "movie" ? "🎬" : "📚"} {item.title} ({item.rating}
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

export default ListScreen;
