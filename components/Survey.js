import React, {useRef, useState} from 'react'
import {View} from "react-native";
import MyHeader from "./MyHeader";
import {ActivityIndicator, Caption, Card, DataTable, Text} from "react-native-paper";
import BottomSheet from "./BottomSheet";

export default function Survey({ navigation, theme, changeTheme, role, isDark}) {
    const [surveys, setSurvey] = useState([])
    const [isReady, setIsReady] = React.useState(true)
    const refRBSheet = useRef();


    if (!isReady) {
        return(
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MyHeader myTitle="Ankete" navigation={navigation}/>
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        );
    }



    return (
        <View style={{backgroundColor: theme.mainBackground, height: '100%'}}>
            <MyHeader myTitle="Ankete" navigation={navigation} sheetOpen={() => {refRBSheet.current.open()}}/>
            <Text style={{color: theme.secondary, fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: theme.titleBackground, fontSize: 18, textAlign: 'center'}}>Trenutne ankete</Text>
            {(surveys.length > 0)?
                <DataTable>
                    <DataTable.Header style={{backgroundColor: theme.tableHeaderBackground}}>
                        <DataTable.Title style={{flex: 0.5}}><Text style={{backgroundColor: theme.text}}>Predmet</Text></DataTable.Title>
                    </DataTable.Header>
                    {
                        surveys.map((e, index) => {
                            return (
                                <DataTable.Row key={index} style={{backgroundColor: theme.secondaryBackground}}>
                                    <DataTable.Cell style={{flex: 0.5}}><Text style={{backgroundColor: theme.text}}>{e.courseName}</Text></DataTable.Cell>
                                </DataTable.Row>
                            );
                        })
                    }
                </DataTable>
                :
                <Caption style={{textAlign: 'center', paddingTop: '12%', color: theme.text}}>Trenutno nema anketa</Caption>
            }
            <BottomSheet myRef={refRBSheet} navigateHome={() => navigation.navigate('Home')} changeTheme={changeTheme} isDark={isDark}/>
        </View>
    );
}