import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../FirebaseConfig';  // seu arquivo de config Firebase
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default function Carrinho() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pega o uid do usuário logado
  const uid = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!uid) {
      Alert.alert('Erro', 'Usuário não logado');
      setLoading(false);
      return;
    }
    carregarCarrinho();
  }, [uid]);

  const carregarCarrinho = async () => {
    try {
      // Supondo que cada usuário tem um doc na coleção 'carrinhos' com subcoleção 'itens'
      const carrinhoRef = collection(db, 'carrinhos', uid, 'itens');
      const querySnapshot = await getDocs(carrinhoRef);

      const dados = [];
      querySnapshot.forEach(doc => {
        dados.push({ id: doc.id, ...doc.data() });
      });
      setItens(dados);
    } catch (error) {
      Alert.alert('Erro ao carregar carrinho', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FF8C42" />
      </View>
    );
  }

  if (itens.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.vazio}>Seu carrinho está vazio</Text>
      </SafeAreaView>
    );
  }

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + item.preco * (item.quantidade || 1), 0).toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text>Quantidade: {item.quantidade || 1}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              <Text style={styles.subtotal}>Subtotal: R$ {(item.preco * (item.quantidade || 1)).toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>Total: R$ {calcularTotal()}</Text>
      </View>
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFD8B8',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  preco: {
    fontSize: 16,
    color: '#FF8C42',
    fontWeight: '600',
    marginTop: 4,
  },
  subtotal: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  totalContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#FF8C42',
    marginTop: 12,
  },
  totalTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8C42',
    textAlign: 'right',
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
    color: '#666',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
