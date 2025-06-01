import React from 'react';
import { StyleSheet, View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Context/auth/useAuth'

export default function About({ navigation }) {
    const { user, setUser } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Sobre o App 🛒</Text>

      <Image
        //source={require('../assets/sacola.png')} // troque por uma imagem existente na pasta assets
        style={styles.imagem}
      />

      <Text style={styles.texto}>
        Este aplicativo foi criado para facilitar suas compras no supermercado, mostrando promoções
        atualizadas, produtos organizados por categoria (frutas, legumes, vegetais) e muito mais!
      </Text>

      <Text style={styles.texto}>
        Desenvolvido com 💙 por Maria Eduarda.{"\n"}
        Projeto da disciplina de Desenvolvimento de Aplicações Móveis.
      </Text>

      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/MariaCoelhoM/Mercado')}>
        <Text style={styles.link}>Ver no GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botao}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E2',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagem: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginBottom: 30,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#FF8C42',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
