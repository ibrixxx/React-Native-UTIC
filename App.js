import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Feed from "./components/Feed";
import Notifications from "./components/Notifications";
import Docs from "./components/Docs";
import CustomDrawerContent from "./components/CustomDrawerContent";


const Drawer = createDrawerNavigator();

export const token = 'BEARER eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHMkpLblhwd2NZOGlSd3g1ZEZBXy00YlNoX1ZzRTE1NWVvN2JhSk9uYzBrIn0.eyJqdGkiOiIzZDVkMDk5YS0zZjVlLTQxOTMtOTJjZC05ZGRkNjU5Mzg5MmYiLCJleHAiOjE2MjY0MjMzMDMsIm5iZiI6MCwiaWF0IjoxNjI2MzM3MTcwLCJpc3MiOiJodHRwczovL2Rldi5ldW5zYS5iYS9hdXRoL3JlYWxtcy9pc3NzIiwiYXVkIjoiZnJvbnRlbmQiLCJzdWIiOiIzM2YwOTMxNC04MTlhLTRjZWItOGRiMC1jYzFmN2NhYWJmYTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsIm5vbmNlIjoiNTI3MTk1MDAtZGJjNS00NDA1LTg1ZDktMmU0MjczZWQ2ZTk0IiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYjc0ZDlhYjgtYzkyNC00YWJlLThjYjUtNWQ4YzcwYzhiZDI5IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJuYW1lIjoixJBlbmFuYSBLdXN0dXJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoixJFrdXN0dXJhIiwiZ2l2ZW5fbmFtZSI6IsSQZW5hbmEiLCJmYW1pbHlfbmFtZSI6Ikt1c3R1cmEifQ.Ze4Jy_S1ygd4sAJQC7wa17OW9kDW41UbCiV5vvqFj4ULoWUpxpkdYr_OWRf71nx6xa6UKsGO-G2i1cBc-T-CbFETqjDCL6YB4wbLtCoKS12tru8h268FmV0P4hbsdQ70AsfmqTsUka9Yq8SS7ez6YnNuBRvV_wlBiaOAYNfPTau6OWJmDApAzDW29A5wLMsaWkrfQwXdqH-O02Zu0kWonwMtpngS37GGGlSbBE5wViSFDphGO4IlJ9VqxyQrYojUKffTg9hWxJ7FLl8XiNwpwQLneMR5iWQeCGxzHHTvhO1zHJq8Fv-4th7iaXVDswzZtG7CAZfwIN23R4Hie_QptA'

function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName={'Ispiti'} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Početna" component={Feed} />
            <Drawer.Screen name="Lični podaci" component={Notifications} />
            <Drawer.Screen name="Studij" component={Notifications} />
            <Drawer.Screen name="Ispiti" component={Notifications} />
            <Drawer.Screen name="Ankete" component={Notifications} />
            <Drawer.Screen name="Dokumenti" component={Docs} />
            <Drawer.Screen name="Nastavno osoblje" component={Notifications} />
            <Drawer.Screen name="Kontakt i informacije" component={Notifications} />
            <Drawer.Screen name="FAQ" component={Notifications} />
        </Drawer.Navigator>
    );
}


export default function App() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}


