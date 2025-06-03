// Importações necessárias do React Native e Firebase
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../FirebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import styles from '../estilos/CarrinhosStyles.js';

// Componente principal Carrinhos que recebe navigation como prop
export default function Carrinhos({ navigation }) {
  // Estados para gerenciar os dados da aplicação
  const [itensCardapio, setItensCardapio] = useState([]); // Lista de itens disponíveis no cardápio
  const [endereco, setEndereco] = useState(''); // Endereço de entrega digitado pelo usuário
  const [erroEndereco, setErroEndereco] = useState(''); // Mensagem de erro para validação do endereço
  const [itensCarrinho, setItensCarrinho] = useState([]); // Lista de itens selecionados no carrinho
  const [modalVisible, setModalVisible] = useState(false); // Controla a visibilidade do modal

  // Função assíncrona para carregar todos os itens do cardápio das diferentes coleções do Firebase
  const carregarCardapio = async () => {
    try {
      // Array com os nomes das coleções no Firebase
      const colecoes = ['Bebidas', 'Embutidos', 'Frutas', 'Legumes', 'Vegetais', 'Limpeza', 'Raizes'];
      let itensTotais = [];
      
      // Loop através de cada coleção para buscar os documentos
      for (const nomeColecao of colecoes) {
        const snapshot = await getDocs(collection(db, nomeColecao));
        // Mapeia os documentos adicionando o ID e campos específicos
        const itens = snapshot.docs.map(doc => ({
          id: doc.id,
          titulo: doc.titulo,
          preco: doc.preco,
          ...doc.data() // Spread dos demais dados do documento
        }));
        // Concatena os itens da coleção atual com os já carregados
        itensTotais = [...itensTotais, ...itens];
      }
      // Atualiza o estado com todos os itens carregados
      setItensCardapio(itensTotais);
    } catch (error) {
      console.error('Erro ao carregar cardápio:', error);
    }
  };

  // Função para adicionar um item ao carrinho
  const adicionarItemAoCarrinho = (item) => {
    // Adiciona o item ao array atual do carrinho usando spread operator
    setItensCarrinho([...itensCarrinho, item]);
  };

  // Função para remover um item específico do carrinho pelo índice
  const removerItem = (index) => {
    const novaLista = [...itensCarrinho]; // Cria uma cópia do array atual
    novaLista.splice(index, 1); // Remove o item no índice especificado
    setItensCarrinho(novaLista); // Atualiza o estado com a nova lista
  };

  // Função para calcular o valor total dos itens no carrinho
  const calcularTotal = () => {
    // Usa reduce para somar todos os preços e formata com 2 casas decimais
    return itensCarrinho.reduce((total, item) => total + parseFloat(item.preco), 0).toFixed(2);
  };

  // Função assíncrona para salvar o carrinho no Firebase
  const adicionarCarrinho = async () => {
    // Validação: verifica se o endereço foi preenchido
    if (!endereco.trim()) {
      setErroEndereco('Por favor, preencha o endereço de entrega.');
      return;
    } else {
      setErroEndereco(''); // Limpa a mensagem de erro se o endereço estiver preenchido
    }

    // Validação: verifica se há pelo menos um item no carrinho
    if (itensCarrinho.length === 0) {
      alert('Adicione pelo menos um item ao carrinho.');
      return;
    }

    try {
      // Adiciona um novo documento na coleção 'Carrinho' do Firebase
      await addDoc(collection(db, 'Carrinho'), {
        endereco,
        itens: itensCarrinho,
      });
      // Limpa os campos após salvar com sucesso
      setEndereco('');
      setItensCarrinho([]);
      setModalVisible(false); // Fecha o modal
      alert('Carrinho salvo com sucesso!');
    } catch (error) {
      console.error("Erro ao adicionar Carrinho: ", error);
    }
  };

  // Hook useEffect executado uma vez ao montar o componente
  useEffect(() => {
    carregarCardapio(); // Carrega o cardápio quando o componente é montado
  }, []);

  // Renderização do componente
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Título principal da tela */}
        <Text style={styles.titulo}>Carrinhos</Text>

        {/* Botão para abrir o modal de novo carrinho */}
        <TouchableOpacity style={styles.botaoNovo} onPress={() => setModalVisible(true)}>
          <Text style={styles.textoBotao}>Novo Carrinho</Text>
        </TouchableOpacity>

        {/* Modal para criação de novo carrinho */}
        <Modal visible={modalVisible} animationType="slide">
          <SafeAreaView style={styles.container}>
            <ScrollView>
              {/* Título do modal */}
              <Text style={styles.titulo}>Novo Carrinho</Text>

              {/* Campo de input para endereço de entrega */}
              <TextInput
                placeholder="Endereço de entrega"
                value={endereco}
                onChangeText={setEndereco}
                style={styles.input}
                placeholderTextColor="#999"
              />
              {/* Exibe mensagem de erro do endereço se houver */}
              {erroEndereco ? (
                <Text style={{ color: 'red', marginBottom: 10 }}>{erroEndereco}</Text>
              ) : null}

              {/* Seção dos itens do cardápio */}
              <Text style={styles.subtitulo}>Itens do Cardápio:</Text>
              <FlatList
                data={itensCardapio}
                keyExtractor={(item) => item.id}
                numColumns={2} // Exibe 2 colunas
                scrollEnabled={true}
                style={{ height: 300 }} // Altura fixa da lista
                renderItem={({ item }) => (
                  // Card de cada produto do cardápio
                  <TouchableOpacity onPress={() => adicionarItemAoCarrinho(item)} style={styles.cardProduto}>
                    <Image source={{ uri: item.imagem }} style={styles.imagemProduto} />
                    <Text style={styles.nomeProduto}>{item.titulo}</Text>
                    <Text style={styles.precoProduto}>R$ {item.preco}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Seção dos itens selecionados no carrinho */}
              <Text style={styles.subtitulo}>Itens Selecionados:</Text>
              <FlatList
                data={itensCarrinho}
                keyExtractor={(_, index) => index.toString()} // Usa o índice como key
                renderItem={({ item, index }) => (
                  // Card de cada item no carrinho
                  <View style={styles.itemCarrinho}>
                    <View style={styles.infoItem}>
                      <Text style={styles.nomeItem}>{item.titulo}</Text>
                      <Text style={styles.precoItem}>R$ {item.preco}</Text>
                    </View>
                    {/* Botão para remover item do carrinho */}
                    <TouchableOpacity style={styles.botaoRemover} onPress={() => removerItem(index)}>
                      <Text style={styles.textoBotaoRemover}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />

              {/* Exibe o valor total do carrinho */}
              <Text style={styles.total}>
                Total: R$ {calcularTotal()}
              </Text>

              {/* Botão para salvar o carrinho */}
              <TouchableOpacity style={styles.botaoSalvar} onPress={adicionarCarrinho}>
                <Text style={styles.textoBotao}>Salvar Carrinho</Text>
              </TouchableOpacity>

              {/* Botão para cancelar e fechar o modal */}
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