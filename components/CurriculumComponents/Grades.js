import React, {useEffect} from 'react'
import {
    Banner,
    Subheading,
    Caption,
    ActivityIndicator,
    List, DataTable, Text,
} from "react-native-paper";
import {ScrollView, StyleSheet} from "react-native";
import axios from "axios";
import {TOKEN} from "../../App";


const pom = [
    {
        courseName: 'DSAdas', markNumber: 8, mark: '8(oaskd)', teacher: 'dasda asfasf', examDate: '16156156', ects: '5', markStatus: 1
    },
    {
        courseName: 'DSAdas', markNumber: 8, mark: '8(oaskd)', teacher: 'dasda asfasf', examDate: '16156156', ects: '5', markStatus: 0
    },
    {
        courseName: 'DSAdas', markNumber: 8, mark: '8(oaskd)', teacher: 'dasda asfasf', examDate: '16156156', ects: '5', markStatus: 1
    },
    {
        courseName: 'DSAdas', markNumber: 8, mark: '8(oaskd)', teacher: 'dasda asfasf', examDate: '16156156', ects: '5', markStatus: 1
    },
    {
        courseName: 'DSAdas', markNumber: 8, mark: '8(oaskd)', teacher: 'dasda asfasf', examDate: '16156156', ects: '5', markStatus: 0
    },
    {
        courseName: 'DSAdas', markNumber: 8, mark: '8(oaskd)', teacher: 'dasda asfasf', examDate: '16156156', ects: '5', markStatus: 1
    },
]





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
        axios.get('http://192.168.44.83:8080/u/0/student-exams/all-grades/'
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
        return <ActivityIndicator color={'dodgerblue'} size={'large'}/>
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
            <ScrollView>
                <List.Section
                    title="Predmet (ocjena)"
                    titleStyle={{color: 'dodgerblue', fontWeight: 'bold'}}
                >
                    {(grades.length > 0)?

                            grades.map((grade, ind) => {
                                return (
                                    <List.Accordion
                                        key={ind}
                                        id={ind}
                                        title={`${grade.courseName}  (${grade.markNumber})`}
                                        titleStyle={{fontWeight: 'bold'}}
                                        style={{backgroundColor: grade.markStatus===0? '#faece8':'whitesmoke'}}
                                        expanded={ind === activeList}
                                        onPress={() => handlePress(ind, grade)}
                                    >
                                        <List.Item
                                            title={`Predmet: ${grade.courseName}`}
                                        />
                                        <List.Item
                                            title={`Nastavnik: ${grade.teacher}`}
                                        />
                                        <List.Item
                                            title={`Datum: ${getDateFormated(grade.examDate)}`}
                                        />
                                        <List.Item
                                            title={`ECTS: ${grade.ects}`}
                                        />
                                        <List.Item
                                            title={`Ocjena:  ${grade.mark}`}
                                            titleStyle={{color: (grade.markStatus === 1) ? 'black' : '#c2a711'}}
                                        />
                                    </List.Accordion>
                                );
                            }) :
                        <Text style={{textAlign: 'center'}}>Nemate upisanih ocjena</Text>
                    }
                </List.Section>
            </ScrollView>
            <DataTable style={{backgroundColor: '#434343'}}>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Subheading style={{color: 'white'}}>Prosjek</Subheading>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Subheading style={{color: 'white'}}>ECTS <Caption style={{color: 'whitesmoke'}}>(Σ)</Caption></Subheading>
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>
                        <Subheading style={{color: 'white'}}>   {average}</Subheading>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                        <Subheading style={{color: 'white'}}>{ectsSum}   </Subheading>
                    </DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </>
    );
}