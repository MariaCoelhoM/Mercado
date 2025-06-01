import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Pressable} from 'react-native';

export default function Botao({textoBotao}) {
  return (
    <View>
    <Pressable onPress={()=> {alert("Botão pressionado!")}}>
      <Text>{textoBotao}</Text>
    </Pressable>
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
