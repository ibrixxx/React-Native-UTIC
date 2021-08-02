import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {DataTable, Portal, Provider, Title} from "react-native-paper";
import {white} from "react-native-paper/src/styles/colors";
import {Icon} from "react-native-elements";
import axios from "axios";
import {TOKEN} from "../../App";
import CourseModal2 from "../Modals/CourseModal2";
import DocsModal from "../Modals/DocsModal";

export default function DocHistory(){
    const [prevRequests, setPrevRequests] = useState({});
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const hideModal = () => setVisible(false)

    useEffect(() => {
        getPrevRequests();
    }, [])

    const getPrevRequests = () => {
        axios.get(' http://192.168.44.79:8080/u/0/student-documents/requests/bs', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setPrevRequests(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
    }

    function getStyle(str){
        if (str === "primljen zahtjev" || str === "u obradi") return styles.yellowStyle
        if (str === "obrađen") return styles.greenStyle
        if (str === "poništen" || str === "odbijen") return styles.redStyle
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <DataTable>
                        <DataTable.Header style={{ width: '100%' }}>
                            <DataTable.Title style={{ flex: 0.75 }}>Tip dokumenta</DataTable.Title>
                            <DataTable.Title style={{ flex: 0.25 }}>Datum</DataTable.Title>
                        </DataTable.Header>

                        {   (prevRequests && prevRequests.length > 0) ? prevRequests.map((prev, i) =>
                            (prev.documentStatusName !== "primljen zahtjev") ?
                                <DataTable.Row style={getStyle(prev.documentStatusName)} onPress={() => showModal(i)} >
                                    {   (prev.certificateReasonName === "") ? <DataTable.Cell style={{ flex: 0.75 }}>{prev.documentTypeName}</DataTable.Cell> :
                                        <DataTable.Cell style={{ flex: 0.75 }}>{prev.certificateReasonName}</DataTable.Cell>
                                    }
                                    <DataTable.Cell style={{ flex: 0.25 }}>{getDateFormated(prev.date)}</DataTable.Cell>
                                </DataTable.Row> : null
                        ):<Text>Nema</Text>

                        }
                    </DataTable>


                </ScrollView>
                <Provider>
                    <Portal>
                        <DocsModal index={curr} visible={visible} docs={prevRequests} hideModal={hideModal}/>
                    </Portal>
                </Provider>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#aaa'
    },
    yellowStyle: {
        backgroundColor: '#F6F5DB'
    },
    redStyle: {
        backgroundColor: '#FBE9E9'
    },
    greenStyle: {
        backgroundColor: '#E9FBE4'
    }
});