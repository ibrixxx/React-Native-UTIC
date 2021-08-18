import React, {useEffect, useState} from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";
import {darkTheme, lightTheme} from "./components/Colors/Themes";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiI4ZTRhYzQ2MC05YWZiLTQ4OWYtOTFmZS04NTQ0YmY1NTExMTMiLCJleHAiOjE2MjkzNzUxNDQsIm5iZiI6MCwiaWF0IjoxNjI5Mjg4NzU3LCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiOTAxN2YwOTMtMGMzOS00NzE1LTkxZGQtM2FlNWU3ZWY4ZDlhIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiY2E5NjMwNjEtMTg1MS00YzM2LTgzNjQtMzM2ZWM0NzRlM2MxIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEiLCJlbWFpbCI6ImltYW4uYmVra2F5ZUB1dGljLnVuc2EuYmEifQ.cT1zExMXEACC0GKzDEUwV16tEu32it4x3PysA5NeLLqxBAU3_z3vbqV-dmPFVgNkbLMT0NkBep1WgpxsS5pbAG7WQufK_P7-QsvLJby7gL_5QfN7_H3lH_XFCGpTmTj6D9Cwz3JDYv6fBeSfeuulDp-SVQmeNE9eSE3bI8o_VzjX_0sduNdRBAewsmpgn_lgevMYWZUjbfW5HyX6TaPo_eQBHQlmOxfOZpoEcs1zQM6JisoDNQfFtNBgvv4oTgHBcGMNw88KacgWcTKloClju58VyF8OW4RXsnQzhWyIp5wtwd1wy15DtwxLTbwpv73yYQQJVUVHmuC8V1OPWtp0aQ'


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


