import { StyleSheet, FlatList, Image, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

export default function Vegetais({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Vegetais'));
      const vegetais = [];
      querySnapshot.forEach((doc) => {
        vegetais.push({
          id: doc.id,
          titulo: doc.data().titulo,
          descricao: doc.data().descricao,
          preco: doc.data().preco,
          imagem: doc.data().imagem
        });
      });
      setData(vegetais);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Legumes Frescos 🥦</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>Nome do produto:{item.titulo}</Text>
              <Text style={styles.descricao}>Descrição:{item.descricao}</Text>
              <Text style={styles.preco}>R$:{item.preco}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
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