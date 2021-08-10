import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyDrawer from "./components/MyDrawer";


export const TOKEN = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiIwNTY3ZmE4OS0wYjI5LTQyNGQtYmU0Ny0wYTViNWU0OTEzNTIiLCJleHAiOjE2Mjg2NzQ2NDcsIm5iZiI6MCwiaWF0IjoxNjI4NTg4MjY4LCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiZGE3YWIzNWMtMjViNC00YzZlLThmYzUtYWMyNTZiZWVkMzdjIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiNDY0ZmY5ZmMtMTJkYy00YjkzLWEwOGUtOTQ4YzI5N2Y1YTU5IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEifQ.f7YGNY1OQi7pFc9JmdSoKXUSIxBIkq5bVtW4N3fJiLNL8lTNLTwEWK2_PnTuzfE_p-yv2p-iZXYOhYGvHu2XB-Gk_0pobEaKxCFgR07S2LZny9_CUuNLiKcvGOTr2X_FAI6o-5rUatSB1jSnhme9NsnpUP527CoZ9-1HAxLmrqIddmt9IV3Bt04vPB1AMhTYv7lmVpdeq5fCehURF-dxabhPH4VHSUUjdjvGQQhBLcWoR57kfNlQdo9xy7UXjSzEdB0AfcQdAAQR2fgqQZaqSnIzNaDSBOhGXBLFVSHo7bcJOsDJ5XQDmX6YangH94IAzUTkR0xEEtyY0OpT38_ymA'


export default function App() {
    return (

        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>

    );
}


