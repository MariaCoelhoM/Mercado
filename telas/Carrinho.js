import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal, ScrollView ,Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../FirebaseConfig';
import { collection, addDoc, getDocs} from 'firebase/firestore';

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



  const adicionarCarrinho = async () => {
    if (!endereco || itensCarrinho.length === 0) return;

    try {
      await addDoc(collection(db, 'Carrinhos'), {
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
    <SafeAreaView style={{ backgroundColor: 'green', flex: 1 }}>
      <ScrollView>
        <Button title="Novo Carrinho" onPress={()=> setModalVisible(true)}/>
              <Modal visible={modalVisible} animationType="slide">
          <View>
            <Text>Novo Carrinho</Text>
            <TextInput
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}

            />
            
            <Text>Itens do Cardápio:</Text>
            <FlatList
              data={itensCardapio}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => adicionarItemAoCarrinho(item)}>
                  <Image source={{ uri: item.imagem }} style={{ width: 50, height: 50 }}/>
                  <Text>{item.titulo}</Text>
                  <Text>R$ {item.preco}</Text>
                </TouchableOpacity>
              )}
            />

            <Text>Itens Selecionados:</Text>
            <FlatList
              data={itensCarrinho}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View>
                  <Text>{item.nome} - R$ {item.preco}</Text>
                  <Button title="Remover" color="red" onPress={() => removerItem(index)} />
                </View>
              )}
            />

            <Button title="Salvar Carrinho" onPress={adicionarCarrinho} />
            <Button title="Cancelar" color="gray" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}