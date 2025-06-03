import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal, ScrollView ,Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../FirebaseConfig';
import { collection, addDoc, getDocs} from 'firebase/firestore';
import styles from '../estilos/CarrinhosStyles.js';

export default function Carrinhos({ navigation }) {
  const [itensCardapio,setItensCardapio] = useState([]);
  const [endereco, setEndereco] = useState('');
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const carregarCardapio = async () => {
    try {
      const colecoes = ['Bebidas', 'Embutidos', 'Frutas', 'Legumes','Vegetais','Limpeza'];
      let itensTotais = [];
      for (const nomeColecao of colecoes) {
        const snapshot = await getDocs(collection(db, nomeColecao));
        const itens = snapshot.docs.map(doc => ({
          id: doc.id,
          titulo: doc.titulo,
          preco : doc.preco,
          ...doc.data()
        }));
        itensTotais = [...itensTotais, ...itens];
      }
      setItensCardapio(itensTotais);
    } catch (error) {
      console.error('Erro ao carregar cardápio:', error);
    }
  };

  const adicionarItemAoCarrinho = (item) => {
    setItensCarrinho([...itensCarrinho,item]);
  }

  const removerItem = (index) => {
    const novaLista = [...itensCarrinho];
    novaLista.splice(index, 1);
    setItensCarrinho(novaLista);
  };

  const calcularTotal = () => {
    return itensCarrinho.reduce((total, item) => total + parseFloat(item.preco), 0).toFixed(2);
  };

  const adicionarCarrinho = async () => {
    if (!endereco || itensCarrinho.length === 0) return;
    try {
      await addDoc(collection(db, 'Carrinho'), {
        endereco,
        itens: itensCarrinho,
      });
      setEndereco('');
      setItensCarrinho([]);
      setModalVisible(false);
      alert('Carrinho salvo com sucesso!')
    } catch (error) {
      console.error("Erro ao adicionar Carrinho: ", error);
    }
  };

  useEffect(() => {
    carregarCardapio();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Carrinhos</Text>
        <TouchableOpacity style={styles.botaoNovo} onPress={()=> setModalVisible(true)}>
          <Text style={styles.textoBotao}>Novo Carrinho</Text>
        </TouchableOpacity>
        
        <Modal visible={modalVisible} animationType="slide">
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <Text style={styles.titulo}>Novo Carrinho</Text>
              <TextInput
                placeholder="Endereço de entrega"
                value={endereco}
                onChangeText={setEndereco}
                style={styles.input}
                placeholderTextColor="#999"
              />
              
              <Text style={styles.subtitulo}>Itens do Cardápio:</Text>
              <FlatList
                data={itensCardapio}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={true}
                style={{ height: 300 }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => adicionarItemAoCarrinho(item)} style={styles.cardProduto}>
                    <Image source={{ uri: item.imagem }} style={styles.imagemProduto}/>
                    <Text style={styles.nomeProduto}>{item.titulo}</Text>
                    <Text style={styles.precoProduto}>R$ {item.preco}</Text>
                  </TouchableOpacity>
                )}
              />
              
              <Text style={styles.subtitulo}>Itens Selecionados:</Text>
              <FlatList
                data={itensCarrinho}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.itemCarrinho}>
                    <View style={styles.infoItem}>
                      <Text style={styles.nomeItem}>{item.titulo}</Text>
                      <Text style={styles.precoItem}>R$ {item.preco}</Text>
                    </View>
                    <TouchableOpacity style={styles.botaoRemover} onPress={() => removerItem(index)}>
                      <Text style={styles.textoBotaoRemover}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              
              <Text style={styles.total}>
                Total: R$ {calcularTotal()}
              </Text>
              
              <TouchableOpacity style={styles.botaoSalvar} onPress={adicionarCarrinho}>
                <Text style={styles.textoBotao}>Salvar Carrinho</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.botaoCancelar} onPress={() => setModalVisible(false)}>
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}