import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Feed from "./components/Feed";
import Notifications from "./components/Notifications";
import Docs from "./components/Docs";
import CustomDrawerContent from "./components/CustomDrawerContent";


const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Početna" component={Feed} />
            <Drawer.Screen name="Lični podaci" component={Notifications} />
            <Drawer.Screen name="Studij" component={Notifications} />
            <Drawer.Screen name="Ispiti" component={Notifications} />
            <Drawer.Screen name="Ankete" component={Notifications} />
            <Drawer.Screen name="Dokumenti" component={Docs} />
            <Drawer.Screen name="Nastavno osoblje" component={Notifications} />
            <Drawer.Screen name="Kontakt i informacije" component={Notifications} />
            <Drawer.Screen name="FAQ" component={Notifications} />
        </Drawer.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}
