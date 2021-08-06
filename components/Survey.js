import React, {useState} from 'react'
import {View} from "react-native";
import MyHeader from "./MyHeader";
import {ActivityIndicator, Caption, Card, DataTable, Text} from "react-native-paper";

export default function Survey({ navigation }) {
    const [surveys, setSurvey] = useState([])
    const [isReady, setIsReady] = React.useState(true)



    if (!isReady) {
        return(
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MyHeader myTitle="Ankete" navigation={navigation}/>
                <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
            </View>
        );
    }



    return (
        <View>
            <MyHeader myTitle="Ankete" navigation={navigation}/>
            <Text style={{color: 'dodgerblue', fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>Trenutne ankete</Text>
            {(surveys.length > 0)?
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 0.5}}>Predmet</DataTable.Title>
                            </DataTable.Header>
                            {
                                surveys.map((e, index) => {
                                    return (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell style={{flex: 0.5}}>{e.courseName}</DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }
                        </DataTable>
                        :
                        <Caption style={{textAlign: 'center', paddingTop: '12%'}}>Trenutno nema anketa</Caption>
                    }
        </View>
    );
}