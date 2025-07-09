import React, { ReactElement } from "react";
import { Text, View } from "react-native";

const DrawerContent = (): ReactElement => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Drawer</Text>
    </View>
  );
};

export default DrawerContent;
