import { StyleSheet, FlatList, Image, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import styles from '../estilos/PaginasStyles.js';

export default function Legumes({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Legumes'));
      const legumes = [];
      querySnapshot.forEach((doc) => {
        legumes.push({
          id: doc.id,
          titulo: doc.data().titulo,
          descricao: doc.data().descricao,
          preco: doc.data().preco,
          imagem: doc.data().imagem
        });
      });
      setData(legumes);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Legumes Frescos 🥕</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>Produto:{item.titulo}</Text>
              <Text style={styles.descricao}>Descrição:{item.descricao}</Text>
              <Text style={styles.preco}>R$:{item.preco}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
