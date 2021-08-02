import React, {useEffect} from 'react'
import {
    Banner,
    Subheading,
    Caption,
    ActivityIndicator,
    List, DataTable, Text, Divider, Title
} from "react-native-paper";
import {ScrollView, View} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";



export default function Grades() {
    const [visible, setVisible] = React.useState(false);
    const [grades, setGrades] = React.useState([]);
    const [ectsSum, setEctsSum] = React.useState(0);
    const [average, setAverage] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [activeList, setActiveList] = React.useState(null);

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

    const getDateFormated = (n) => {
        const d = new Date(n);
        return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
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
        return <ActivityIndicator style={{marginTop: '50%'}} color={'dodgerblue'} size={'large'}/>
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
            <ScrollView style={{backgroundColor: '#e0e0e0'}}>
                <List.Section
                    title="Predmeti"
                    titleStyle={{color: 'dodgerblue', fontWeight: 'bold', backgroundColor: '#e0e0e0', fontSize: 18, textAlign: 'center'}}>
                    {
                        (grades.length > 0)?
                            grades.map((grade, ind) => {
                                return (
                                    <View key={ind}>
                                        <List.Accordion
                                            key={ind}
                                            id={ind}
                                            theme={{ colors: { primary: 'dodgerblue' }}}
                                            title={`${grade.courseName}`}
                                            titleStyle={{fontWeight: 'bold'}}
                                            style={{backgroundColor: grade.markStatus===0? '#faece8':'whitesmoke'}}
                                            expanded={ind === activeList}
                                            onPress={() => handlePress(ind, grade)}
                                        >
                                            <List.Item
                                                left={() => <Caption style={{marginLeft: '2%', marginTop: '2%'}}>Predmet: </Caption>}
                                                title={grade.courseName}
                                                titleStyle={{fontWeight: 'bold'}}
                                            />
                                            <List.Item
                                                left={() => <Caption style={{marginLeft: '2%', marginTop: '2%'}}>Nastavnik: </Caption>}
                                                title={grade.teacher}
                                                titleStyle={{fontWeight: 'bold'}}
                                            />
                                            <List.Item
                                                left={() => <Caption style={{marginLeft: '2%', marginTop: '2%'}}>Datum: </Caption>}
                                                title={getDateFormated(grade.examDate)}
                                                titleStyle={{fontWeight: 'bold'}}
                                            />
                                            <List.Item
                                                left={() => <Caption style={{marginLeft: '2%', marginTop: '2%'}}>ECTS: </Caption>}
                                                title={grade.ects}
                                                titleStyle={{fontWeight: 'bold'}}
                                            />
                                            <List.Item
                                                left={() => <Caption style={{marginLeft: '2%', marginTop: '2%'}}>Ocjena: </Caption>}
                                                title={grade.mark}
                                                titleStyle={{color: (grade.markStatus === 1) ? 'black' : '#c2a711', fontWeight: 'bold'}}
                                            />
                                        </List.Accordion>
                                        <Divider key={'dev'+ind}/>
                                    </View>
                                );
                            }) :
                        <Text style={{textAlign: 'center'}}>Nemate upisanih ocjena</Text>
                    }
                </List.Section>
            </ScrollView>
            <DataTable style={{backgroundColor: '#434343'}}>
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
                        <Subheading style={{color: 'white'}}>    {average}</Subheading>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Subheading style={{color: 'white'}}>{ectsSum}    </Subheading>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </>
    );
}