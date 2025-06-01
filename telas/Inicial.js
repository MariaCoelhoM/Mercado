import { StyleSheet, FlatList, Image, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

export default function Inicial({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Inicial'));
      const inicial = [];
      querySnapshot.forEach((doc) => {
        inicial.push({
          id: doc.id,
          titulo: doc.data().titulo,
          descricao: doc.data().descricao,
          preco: doc.data().preco,
          imagem: doc.data().imagem
        });
      });
      setData(inicial);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🛒 Promoções do Dia</Text>
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
