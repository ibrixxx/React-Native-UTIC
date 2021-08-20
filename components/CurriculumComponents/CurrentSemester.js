import React from "react";
import {Caption, DataTable, Portal, Provider, Text} from "react-native-paper";
import CourseModal2 from "../Modals/CourseModal2";
import {ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CurrentSemester({classes, theme}) {
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const hideModal = () => setVisible(false)

    return(
        <>
            <ScrollView style={{backgroundColor: theme.mainBackground, height: '100%'}}>
            <Text style={{color: theme.secondary, fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: theme.titleBackground, fontSize: 18, textAlign: 'center'}}>Spisak predmeta</Text>
            <DataTable style={{width: '100%', height: '100%', backgroundColor: theme.mainBackground}}>
                <DataTable.Header style={{width: '100%', backgroundColor: theme.tableHeaderBackground}}>
                    <DataTable.Title style={{flex: 2}}><Text style={{fontWeight: 'bold', color: theme.text}}>Predmet</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>P+V+S</Text></DataTable.Title>
                    <DataTable.Title style={{flex: 0.7}} numeric><Text style={{fontWeight: 'bold', color: theme.text}}>ECTS</Text></DataTable.Title>
                </DataTable.Header>
                {
                    classes.map((c, index) => {
                        return (
                            <DataTable.Row style={{backgroundColor: c.mandatory? theme.secondaryBackground:theme.notMandatoryClass}} key={index} onPress={() => {showModal(index)}}>
                                <DataTable.Cell style={{flex: 2}}><Text style={{color: theme.text}}>{c.courseName}</Text></DataTable.Cell>
                                <DataTable.Cell numeric><Text style={{color: theme.text}}>{c.exerciseHours}+{c.lectureHours}+{c.seminarHours}</Text></DataTable.Cell>
                                <DataTable.Cell style={{flex: 0.5}} numeric><Text style={{color: theme.text}}>{c.ects}</Text></DataTable.Cell>
                            </DataTable.Row>
                        );
                    })
                }
            </DataTable>
            </ScrollView>
            <Provider>
                <Portal>
                    <CourseModal2 theme={theme} index={curr} visible={visible} courses={classes} hideModal={hideModal}/>
                </Portal>
            </Provider>
        </>
    );
}


