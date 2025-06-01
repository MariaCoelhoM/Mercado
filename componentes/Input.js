import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput} from 'react-native';

export default function Input({texto, bool}) {
  return (
    <View>
         <TextInput placeholder={texto} secureTextEntry={bool}/>
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
