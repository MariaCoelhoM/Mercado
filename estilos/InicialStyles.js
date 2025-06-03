import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E2',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  cabecalho: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FFE0C7',
    color: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFD8B8',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
  },
  imagem: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  preco: {
    fontSize: 15,
    color: '#FF8C42',
    marginTop: 4,
  },
});
export default styles;
