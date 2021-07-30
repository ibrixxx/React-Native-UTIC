import React, {useEffect} from 'react'
import {ScrollView, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {DataTable, List, Portal, Provider} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../App";
import FAQModal from "./Modals/FAQModal";

export default function FAQ({ navigation }) {
    const [questions, setQuestions] = React.useState({});
    const [visible, setVisible] = React.useState(false)
    const [curr, setCurr] = React.useState(null)

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const hideModal = () => setVisible(false)

    useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = () => {
        axios.get(' http://192.168.44.79:8080/u/0/faq/by-user-type', {
            headers: {
                Accept: 'application/json',
                Authorization: TOKEN
            }
        })
            .then(respnse => {
                console.log(respnse.data)
                setQuestions(respnse.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <MyHeader myTitle="FAQ" navigation={navigation}/>
            <Text style={{color: 'dodgerblue', fontWeight: 'bold', fontSize: 18, paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', textAlign: 'center'}}>
                Najčešće postavljena pitanja
            </Text>

            <DataTable style={{ width: '100%', backgroundColor: 'white' }}>
                { (questions && questions.length > 0) ?
                    questions.map((ques, index) => (
                        <DataTable.Row key={index} onPress={() => {showModal(index)}}>
                            <DataTable.Cell>{ques.question}</DataTable.Cell>
                        </DataTable.Row>
                    ))
                    : <Text>Nema</Text>

                }
            </DataTable>

            <Provider>
                <Portal>
                    <FAQModal index={curr} visible={visible} questions={questions} hideModal={hideModal}/>
                </Portal>
            </Provider>
        </>
    );
}