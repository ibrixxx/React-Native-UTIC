import React, {useEffect} from 'react'
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, Button, Divider, List, Portal, Provider} from "react-native-paper";
import {ScrollView, View} from "react-native";
import CourseModal2 from "../Modals/CourseModal2";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AllSemesters({theme}) {
    const [isReady, setIsReady] = React.useState(false);
    const [semesters, setSemesters] = React.useState([]);
    const [activeList, setActiveList] = React.useState(null);
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const hideModal = () => setVisible(false)



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
                for(let e of response.data)
                    filtered.set(e.semesterNumber, [])
                for(let e of response.data)
                    filtered.get(e.semesterNumber).push(e)
                let result = []
                for(let sem of filtered)
                    result.push(sem)
                setSemesters(result)
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
        return <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
    }



    return (
        <ScrollView style={{backgroundColor: theme.titleBackground}}>
            <List.Section
                title="Nastavni plan i program"
                titleStyle={{color: theme.secondary, fontWeight: 'bold', backgroundColor: theme.titleBackground, fontSize: 18, textAlign: 'center'}}>
                {
                    semesters.map((sem, ind) => {
                        return (
                                <View key={ind}>
                                    <List.Accordion
                                        key={ind}
                                        id={ind}
                                        style={{backgroundColor: theme.listTableHeaderBackground, color: theme.text}}
                                        title={`${sem[0]}. semestar`}
                                        titleStyle={{fontWeight: 'bold', color: theme.text}}
                                        theme={{ colors: { primary: theme.secondary}}}
                                        expanded={ind === activeList}
                                        onPress={() => handlePress(ind)}>
                                        {
                                            sem[1].map((c, i) => {
                                                return (
                                                    <View key={'dss'+i}>
                                                        <List.Item
                                                            key={'li'+i}
                                                            title={c.courseName}
                                                            right={() => <Icon style={{margin: '2%'}} name="ellipsis-h" size={20} color={theme.text} />}
                                                            titleStyle={{fontWeight: 'bold', color: theme.text}}
                                                            onPress={() => showModal(i)}/>
                                                        <Divider/>
                                                    </View>
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
                <Provider>
                    <Portal>
                        <CourseModal2 theme={theme} index={curr} visible={visible} courses={semesters[activeList]? semesters[activeList][1]:[]} hideModal={hideModal}/>
                    </Portal>
                </Provider>
        </ScrollView>
    );
}