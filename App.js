import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiIxZDVhZjg4NC02YzJjLTRjOWItYjhhMi05M2NlNTgwZTk2YTciLCJleHAiOjE2MjczNzcwMzUsIm5iZiI6MCwiaWF0IjoxNjI3MjkwNzk2LCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiYjExNzE5ZDEtN2JkYi00MjM5LWE4YTYtMzA0M2EzMzBjZWU2IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiOTZmNGRlMmQtZjZlMS00OGUyLTg3MTAtOWUyN2E1NjI2MjRiIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEifQ.YTE9UXQ86WFAoPnX_3UyYNHXEoNi31riAHQz34mpDGqbHvu_K1uDrVmBsdISN63BnHIN6Tg5a8TJWnit7Gx32454iHqnI5zi4O2n8vlBbF4MnZXSOxI-oXIjbnu9p8MCAvPGVjoYc2K3-zmp6tSnXusD4Ekt_-EZZI2Uhmsy2hfFyWuAxzE03pHSUv_UjEiYhurxrMyi2L7_bIItLiQqGrgw6gtvMYTe4J-Sun4eotBzLEHL69U5rtHFwXe1L_bBJp4NsMnvhf1Yd9NIzGnsf7Te_fWcgXJBUpUXGUiaT7dHrfEqMuohM4Ep0Loe1c_nBaXyykAsQr0vzeyW6nB1EQ'


export default function App() {
    return (

        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>

    );
}


