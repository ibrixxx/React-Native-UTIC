import React, {useEffect} from 'react'
import {
    Banner,
    Subheading,
    Caption,
    ActivityIndicator,
    List, DataTable, Text, Divider, Title
} from "react-native-paper";
import {RefreshControl, ScrollView, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";
import {formatTimestamp} from "../Formats/MyFormats";
import Icon from 'react-native-vector-icons/FontAwesome';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function Grades() {
    const [visible, setVisible] = React.useState(false);
    const [grades, setGrades] = React.useState([]);
    const [ectsSum, setEctsSum] = React.useState(0);
    const [average, setAverage] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [activeList, setActiveList] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        axios.get('http://192.168.44.79:8080/u/0/student-exams/all-grades/'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setGrades(response.data.grades)
                setAverage(response.data.gradeAverage)
                setEctsSum(response.data.ectsTotal)
                setRefreshing(false)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
        //wait(2000).then(() => setRefreshing(false));
    }, []);


    const handlePress = (ind, grade) => {
        if(activeList === ind) {
            setActiveList(null)
            setVisible(false)
        }
        else {
            setActiveList(ind)
            if(grade.markStatus === 0)
                setVisible(true)
            else
                setVisible(false)
        }
    }


    useEffect(() => {
        axios.get('http://192.168.44.79:8080/u/0/student-exams/all-grades/'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setGrades(response.data.grades)
                setAverage(response.data.gradeAverage)
                setEctsSum(response.data.ectsTotal)
                setIsReady(true)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])


    if (!isReady) {
        return <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
    }


    return (
        <>
            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'OK',
                        labelStyle: {color: '#c2a711', backgroundColor: 'whitesmoke'},
                        onPress: () => setVisible(false),
                    }
                ]}
            >
                <Subheading>Žutom bojom su označene ocjene koje još uvijek nisu
                    finalizirane. {"\n"}</Subheading>
                <Caption>U slučaju greške, obratite se odgovarajućem profesuru/ici ili
                    studentskoj službi.</Caption>
            </Banner>
            <ScrollView style={{backgroundColor: '#e0e0e0'}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={{color: '#2C8BD3', fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>Položeni predmeti</Text>
                <DataTable style={{width: '100%'}}>
                    <DataTable.Header style={{width: '100%', backgroundColor: '#e8eded'}}>
                        <DataTable.Title><Text style={{fontWeight: 'bold'}}>Predmet</Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={{fontWeight: 'bold'}}>Ocjena</Text></DataTable.Title>
                        <DataTable.Title style={{flex: 0.3}}></DataTable.Title>
                    </DataTable.Header>
                    {
                        (grades.length > 0)?
                            grades.map((grade, ind) => {
                                return (
                                    <DataTable.Row style={{backgroundColor: grade.markStatus===0? '#faece8':'whitesmoke'}} key={ind}>
                                        <DataTable.Cell style={{flex: 1}}>{grade.courseName}</DataTable.Cell>
                                        <DataTable.Cell numeric><Caption style={{color: (grade.markStatus === 1) ? 'black' : '#c2a711'}}>{grade.mark}</Caption></DataTable.Cell>
                                        <DataTable.Cell style={{flex: 0.3}} numeric>
                                            <Icon name="ellipsis-h" size={20} color="#888888" />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            }) :
                        <Text style={{textAlign: 'center'}}>Nemate upisanih ocjena</Text>
                    }
                </DataTable>
            </ScrollView>
            <DataTable style={{backgroundColor: '#263238'}}>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Title style={{color: 'white'}}> Prosjek</Title>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Title style={{color: 'white'}}>ECTS  </Title>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Subheading style={{color: 'white', fontWeight: 'bold'}}>    {average}</Subheading>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Subheading style={{color: 'white', fontWeight: 'bold'}}>{ectsSum}    </Subheading>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </>
    );
}