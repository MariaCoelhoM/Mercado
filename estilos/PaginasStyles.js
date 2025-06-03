import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E2',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C42',
    textAlign: 'center',
    marginBottom: 16,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFD8B8',
    borderRadius: 12,
    marginVertical: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 14,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  preco: {
    fontSize: 16,
    color: '#FF8C42',
    fontWeight: '600',
  },
});
export default styles;