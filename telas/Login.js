// Importações necessárias do React Native e Firebase
import { StyleSheet, Text, TextInput, Pressable, SafeAreaView, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import styles from '../estilos/LoginStyles.js';

export default function Login({ navigation }) {
  // Estados para armazenar email e senha digitados pelo usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // useEffect executado quando o componente é montado
  useEffect(() => {
    // Listener que monitora mudanças no estado de autenticação
    const checkLogin = onAuthStateChanged(auth, (user) => {
      // Se há um usuário logado, navega diretamente para o DrawerNavigator
      if (user)
        navigation.replace('DrawerNavigator')
    })
    // Cleanup function - remove o listener quando o componente é desmontado
    return checkLogin;
  }, [])

  // Função assíncrona para realizar o login
  const handleLogin = async () => {
    // Validação básica: verifica se email contém @ e se senha tem pelo menos 6 caracteres
    if (!email.includes('@') || senha.length < 6) {
      alert('Digite um e-mail válido e senha com no mínimo 6 caracteres.');
      return;
    }

    try {
      // Tenta fazer login com email e senha usando Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("Usuário logado:", user);
      // Se login bem-sucedido, navega para o DrawerNavigator substituindo a tela atual
      navigation.replace('DrawerNavigator'); // qualquer coisa volta pro inicial navigation.navigate('DrawerNavigator');
    } catch (error) {
      // Tratamento de erros específicos do Firebase Auth
      console.error("Erro no login:", error);
      if (error.code === 'auth/user-not-found') {
        alert('Usuário não encontrado.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Senha incorreta.');
      } else {
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    }
  };

  // Função assíncrona para criar nova conta
  const handleCreateAccount = async () => {
    // Mesma validação básica do login
    if (!email.includes('@') || senha.length < 6) {
      alert('Digite um e-mail válido e senha com no mínimo 6 caracteres.');
      return;
    }

    try {
      // Cria nova conta com email e senha usando Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("Usuário cadastrado:", user);
      alert('Cadastro realizado com sucesso!');
      // Após cadastro bem-sucedido, navega para o DrawerNavigator
      navigation.replace('DrawerNavigator'); //qualquer coisa voltar pra Inicial DrawerNavigator
    } catch (error) {
      // Tratamento de erros específicos do cadastro
      console.error("Erro no cadastro:", error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Este e-mail já foi cadastrado. Tente fazer login.');
      } else if (error.code === 'auth/invalid-email') {
        alert('E-mail inválido.');
      } else if (error.code === 'auth/weak-password') {
        alert('A senha deve ter no mínimo 6 caracteres.');
      } else {
        alert('Erro ao cadastrar. Tente novamente.');
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo.png (1).png')} 
             style={styles.imagem}/>
      <Text style={styles.title}>🔐 Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Pressable style={styles.buttonSecondary} onPress={handleCreateAccount}>
        <Text style={styles.buttonSecondaryText}>Registrar</Text>
      </Pressable>
    </SafeAreaView>
  );
}
