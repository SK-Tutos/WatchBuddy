import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Tabs: undefined;
  AddItem: undefined;
  ItemDetail: {
    itemId: string;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
