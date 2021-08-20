import React, {useEffect} from "react";
import axios from "axios";
import {TOKEN} from "../../App";
import {
    ActivityIndicator,
    Button,
    DataTable,
    Checkbox,
    FAB,
    Portal,
    Provider,
    Snackbar,
    Text
} from "react-native-paper";
import {RefreshControl, ScrollView, StyleSheet, View, CheckBox} from "react-native";
import CourseModal2 from "../Modals/CourseModal2";
import Icon from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import style from "../styles/DarkMode";



export default function SelectedClasses({selected, getSelected, theme}) {
    const [isReady, setIsReady] = React.useState(false);
    const [addVisible, setAddVisible] = React.useState((selected.length > 0)? false : true);
    const [notSelected, setNotSelected] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [visible, setVisible] = React.useState(false)
    const [visible2, setVisible2] = React.useState(false)
    const [visible3, setVisible3] = React.useState(false)
    const [curr, setCurr] = React.useState(null)
    const [curr2, setCurr2] = React.useState(null)
    const [refreshing, setRefreshing] = React.useState(false);
    const [refreshing2, setRefreshing2] = React.useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getSelected();
        setRefreshing(false);
    }, []);


    const onRefresh2 = React.useCallback(() => {
        setRefreshing2(true);
        getNotSelected();
    }, []);


    const onToggleSnackBar = () => setVisible3(true);

    const onDismissSnackBar = () => setVisible3(false);

    const showModal = (i) => {setVisible(true); setCurr(i)}
    const showModal2 = (i) => {setVisible2(true); setCurr2(i)}
    const hideModal = () => setVisible(false)
    const hideModal2 = () => setVisible2(false)

    useEffect(() => {
        getNotSelected()
    }, [])


    const getNotSelected = () => {
        axios.get('http://192.168.44.79:8080/u/0/students/courses/optional'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setNotSelected(response.data)
                setIsReady(true)
                setRefreshing2(false);
            })
            .catch(function (error) {
                console.log('error: ',error);
                setRefreshing2(false);
            })
    }

    const onSubmitOptional = () => {
        const ids = checked.map(el => notSelected[el].courseImplementationId);
        console.log(checked);
        axios.post('http://192.168.44.79:8080/u/0/students/courses/select-additional', [...ids]
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setChecked([])
                getSelected()
            })
            .catch(function (error) {
                onToggleSnackBar()
                console.log(error);
            });
        setAddVisible(false)
    }



    if (!isReady) {
        return (
            <View style={{ height: '100%', backgroundColor: theme.mainBackground }}>
                <ActivityIndicator style={{marginTop: '50%'}} color={'#2C8BD3'} size={'large'}/>
            </View>
        )
    }


    return (
        <View style={{backgroundColor: theme.mainBackground, height: '100%'}}>
            {!addVisible?
                <>
                <ScrollView style={{backgroundColor: theme.mainBackground}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text style={{color: theme.secondary, fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: theme.titleBackground, fontSize: 18, textAlign: 'center'}}>Odabrani izborni predmeti</Text>
                        <DataTable style={{backgroundColor: theme.mainBackground}}>
                            <DataTable.Header style={{backgroundColor: theme.tableHeaderBackground}}>
                                <DataTable.Title style={{ flex: 3}}><Text style={{fontWeight: 'bold', color: theme.text}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>P+V+S</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>ECTS</Text></DataTable.Title>
                            </DataTable.Header>
                        {
                            selected.map((p, i) => {
                                return(
                                    <DataTable.Row key={'s'+i} onPress={() => {showModal(i)}} style={{backgroundColor: theme.secondaryBackground}}>
                                        <DataTable.Cell style={{ flex: 3.5}}>
                                            <Text style={{color: theme.text}}>{p.courseName}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={{color: theme.text}}>{p.exerciseHours}+{p.lectureHours}+{p.seminarHours}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text style={{color: theme.text}}>{p.ects}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })
                        }
                        </DataTable>
                </ScrollView>
                    <FAB
                        style={style.fab}
                        small
                        icon="plus"
                        onPress={() => setAddVisible(true)}
                    />
                </>
                :
                <>
                <ScrollView style={{backgroundColor: theme.mainBackground}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing2}
                            onRefresh={onRefresh2}
                        />
                    }
                >
                    <Text style={{color: theme.secondary, fontWeight: 'bold', paddingTop: '6%', paddingLeft: '4%', paddingBottom: '3.5%', backgroundColor: theme.titleBackground, fontSize: 18, textAlign: 'center'}}>Dostupni izborni predmeti</Text>
                        <DataTable style={{backgroundColor: theme.mainBackground}}>
                            <DataTable.Header style={{backgroundColor: theme.tableHeaderBackground}}>
                                <DataTable.Title style={{flex: 0.2}}> </DataTable.Title>
                                <DataTable.Title style={{flex: 2}}><Text style={{fontWeight: 'bold', color: theme.text}}>Predmet</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>P+V+S</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>ECTS</Text></DataTable.Title>
                                <DataTable.Title numeric><Text style={{fontWeight: 'bold', color: theme.text}}>Označi</Text></DataTable.Title>
                            </DataTable.Header>
                            {
                            notSelected.map((p, i) => {
                                return(
                                    <DataTable.Row key={'d'+i} onPress={() => {showModal2(i)}} style={{backgroundColor: theme.secondaryBackground}}>
                                        <DataTable.Cell style={{flex: 0.2}}>
                                            <Icon
                                                name='info'
                                                type='material'
                                                color={theme.helperIcon}
                                                size={14}/>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 2.3}}>
                                            <Text style={{color: theme.text}}>{p.courseName}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 1}} numeric>
                                            <Text style={{color: theme.text}}>{p.exerciseHours}+{p.lectureHours}+{p.seminarHours}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{flex: 0.8}} numeric>
                                            <Text style={{color: theme.text}}>{p.ects}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell key={'kk'+i} numeric>
                                            <BouncyCheckbox
                                                onPress={() => {
                                                    let pom = checked
                                                    if(pom.includes(i)) {
                                                        const index = pom.indexOf(i);
                                                        if (index > -1) {
                                                            pom.splice(index, 1);
                                                        }
                                                    }
                                                    else
                                                        pom.push(i)
                                                    setChecked(pom)
                                                }}
                                                isChecked={checked.includes(i)}
                                                fillColor={'dodgerblue'}
                                                iconStyle={{borderColor: 'black'}}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })
                            }
                            <DataTable.Row></DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell></DataTable.Cell>
                                <DataTable.Cell>
                                    <Button color={'whitesmoke'} style={{backgroundColor: 'dodgerblue'}} onPress={() => onSubmitOptional()}>Potvrdi</Button>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                </ScrollView>
                    <FAB
                        style={style.fab2}
                        small
                        icon="close"
                        onPress={() => setAddVisible(false)}
                    />
                </>
            }
            <Provider>
                <Portal>
                    <CourseModal2 theme={theme} index={curr} visible={visible} courses={selected} hideModal={hideModal}/>
                    <CourseModal2 theme={theme} index={curr2} visible={visible2} courses={notSelected} hideModal={hideModal2}/>
                </Portal>
            </Provider>
            <Snackbar
                visible={visible3}
                onDismiss={onDismissSnackBar}
                style={{marginBottom: '25%'}}
                action={{
                    label: 'X',
                    onPress: () => {
                        onDismissSnackBar()
                    },
                }}>
                Došlo je do greške!
            </Snackbar>
        </View>
    );
}
