import React, {useEffect} from 'react'
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, Divider, List, Text} from "react-native-paper";
import {ScrollView, View} from "react-native";

export default function AllSemesters() {
    const [isReady, setIsReady] = React.useState(false);
    const [semesters, setSemesters] = React.useState([]);
    const [activeList, setActiveList] = React.useState(null);


    useEffect(() => {
        axios.get('http://192.168.44.79:8080/u/0/students/study-program/overview'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                let filtered = new Map()
                console.log(response.data)
                for(let e of response.data)
                    filtered.set(e.semesterNumber, [])
                console.log(filtered)
                for(let e of response.data)
                    filtered.get(e.semesterNumber).push(e)
                console.log(filtered)
                let result = []
                for(let sem of filtered)
                    result.push(sem)
                setSemesters(result)
                console.log(result)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])


    const handlePress = (ind) => {
        if(activeList === ind)
            setActiveList(null)
        else
            setActiveList(ind)
    }


    if (!isReady) {
        return <ActivityIndicator color={'dodgerblue'} size={'large'}/>
    }



    return (
        <ScrollView style={{backgroundColor: '#e0e0e0'}}>
            <List.Section
                title="Nastavni plan i program"
                titleStyle={{color: 'dodgerblue', fontWeight: 'bold', backgroundColor: '#e0e0e0'}}
            >
                {
                    semesters.map((sem, ind) => {
                        return (
                            <View key={ind}>
                                <List.Accordion
                                    key={ind}
                                    id={ind}
                                    title={`Semestar ${sem[0]}`}
                                    titleStyle={{fontWeight: 'bold'}}
                                    expanded={ind === activeList}
                                    onPress={() => handlePress(ind)}
                                >
                                    {
                                        sem[1].map((c, i) => {
                                            return (
                                                <List.Item
                                                    key={'li'+i}
                                                    title={c.courseName}
                                                />
                                            );
                                        })
                                    }
                                </List.Accordion>
                                <Divider key={'dev'+ind}/>
                            </View>
                        );
                    })
            }
            </List.Section>
        </ScrollView>
    );
}