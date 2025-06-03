import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E2',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagem: {
    width: 240,
    height: 240,
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginBottom: 30,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#FF8C42',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;