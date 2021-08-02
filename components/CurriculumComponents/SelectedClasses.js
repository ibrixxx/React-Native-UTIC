import React, {useEffect} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {ActivityIndicator, Button, Checkbox, DataTable, Divider, List, Portal, Provider} from "react-native-paper";
import {ScrollView, View} from "react-native";
import CourseModal2 from "../Modals/CourseModal2";


export default function SelectedClasses({selected}) {
    const [isReady, setIsReady] = React.useState(false);
    const [activeList, setActiveList] = React.useState(88);
    const [activeList2, setActiveList2] = React.useState(null);
    const [notSelected, setNotSelected] = React.useState([]);
    const [checked, setChecked] = React.useState(null);
    const [visible, setVisible] = React.useState(false)
    const [visible2, setVisible2] = React.useState(false)
    const [curr, setCurr] = React.useState(null)
    const [curr2, setCurr2] = React.useState(null)

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const showModal2 = (i) => {setVisible2(true); setCurr2(i)}
    const hideModal = () => setVisible(false)
    const hideModal2 = () => setVisible2(false)

    useEffect(() => {
        axios.get('http://192.168.44.79:8080/u/0/students/courses/optional'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setNotSelected(response.data)
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

    const handlePress2 = (ind) => {
        if(activeList2 === ind)
            setActiveList2(null)
        else
            setActiveList2(ind)
    }


    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
    }


    return (
        <View style={{backgroundColor: '#e0e0e0', height: '100%'}}>
        <ScrollView style={{backgroundColor: '#e0e0e0'}}>
            <List.Section
                title="Izborni predmeti"
                titleStyle={{color: 'dodgerblue', fontWeight: 'bold', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>
                    <List.Accordion
                        title={`Odabrani izborni predmeti`}
                        titleStyle={{fontWeight: 'bold'}}
                        theme={{ colors: { primary: 'dodgerblue' }}}
                        expanded={88 === activeList}
                        onPress={() => handlePress(88)}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Predmet</DataTable.Title>
                                <DataTable.Title numeric>P+V+S</DataTable.Title>
                                <DataTable.Title numeric>ECTS</DataTable.Title>
                            </DataTable.Header>
                        {
                            selected.map((p, i) => {
                                return(
                                        <DataTable.Row key={'s'+i} onPress={() => {showModal(i)}}>
                                            <DataTable.Cell>
                                                {p.courseName}
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {p.exerciseHours}+{p.lectureHours}+{p.seminarHours}
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {p.ects}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                );
                            })
                        }
                        </DataTable>
                    </List.Accordion>
                    <Divider key={'dev'+88}/>

                    <List.Accordion
                        title={`Dostupni izborni predmeti`}
                        titleStyle={{fontWeight: 'bold'}}
                        theme={{ colors: { primary: 'dodgerblue' }}}
                        expanded={88 === activeList2}
                        onPress={() => handlePress2(88)}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Predmet</DataTable.Title>
                                <DataTable.Title numeric>P+V+S</DataTable.Title>
                                <DataTable.Title numeric>ECTS</DataTable.Title>
                                <DataTable.Title numeric>Označi</DataTable.Title>
                            </DataTable.Header>
                        {
                            notSelected.map((p, i) => {
                                return(
                                    <DataTable.Row key={'d'+i} onPress={() => {showModal2(i)}}>
                                        <DataTable.Cell>
                                            {p.courseName}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {p.exerciseHours}+{p.lectureHours}+{p.seminarHours}
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {p.ects}
                                        </DataTable.Cell>
                                        <DataTable.Cell key={'kk'+i} numeric>
                                            <Checkbox
                                                status={checked===i? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked(i);
                                                }}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })
                        }
                            <DataTable.Row>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <Button color={'darkgreen'} onPress={() => console.log('Pressed')}>Potvrdi</Button>
                            </DataTable.Row>
                        </DataTable>
                    </List.Accordion>
            </List.Section>
        </ScrollView>
            <Provider>
                <Portal>
                    <CourseModal2 index={curr} visible={visible} courses={selected} hideModal={hideModal}/>
                    <CourseModal2 index={curr2} visible={visible2} courses={notSelected} hideModal={hideModal2}/>
                </Portal>
            </Provider>
        </View>
    );
}