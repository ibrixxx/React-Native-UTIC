import CustomDrawerContent from "./CustomDrawerContent";
import Home from "./Home";
import StudentData from "./StudentData";
import Curriculum from "./Curriculum";
import Tests from "./Tests";
import Survey from "./Survey";
import Docs from "./Docs";
import Staff from "./Staff";
import Comments from "./Comments";
import Contacts from "./Contacts";
import FAQ from "./FAQ";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Icon} from "react-native-elements";


const Drawer = createDrawerNavigator();


export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName={'Home'} hideStatusBar={true} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} options = {{drawerLabel: 'Početna', drawerIcon: () => (<Icon name='home' />)}} />
            <Drawer.Screen name="StudentData" component={StudentData} options = {{drawerLabel: 'Lični podaci', drawerIcon: () => (<Icon name='person' />)}}/>
            <Drawer.Screen name="Curriculum" component={Curriculum} options = {{drawerLabel: 'Studij', drawerIcon: () => (<Icon name='school' />)}}/>
            <Drawer.Screen name="Tests" component={Tests} options = {{drawerLabel: 'Ispiti', drawerIcon: () => (<Icon name='description' />)}}/>
            <Drawer.Screen name="Survey" component={Survey} options = {{drawerLabel: 'Ankete', drawerIcon: () => (<Icon name='help' />)}}/>
            <Drawer.Screen name="Docs" component={Docs} options = {{drawerLabel: 'Dokumenti', drawerIcon: () => (<Icon name='folder' />)}}/>
            <Drawer.Screen name="Staff" component={Staff} options = {{drawerLabel: 'Nastavno osoblje', drawerIcon: () => (<Icon name='people' />)}}/>
            <Drawer.Screen name="Comments" component={Comments} options = {{drawerLabel: 'Komentari i prijedlozi', drawerIcon: () => (<Icon name='email' />)}}/>
            <Drawer.Screen name="Contacts" component={Contacts} options = {{drawerLabel: 'Kontakt i informacije', drawerIcon: () => (<Icon name='phone' />)}}/>
            <Drawer.Screen name="FAQ" component={FAQ} options = {{drawerLabel: 'FAQ', drawerIcon: () => (<Icon name='info' />)}}/>
        </Drawer.Navigator>
    );
}