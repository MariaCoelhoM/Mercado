import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../FirebaseConfig';
import styles from '../estilos/UserStyles.js';

export default function User({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        email: user.email,
        uid: user.uid,
      });
    }
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('Login'); // redireciona para a tela de login
      })
      .catch(error => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>👤 Seus Dados</Text>
      {userInfo ? (
        <View style={styles.infoBox}>
          <Text style={styles.label}>📧 Email: <Text style={styles.value}>{userInfo.email}</Text></Text>
          <Text style={styles.label}>🆔 UID: <Text style={styles.value}>{userInfo.uid}</Text></Text>
        </View>
      ) : (
        <Text style={styles.loading}>Carregando dados...</Text>
      )}

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🔐 Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

