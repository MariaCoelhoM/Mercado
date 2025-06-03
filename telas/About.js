import React from 'react';
import { StyleSheet, View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../Context/auth/useAuth'
import styles from '../estilos/AboutStyles.js';

export default function About({ navigation }) {
    const { user, setUser } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Sobre o App 🛒</Text>

      <Image
        source={require('../assets/logo.png.png')} // troque por uma imagem existente na pasta assets
        style={styles.imagem}
      />

      <Text style={styles.texto}>
        Este aplicativo foi desenvolvido para tornar suas compras no supermercado mais práticas e econômicas. 
        Com promoções sempre atualizadas, você pode aproveitar os melhores preços com facilidade. 
        Os produtos estão organizados por categorias como frutas, legumes e vegetais, permitindo uma navegação rápida e eficiente. 
        Tudo isso em um só lugar, pensado para otimizar seu tempo e seu bolso!
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
