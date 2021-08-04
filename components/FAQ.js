import React, {useEffect, useState} from 'react'
import {ScrollView, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {DataTable, List, Portal, Provider, Searchbar, Title} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../App";
import FAQModal from "./Modals/FAQModal";
import {Icon} from "react-native-elements";

export default function FAQ({ navigation }) {
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [filterMode, setFilterMode] = useState(false);
    const [visible, setVisible] = useState(false)
    const [curr, setCurr] = useState(null)
    const [showSearchbar, setShowSearchBar] = useState(true);

    const showModal = (i) => {setVisible(true); setCurr(i); setShowSearchBar(false);}
    const hideModal = () => {setVisible(false); setShowSearchBar(true);}

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

    const onChangeSearch = query => {
        setFilterMode(true)
        setSearchQuery(query)
        setFilterData(
            questions.filter((ques) => {
                if(ques.question.toLowerCase().includes(query.toLowerCase()))
                    return ques
                else if(ques.question.toLowerCase().includes(query.toLowerCase()))
                    return ques
            })
        )
        if(query === '')
            setFilterMode(false)
    }

    const returnData = () => {
        if(filterMode) {
            return filterData
        }
        return questions
    }

    return (
        <>
            <MyHeader myTitle="FAQ" navigation={navigation}/>
            {
                showSearchbar ? <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{}}
                /> : <Title style={{ fontSize: 33, padding: 7, paddingLeft: 12 }}><Icon name="search" color="#777777"/></Title>
            }

            <Text style={{color: 'dodgerblue', fontWeight: 'bold', fontSize: 18, paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', textAlign: 'center'}}>
                Najčešće postavljena pitanja
            </Text>

            <DataTable style={{ width: '100%', backgroundColor: 'white' }}>
                {returnData().map((ques, index) => (
                        <DataTable.Row key={index} onPress={() => {showModal(index)}}>
                            <DataTable.Cell ><Text >{ques.question}</Text></DataTable.Cell>
                        </DataTable.Row>
                    ))

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