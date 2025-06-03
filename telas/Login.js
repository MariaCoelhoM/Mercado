import { StyleSheet, Text, TextInput, Pressable, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import styles from '../estilos/LoginStyles.js';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const checkLogin = onAuthStateChanged(auth, (user) => {
      if (user)
        navigation.replace('DrawerNavigator')
    })
    return checkLogin;
  }, [])

  const handleLogin = async () => {
    if (!email.includes('@') || senha.length < 6) {
      alert('Digite um e-mail válido e senha com no mínimo 6 caracteres.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("Usuário logado:", user);
      navigation.replace('DrawerNavigator'); // qualquer coisa volta pro inicial navigation.navigate('DrawerNavigator');
    } catch (error) {
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

  const handleCreateAccount = async () => {
    if (!email.includes('@') || senha.length < 6) {
      alert('Digite um e-mail válido e senha com no mínimo 6 caracteres.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("Usuário cadastrado:", user);
      alert('Cadastro realizado com sucesso!');
      navigation.replace('DrawerNavigator'); //qualquer coisa voltar pra Inicial DrawerNavigator
    } catch (error) {
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
