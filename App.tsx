import { ApolloProvider } from "@apollo/client";
import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ListProvider } from "./src/contexts/ListContext";
import RootNavigator from "./src/navigation/RootNavigator";
import client from "./src/services/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <ListProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </ListProvider>
    </ApolloProvider>
  );
}

export default App;

registerRootComponent(App);
