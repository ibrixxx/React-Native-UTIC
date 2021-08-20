import React, {useEffect, useState} from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";
import {darkTheme, lightTheme} from "./components/Colors/Themes";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiIxOTJkZGVhNS1jZjcyLTQxOWUtYWVhYS1mNDMzZDFjYzY3ZjciLCJleHAiOjE2Mjk1MzkwNTYsIm5iZiI6MCwiaWF0IjoxNjI5NDUyNjY1LCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiZDU2NDA1OGEtZGYzNi00ZDM5LThjMDQtMTdjODRlN2Y0YWM1IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYzRkMjNhZDktNGE5My00MDI0LWFkYzgtMjM0Njg0OGE2NjJmIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEiLCJlbWFpbCI6ImltYW4uYmVra2F5ZUB1dGljLnVuc2EuYmEifQ.DioXzI8fr9GU2aj4j012-5BIrsyWL6MC4eVk4PEMhGYxKpT_USBVvUsy1LV86OCDD1EreCUhNuXRG4CqvfUlcuN2Ip7tmufOE68WGsuUp12PLXMMN_zuY-ySXEg7JR1S29GVCAPTqcT3ZGmQU1LRDLzJcj6d689eBD1kFgaIxt8epBlTyWcgxT-McViSTJAuhpzQZ6n4A9uPPEazmFLWyCjrsBvhqEtx8xHPKq5RcGkbIJqBxad0Fivli2JqhR7CiCAIWBzEChjUkVUvr-aGv8XHGChpOH4spnP02ltt4F6LkyECDANkNF_khcftFPdcISY2rzWJZliSexGQg3jW0A'


export default function App() {
    const [currentTheme, setTheme] = useState(lightTheme)
    const [isDark, setIsDark] = useState(false)

    const changeTheme = () => {
        (currentTheme === lightTheme)? setTheme(darkTheme):setTheme(lightTheme)
        setIsDark(!isDark)
    }
    // useEffect(() => {
    //
    //     useColorScheme() === 'light' ? setTheme(darkTheme) : setTheme(lightTheme)
    // }, [])


    return (

        <NavigationContainer>
            <MyDrawer theme={currentTheme} changeTheme={() => {changeTheme()}} isDark={isDark}/>
        </NavigationContainer>

    );
}


