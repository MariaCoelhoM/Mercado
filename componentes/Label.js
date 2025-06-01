import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput} from 'react-native';

export default function Label({textoLabel}) {
  return (
    <View>
         <Text>{textoLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
