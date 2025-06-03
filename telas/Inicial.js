import { StyleSheet, FlatList, Image, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { auth } from '../FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../Context/auth/useAuth';
import styles from '../estilos/InicialStyles.js';

export default function Inicial({ navigation }) {
  const [data, setData] = useState([]);

  getAuth().onAuthStateChanged((user) =>{
    if(!user)
      navigation.reset({
        index:0,
        routes:[{name: 'Login'}]
    })
  });
  const handleLogout =async ()=>{
    auth.sig
  }
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
