import React, {useEffect, useState} from 'react'
import {ScrollView, Text, View} from "react-native";
import MyHeader from "./MyHeader";
import {ActivityIndicator, DataTable, List, Portal, Provider, Searchbar, Title} from "react-native-paper";
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
    const [activeList, setActiveList] = React.useState(null);
    const [isReady, setIsReady] = useState(false)

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
                setIsReady(true)
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

    const handlePress = (ind) => {
        if(activeList === ind)
            setActiveList(null)
        else
            setActiveList(ind)
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

            <ScrollView>
                <List.Section
                    title="Najčešće postavljena pitanja"
                    titleStyle={{color: '#2C8BD3', fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>
                    {   isReady ?
                        (returnData() && returnData().length > 0) ? returnData().map((ques, i) =>{
                            return(
                                <View key={i}>
                                    <List.Accordion
                                        key={i}
                                        id={i}
                                        title={ques.question}
                                        titleStyle={{fontWeight: 'bold'}}
                                        style={{ backgroundColor: 'white' }}
                                        theme={{ colors: { primary: '#2C8BD3' }}}
                                        expanded={i === activeList}
                                        onPress={() => handlePress(i)}>

                                        <View style={{ padding: 20, backgroundColor: '#eeeeee'}}>
                                            <Text style={{ textAlign: 'justify'}}>{ques.answer}</Text>
                                        </View>

                                    </List.Accordion>
                                </View>
                            )
                        }) : null
                        : <ActivityIndicator style={{marginTop: '35%'}} color={'#2C8BD3'} size={'large'}/>
                    }
                </List.Section>
            </ScrollView>

            {/*<DataTable style={{width: '100%', backgroundColor: 'white'}}>*/}
            {/*    {(returnData() && returnData().length > 0)? returnData().map((ques, index) => (*/}
            {/*            <DataTable.Row key={index} onPress={() => {showModal(index)}}>*/}
            {/*                <DataTable.Cell ><Text >{ques.question}</Text></DataTable.Cell>*/}
            {/*            </DataTable.Row>*/}
            {/*        )) :*/}
            {/*        <Text*/}
            {/*            style={{ padding: 10, textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: "#434343", backgroundColor: '#f2f2f2' }}>Nema postavljenih pitanja</Text>*/}

            {/*    }*/}
            {/*</DataTable>*/}

            <Provider>
                <Portal>
                    <FAQModal index={curr} visible={visible} questions={questions} hideModal={hideModal}/>
                </Portal>
            </Provider>
        </>
    );
}
