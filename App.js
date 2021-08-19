import React, {useEffect, useState} from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";
import {darkTheme, lightTheme} from "./components/Colors/Themes";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiI3MmQ0ZGQxZC05MDJmLTQ5NjEtYTZlMS0wOGYxOGQyNDE0ZmMiLCJleHAiOjE2MjkzNzUyODYsIm5iZiI6MCwiaWF0IjoxNjI5Mjg4OTAwLCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiJlZTY1NjMzNS1kYjE3LTQ3MzEtYmFhNy02OWUwODkxZDAyOWMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiZDBkMTYzNWEtNDlkYy00NmQxLWIwODQtYjQxOTc0YjRmZDFlIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiZGJmYWE4ZWMtYjY1ZS00ZGI5LWI2NTYtY2ZmYmQyNDViNmMzIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0a2FyaXNpayJ9.P34IGKby7YLHrsc7QQ_awHV_nuWPPFOm_XgMAreHnwGTjUd_tHyGwOeoBjzFIoEmXSjxh3elpQ6GstYbbthV6o1bAU_qw0IIzvJYfekVMV3z8eJv23keOajmdrUw1B-bp6JEVG7Xk21eOvCwE7zpBNLjoVKq0fXBnxcE1LZkiYwGtuwMZUO8m2rmXZ3bmgUmKgTRpkL_dn6EAHJ0QDAqGmNE43tQUXIa1v1ULF2tpENByn-oPHtgmOdADqScliQknEPRzfhTkXPT5BgIZUSirjiZH1DU2r_y04yQZLDC1MgTyQBSG5X-6OvwWXkaosWtH3UFeCBAgFRY4YAw4axg3Q\n'


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


