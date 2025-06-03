// navegacao/TabsTela1.js
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Inicial from '../telas/Inicial';
import User from '../telas/User';
import Carrinho from '../telas/Carrinho';

export default function TabsTela1() {
    const Tab = createBottomTabNavigator();
  
    return (
  <Tab.Navigator>
    <Tab.Screen
        name='Inicial'
        component={Inicial}
        />
        <Tab.Screen
        name='Carrinho'
        component={Carrinho}
        />
        <Tab.Screen
        name='Úsuario'
        component={User}
        />
  </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
