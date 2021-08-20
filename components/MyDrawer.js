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


export default function MyDrawer({theme, changeTheme, isDark}) {
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
            <Drawer.Navigator drawerStyle={{backgroundColor: theme.mainBackground}} initialRouteName={'Home'} drawerContent={props => <CustomDrawerContent {...props} theme={theme}/>}>
                <Drawer.Screen name="Home" children={props => <Home {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Početna', drawerIcon: () => (<Icon name='home' color={theme.text}/>)}}/>
                <Drawer.Screen name="StudentData" children={props => <StudentData {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Lični podaci', drawerIcon: () => (<Icon name='person' color={theme.text}/>)}}/>
                <Drawer.Screen name="Curriculum" children={props => <Curriculum {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Studij', drawerIcon: () => (<Icon name='school' color={theme.text}/>)}}/>
                <Drawer.Screen name="Tests" children={props => <Tests {...props} theme={theme} isDark={isDark} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Ispiti', drawerIcon: () => (<Icon name='description' color={theme.text}/>)}}/>
                <Drawer.Screen name="Survey" children={props => <Survey {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Ankete', drawerIcon: () => (<Icon name='help' color={theme.text}/>)}}/>
                <Drawer.Screen name="Docs" children={props => <Docs {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Dokumenti', drawerIcon: () => (<Icon name='folder' color={theme.text}/>)}}/>
                <Drawer.Screen name="Staff" children={props => <Staff {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Nastavno osoblje', drawerIcon: () => (<Icon name='people' color={theme.text}/>)}}/>
                <Drawer.Screen name="Comments" children={props => <Comments {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Komentari i prijedlozi', drawerIcon: () => (<Icon name='email' color={theme.text}/>)}}/>
                <Drawer.Screen name="Contacts" children={props => <Contacts {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Kontakt informacije', drawerIcon: () => (<Icon name='info' color={theme.text}/>)}}/>
                <Drawer.Screen name="FAQ" children={props => <FAQ {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'FAQ', drawerIcon: () => (<Icon name='live-help' color={theme.text}/>)}}/>
            </Drawer.Navigator>
        );

    return (
        <Drawer.Navigator drawerStyle={{backgroundColor: theme.mainBackground}} initialRouteName={'Home'} drawerContent={props => <CustomDrawerContent {...props} theme={theme}/>}>
            <Drawer.Screen name="Home" children={props => <Home {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole}/>} options = {{drawerLabel: 'Početna', drawerIcon: () => (<Icon name='home' color={theme.text}/>)}}/>
            <Drawer.Screen name="StudentData" children={props => <StudentData {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Lični podaci', drawerIcon: () => (<Icon name='person' color={theme.text}/>)}}/>
            <Drawer.Screen name="Curriculum" children={props => <Curriculum  {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Studij', drawerIcon: () => (<Icon name='school' color={theme.text}/>)}}/>
            <Drawer.Screen name="Tests" children={props => <Tests {...props} theme={theme} isDark={isDark} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Ispiti', drawerIcon: () => (<Icon name='description' color={theme.text}/>)}}/>
            <Drawer.Screen name="Docs" children={props => <Docs {...props} theme={theme} isDark={isDark} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Dokumenti', drawerIcon: () => (<Icon name='folder' color={theme.text}/>)}}/>
            <Drawer.Screen name="Contacts" children={props => <Contacts {...props} isDark={isDark} theme={theme} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'Kontakt informacije', drawerIcon: () => (<Icon name='info' color={theme.text}/>)}}/>
            <Drawer.Screen name="FAQ" children={props => <FAQ {...props} theme={theme} isDark={isDark} changeTheme={changeTheme} role={studentRole} />} options = {{drawerLabel: 'FAQ', drawerIcon: () => (<Icon name='live-help' color={theme.text}/>)}}/>
        </Drawer.Navigator>
    );
}