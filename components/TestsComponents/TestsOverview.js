import React from 'react'
import {ScrollView, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";
import {Button, Caption, DataTable, Divider, List, Portal, Provider, Snackbar, Text} from "react-native-paper";
import CourseModal from "../Modals/CourseModal";
import AreYouSureModal from "../Modals/AreYouSureModal";
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatTimestamp, formatType} from "../Formats/MyFormats";



export default function TestsOverview({setExams, setCurrentExams,past, current, theme}) {
    const [activeList, setActiveList] = React.useState(88);
    const [activeList2, setActiveList2] = React.useState(null);
    const [visible, setVisible] = React.useState(false)
    const [visible2, setVisible2] = React.useState(false)
    const [visible3, setVisible3] = React.useState(false)
    const [courseToDelete, setCourseToDelete] = React.useState({})
    const [curr, setCurr] = React.useState(null)
    const [curr2, setCurr2] = React.useState(null)
    const [visible4, setVisible4] = React.useState(false);



    const deleteCourse = () => {
        axios.put(`http://192.168.44.79:8080/u/0/student-exams/cancellation/${courseToDelete.studentGradedActivityId}`,
            {},
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setCurrentExams()
                setExams()
                onToggleSnackBar()
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }


    const showModal = (i) => {setVisible(true); setCurr(i)}
    const showModal2 = (i) => {setVisible2(true); setCurr2(i)}
    const showModal3 = () => setVisible3(true)
    const hideModal = () => setVisible(false)
    const hideModal2 = () => setVisible2(false)
    const hideModal3 = () => setVisible3(false)


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


    const onToggleSnackBar = () => setVisible4(true);

    const onDismissSnackBar = () => setVisible4(false);


    return (
        <View style={{backgroundColor: theme.mainBackground, height: '100%'}}>
            <ScrollView style={{backgroundColor: theme.mainBackground}}>
            <List.Section
                    title="Prijavljeni ispiti"
                    titleStyle={{color: theme.secondary, fontWeight: 'bold', backgroundColor: theme.titleBackground, fontSize: 18, textAlign: 'center'}}>
                    <List.Accordion
                        title={`Trenutno prijavljeni ispiti`}
                        titleStyle={{fontWeight: 'bold', color: theme.text}}
                        style={{backgroundColor: theme.listTableHeaderBackground}}
                        theme={{ colors: { primary: '#2C8BD3' }}}
                        expanded={88 === activeList}
                        onPress={() => handlePress(88)}>
                        { (current.length > 0)?
                            <DataTable>
                                <DataTable.Header style={{backgroundColor: theme.tableHeaderBackground}}>
                                    <DataTable.Title style={{flex: 0.3}}> </DataTable.Title>
                                    <DataTable.Title><Text style={{fontWeight: 'bold', color: theme.text}}>Predmet</Text></DataTable.Title>
                                    <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>Datum</Text></DataTable.Title>
                                    <DataTable.Title numeric> </DataTable.Title>
                                </DataTable.Header>
                                {
                                    current.map((p, i) => {
                                        return (
                                            <DataTable.Row key={'s' + i} onPress={() => {showModal(i)}} style={{backgroundColor: theme.secondaryBackground}}>
                                                <DataTable.Cell style={{flex: 0.2}}>
                                                    <Icon
                                                        name='info'
                                                        type='material'
                                                        color={theme.helperIcon}
                                                        size={14}/>
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                    <Text style={{color: theme.text}}>{p.courseName}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    <Text style={{color: theme.text}}>{formatTimestamp(p.examDate)}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    <Button key={'bb'+i} color={'#DF3D3D'} style={{backgroundColor: 'rgba(164, 171, 181, 0.1)'}} onPress={() => {showModal3(); setCourseToDelete(p)}}>Odjavi</Button>
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        );
                                    })
                                }
                            </DataTable>
                            :
                            <Caption style={{textAlign: 'center', padding: '10%', color: theme.text}}>Nemate prijavljenih ispita</Caption>
                        }
                    </List.Accordion>
                    <Divider key={'dev'+88}/>
                    <List.Accordion
                        title={`Prethodno prijavljeni ispiti`}
                        titleStyle={{fontWeight: 'bold', color: theme.text}}
                        style={{backgroundColor: theme.listTableHeaderBackground}}
                        theme={{ colors: { primary: '#2C8BD3' }}}
                        expanded={88 === activeList2}
                        onPress={() => handlePress2(88)}>
                        { (past.length > 0)?
                            <DataTable>
                            <DataTable.Header style={{backgroundColor: theme.tableHeaderBackground}}>
                                <DataTable.Title style={{flex: 0.3}}> </DataTable.Title>
                                <DataTable.Title><Text style={{fontWeight: 'bold', color: theme.text}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>Datum</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>Tip ispita</Text></DataTable.Title>
                            </DataTable.Header>
                                {
                                past.map((p, i) => {
                                    return(
                                        <DataTable.Row key={'d'+i} onPress={() => {showModal2(i)}} style={{backgroundColor: theme.secondaryBackground}}>
                                            <DataTable.Cell style={{flex: 0.2}}>
                                                <Icon
                                                    name='info'
                                                    type='material'
                                                    color={theme.helperIcon}
                                                    size={14}/>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Text style={{color: theme.text}}>{p.courseName}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                <Text style={{color: theme.text}}>{formatTimestamp(p.examDate)}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                <Text style={{color: theme.text}}>{formatType(p.gradedActivityType)}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }
                            </DataTable>
                                :
                            <Caption style={{textAlign: 'center', padding: '100', color: theme.text}}>Nemate prijavljenih prethodno ispita</Caption>
                        }
                    </List.Accordion>
                </List.Section>
            </ScrollView>
            <Provider>
                <Portal>
                    <CourseModal index={curr} visible={visible} courses={current} theme={theme} hideModal={hideModal}/>
                    <CourseModal index={curr2} visible={visible2} courses={past} theme={theme} hideModal={hideModal2}/>
                    <AreYouSureModal text={`Da li ste sigurni da želite odjaviti ispit iz predmeta ${courseToDelete.courseName}?`} theme={theme} deleteCourse={deleteCourse} hideModal={hideModal3} visible={visible3}/>
                </Portal>
            </Provider>
            <Snackbar
                visible={visible4}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'X',
                    onPress: () => {
                        onDismissSnackBar()
                    },
                }}>
                Uspješno ste odjavili ispit.
            </Snackbar>
        </View>
    );
}