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


const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName={'Home'} hideStatusBar={true} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} options = {{drawerLabel: 'Početna'}} />
            <Drawer.Screen name="StudentData" component={StudentData} options = {{drawerLabel: 'Lični podaci'}}/>
            <Drawer.Screen name="Curriculum" component={Curriculum} options = {{drawerLabel: 'Studij'}}/>
            <Drawer.Screen name="Tests" component={Tests} options = {{drawerLabel: 'Ispiti'}}/>
            <Drawer.Screen name="Survey" component={Survey} options = {{drawerLabel: 'Ankete'}}/>
            <Drawer.Screen name="Docs" component={Docs} options = {{drawerLabel: 'Dokumenti'}}/>
            <Drawer.Screen name="Staff" component={Staff} options = {{drawerLabel: 'Nastavno osoblje'}}/>
            <Drawer.Screen name="Comments" component={Comments} options = {{drawerLabel: 'Komentari i prijedlozi'}}/>
            <Drawer.Screen name="Contacts" component={Contacts} options = {{drawerLabel: 'Kontakt i informacije'}}/>
            <Drawer.Screen name="FAQ" component={FAQ} options = {{drawerLabel: 'FAQ'}}/>
        </Drawer.Navigator>
    );
}