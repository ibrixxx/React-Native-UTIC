import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiJjYzVlNDRmZC01MDMyLTQwZWEtOTZmNS1lM2RhMTY0ZDM3ODciLCJleHAiOjE2Mjg3NTcyNjYsIm5iZiI6MCwiaWF0IjoxNjI4NjcwOTA4LCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiNjkyNmM4NWQtMmY4ZS00OThlLTgzNzEtZWU0NTAwOTdjYjY2IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNDY4Y2EwNzEtYjI2Yi00ZGRmLWJiMjItNmEyZWRmNDVmNmFkIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEifQ.pS9C6zYmggOVgpk0Jgcef_TsWYwlgcgAx5KxNb5-ORtMdaCMLGoa3FYZqE9tcd6jEWa2P5xcsbRH_Iy_GDhJqOzJs7Baimw7n5Vgb6Vo4bY3_m7txqEiwVEf0ZAxZbIs7FrpxN6OaM_oDCbJIH9Vd6Ol9GKcR7Dr_T1zLVrHw4xjVD-YIEYbjv_nb9fgKKZvALH_K3Q11q6JL9GDKsOV1tOO7flQ7S8hgJrg0sUZQ8Yn3814n18Hhm-aJVeJ0tkpJj2Z8aKbcU2z5HECULcfOyFFMhjfwoGgkN3u7iuEpVg0djAkSx-XCn8mG_v0OktSOMlDn0v-LVWDHyXixz6-NQ'


export default function App() {
    return (

        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>

    );
}


