// navegacao/TabsTela1.js
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Inicial from '../telas/Inicial';
import User from '../telas/User';
import Carrinho from '../telas/Carrinho';

export default function TabsTela1() {
    const Tab = createBottomTabNavigator();
  
    return (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Inicial') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Carrinho') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Úsuario') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF8C42',
      tabBarInactiveTintColor: 'gray',
    })}
  >
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
    backgroundColor: '#FF8C42',
    alignItems: 'center',
    justifyContent: 'center',
  },
});