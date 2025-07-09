import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ReactElement } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title: string;
  showBack?: boolean;
};

const CustomHeader = ({ title, showBack = false }: Props): ReactElement => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        height: 50 + insets.top,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: showBack ? 10 : 0,
        }}
      >
        {title}
      </Text>

      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="settings-outline" size={24} color="#000" />
      </Pressable>
    </View>
  );
};

export default CustomHeader;
