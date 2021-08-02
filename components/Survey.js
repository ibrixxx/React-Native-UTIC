import React, {useState} from 'react'
import {View} from "react-native";
import MyHeader from "./MyHeader";
import {ActivityIndicator, Caption, Card, DataTable} from "react-native-paper";

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
            <Card style={{height: '100%'}}>
                <Card.Title
                    title="Trenutne ankete"
                    titleStyle={{color: 'dodgerblue'}}
                />
                <Card.Content>
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
                        <Caption>Trenutno nema anketa</Caption>
                    }
                </Card.Content>
            </Card>
        </View>
    );
}