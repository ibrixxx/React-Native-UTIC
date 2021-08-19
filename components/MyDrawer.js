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
import React, {useEffect, useState} from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Icon} from "react-native-elements";
import {TOKEN} from "../App";
import axios from "axios";
import {ActivityIndicator} from "react-native-paper";


const Drawer = createDrawerNavigator();


export default function MyDrawer({theme, changeTheme}) {
    //obični student je true
    const [studentRole, setStudentRole] = useState(null)
    const [isReady, setIsReady] = React.useState(false)

    useEffect(() => {
        axios.get('http://192.168.44.79:8080/u/0/user/current'
        , {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
        .then(function (response) {
            (response.data.substr(0, 8) === 'Student:')? setStudentRole(true):setStudentRole(false)
            setIsReady(true)
        })
        .catch(function (error) {
            console.log('error: ',error);
        })
    }, [])


    if (!isReady) {
        return(
            <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
        );
    }


    if(studentRole)
        return (
            <Drawer.Navigator initialRouteName={'Home'} drawerContent={props => <CustomDrawerContent {...props}/>}>
                <Drawer.Screen name="Home" children={props => <Home {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Početna', drawerIcon: () => (<Icon name='home' />)}}/>
                <Drawer.Screen name="StudentData" children={props => <StudentData {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Lični podaci', drawerIcon: () => (<Icon name='person' />)}}/>
                <Drawer.Screen name="Curriculum" children={props => <Curriculum {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Studij', drawerIcon: () => (<Icon name='school' />)}}/>
                <Drawer.Screen name="Tests" children={props => <Tests {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Ispiti', drawerIcon: () => (<Icon name='description' />)}}/>
                <Drawer.Screen name="Survey" children={props => <Survey {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Ankete', drawerIcon: () => (<Icon name='help' />)}}/>
                <Drawer.Screen name="Docs" children={props => <Docs {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Dokumenti', drawerIcon: () => (<Icon name='folder' />)}}/>
                <Drawer.Screen name="Staff" children={props => <Staff {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Nastavno osoblje', drawerIcon: () => (<Icon name='people' />)}}/>
                <Drawer.Screen name="Comments" children={props => <Comments {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Komentari i prijedlozi', drawerIcon: () => (<Icon name='email' />)}}/>
                <Drawer.Screen name="Contacts" children={props => <Contacts {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Kontakt informacije', drawerIcon: () => (<Icon name='info' />)}}/>
                <Drawer.Screen name="FAQ" children={props => <FAQ {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'FAQ', drawerIcon: () => (<Icon name='live-help' />)}}/>
            </Drawer.Navigator>
        );

    return (
        <Drawer.Navigator initialRouteName={'Home'} drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Home" children={props => <Home {...props} theme={theme} role={studentRole}/>} options = {{drawerLabel: 'Početna', drawerIcon: () => (<Icon name='home' />)}}/>
            <Drawer.Screen name="StudentData" children={props => <StudentData {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Lični podaci', drawerIcon: () => (<Icon name='person' />)}}/>
            <Drawer.Screen name="Curriculum" children={props => <Curriculum  {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Studij', drawerIcon: () => (<Icon name='school' />)}}/>
            <Drawer.Screen name="Tests" children={props => <Tests {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Ispiti', drawerIcon: () => (<Icon name='description' />)}}/>
            <Drawer.Screen name="Docs" children={props => <Docs {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Dokumenti', drawerIcon: () => (<Icon name='folder' />)}}/>
            <Drawer.Screen name="Contacts" children={props => <Contacts {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'Kontakt informacije', drawerIcon: () => (<Icon name='info' />)}}/>
            <Drawer.Screen name="FAQ" children={props => <FAQ {...props} theme={theme} role={studentRole} />} options = {{drawerLabel: 'FAQ', drawerIcon: () => (<Icon name='live-help' />)}}/>
        </Drawer.Navigator>
    );
}