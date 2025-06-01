import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../FirebaseConfig';

export default function User({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        email: user.email,
        uid: user.uid,
        nome: user.displayName,
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
          <Text style={styles.label}>📝 Nome: <Text style={styles.value}>{userInfo.nome || 'Não disponível'}</Text></Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#FFE0C7',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  value: {
    fontWeight: '600',
    color: '#000',
  },
  loading: {
    fontSize: 16,
    color: '#999',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF8C42',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});