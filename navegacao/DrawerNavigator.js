import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicial from '../telas/Inicial'; // sua tela inicial
import User from '../telas/User';       // sua tela de perfil
import Vegetais from '../telas/Vegetais';
import About from '../telas/About';
import Legumes from '../telas/Legumes';
import Raizes from '../telas/Raizes';
import Limpeza from '../telas/Limpeza';
import Bebidas from '../telas/Bebidas';
import Embutidos from '../telas/Embutidos';
import Frutas from '../telas/Frutas';
import TabsTela1 from './TabsTela1';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
    initialRouteName="Tabs"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFA726' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#FFA726',
      }}
    >
    <Drawer.Screen name="Tabs" component={TabsTela1} options={{ title: 'Início' }} />
    <Drawer.Screen name="Vegetais" component={Vegetais}/>
    <Drawer.Screen name="Legumes" component={Legumes}/>
    <Drawer.Screen name="Frutas" component={Frutas}/>
    <Drawer.Screen name="Raizes" component={Raizes}/>
    <Drawer.Screen name="Embutidos" component={Embutidos}/>
    <Drawer.Screen name="Bebidas" component={Bebidas}/>
    <Drawer.Screen name="Limpeza" component={Limpeza}/>
    <Drawer.Screen name="Sobre" component={About} />
    <Drawer.Screen name="Úsuario" component={User}/>
    </Drawer.Navigator>
  );
}
/// qual começa tita a linha     <Drawer.Navigator initialRouteName="Tabs"/> 


     