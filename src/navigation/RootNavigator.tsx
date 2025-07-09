import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CustomHeader from "../components/CustomHeader";
import DrawerContent from "../components/DrawerContent";
import AddItemScreen from "../screens/AddItemScreen";
import BookScreen from "../screens/BookScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import ListScreen from "../screens/ListScreen";
import MovieScreen from "../screens/MovieScreen";
import { RootStackParamList } from "../types/navigator";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "list";

          if (route.name === "Home") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Movies") {
            iconName = focused ? "film" : "film-outline";
          } else if (route.name === "Books") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "grey",
        header: () => <CustomHeader title="Watch Buddy" />,
      })}
    >
      <Tab.Screen name="Home" component={ListScreen} />
      <Tab.Screen name="Movies" component={MovieScreen} />
      <Tab.Screen name="Books" component={BookScreen} />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{
          header: () => <CustomHeader title="Ajouter un élément" showBack />,
        }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        options={{
          header: () => <CustomHeader title="Détail" showBack />,
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={() => <DrawerContent />}
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerStyle: {
            width: "60%",
            backgroundColor: "#fff",
          },
        }}
      >
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
