import React, {useEffect, useState} from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";
import {darkTheme, lightTheme} from "./components/Colors/Themes";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiJkODZiNDY2Mi1mYmY2LTRiZDQtOTE0Yy05OWFiMzUxNGVkMjMiLCJleHAiOjE2Mjk0NTE0MTIsIm5iZiI6MCwiaWF0IjoxNjI5MzY1MDI3LCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiOWEzNjYzM2UtOWFhZC00ZjcyLTg4NjItYzJkNTMyZDVhODIxIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2YwNDllOTctOTdjOC00ZmE5LWJmNWItZWU2YTdiMzUwZGM2IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEiLCJlbWFpbCI6ImltYW4uYmVra2F5ZUB1dGljLnVuc2EuYmEifQ.eY73TnfKArjLVlGwney7V_CNu22uT0MwI0D7HLMwzvwG5KJS-QzAkRHtn-t9lAkN0uZ9LoAIA2D9_yw8F2TDARf9sv7_L-Y6PqXMk40qRak7wZOhPT8w7MHd6cUoDquxGZ_JzJHaq05RhaYPvPvv2mmNzOUwTfHB6QFfQ81AXupcv9RuMIhW-fTi7HU7mFBFmJ0ihi1JL0uQRoDezcOhoHUOexjSZnEBZsqy8GdxpG3vS9WvMQYXXU7k23aYdvgjrlFrd1bMZZJnoHoOt7uN0-TkBnYzBSrubKUM5wOhHZz7MDRS1ZheWnKQ9AGZIzqLyoyeDcHUquarDJb8x0QNpA'


export default function App() {
    const [currentTheme, setTheme] = useState(lightTheme)


    // useEffect(() => {
    //
    //     useColorScheme() === 'light' ? setTheme(darkTheme) : setTheme(lightTheme)
    // }, [])


    return (

        <NavigationContainer>
            <MyDrawer theme={currentTheme} changeTheme={setTheme}/>
        </NavigationContainer>

    );
}


