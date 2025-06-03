// Importações necessárias do React Native e Firebase
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../FirebaseConfig'; // Importa a configuração de autenticação do Firebase
import styles from '../estilos/UserStyles.js'; // Importa os estilos específicos para a tela User

// Componente principal User que recebe navigation como prop para navegação entre telas
export default function User({ navigation }) {
  // Estado para armazenar as informações do usuário logado
  const [userInfo, setUserInfo] = useState(null);

  // Hook useEffect executado uma vez ao montar o componente
  useEffect(() => {
    // Obtém o usuário atualmente autenticado
    const user = auth.currentUser;
    // Verifica se existe um usuário logado
    if (user) {
      // Atualiza o estado com as informações básicas do usuário
      setUserInfo({
        email: user.email, // Email do usuário
        uid: user.uid,     // ID único do usuário no Firebase
      });
    }
  }, []); // Array vazio significa que executa apenas uma vez ao montar

  // Função para realizar o logout do usuário
  const handleLogout = () => {
    auth.signOut() // Chama o método signOut do Firebase Auth
      .then(() => {
        // Se o logout for bem-sucedido, redireciona para a tela de Login
        navigation.replace('Login'); // replace substitui a tela atual ao invés de empilhar
      })
      .catch(error => {
        // Se houver erro no logout, exibe no console
        console.error("Erro ao fazer logout:", error);
      });
  };

  // Renderização do componente
  return (
    <SafeAreaView style={styles.container}>
      {/* Título da tela com emoji */}
      <Text style={styles.title}>👤 Seus Dados</Text>
      
      {/* Renderização condicional: se userInfo existe, mostra os dados, senão mostra carregando */}
      {userInfo ? (
        // Container com as informações do usuário
        <View style={styles.infoBox}>
          {/* Exibe o email do usuário com emoji e formatação */}
          <Text style={styles.label}>📧 Email: <Text style={styles.value}>{userInfo.email}</Text></Text>
          {/* Exibe o UID do usuário com emoji e formatação */}
          <Text style={styles.label}>🆔 UID: <Text style={styles.value}>{userInfo.uid}</Text></Text>
        </View>
      ) : (
        // Texto de carregamento exibido enquanto os dados não são carregados
        <Text style={styles.loading}>Carregando dados...</Text>
      )}

      {/* Botão de logout usando Pressable (versão mais moderna do TouchableOpacity) */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🔐 Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}