import React from "react";
import {Caption, DataTable, Portal, Provider, Text} from "react-native-paper";
import CourseModal2 from "../Modals/CourseModal2";

export default function CurrentSemester({classes}) {
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const hideModal = () => setVisible(false)

    return(
        <>
            <Text style={{color: 'dodgerblue', fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>Spisak predmeta</Text>
            <DataTable style={{width: '100%'}}>
                <DataTable.Header style={{width: '100%'}}>
                    <DataTable.Title><Text style={{fontWeight: 'bold'}}>Predmet</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>P+V+S</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>ECTS</Text></DataTable.Title>
                </DataTable.Header>
                {
                    classes.map((c, index) => {
                        return (
                            <DataTable.Row style={{backgroundColor: c.mandatory? 'white':'#e1f2f5'}} key={index} onPress={() => {showModal(index)}}>
                                <DataTable.Cell><Caption>{c.courseName}</Caption></DataTable.Cell>
                                <DataTable.Cell numeric><Caption>{c.exerciseHours}+{c.lectureHours}+{c.seminarHours}</Caption></DataTable.Cell>
                                <DataTable.Cell numeric><Caption>{c.ects}</Caption></DataTable.Cell>
                            </DataTable.Row>
                            );
                    })
                }
            </DataTable>
            <Provider>
                <Portal>
                    <CourseModal2 index={curr} visible={visible} courses={classes} hideModal={hideModal}/>
                </Portal>
            </Provider>
        </>
    );
}


