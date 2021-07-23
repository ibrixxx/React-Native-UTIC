import React, {useEffect} from 'react'
import {View, Clipboard, Text} from "react-native";
import {DataTable, IconButton, Searchbar, Snackbar, Avatar} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../App";
import Toast from 'react-native-toast-message';
import MyHeader from "./MyHeader";


export default function Staff({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterData, setFilterData] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [filterMode, setFilterMode] = React.useState(false);
    const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);
    const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);
    const onDismissSnackBar = () => setVisibleSnackbar(false);


    const returnData = () => {
        if(filterMode) {
            return filterData
        }
        return data
    }

    const copyToClipboard = (email) => {
        Clipboard.setString(email)
        onToggleSnackBar()
    }


    const onChangeSearch = query => {
        setFilterMode(true)
        setSearchQuery(query)
        setFilterData(
            data.filter((person) => {
                if(person.firstName.toLowerCase().includes(query.toLowerCase()))
                    return person
                else if(person.lastName.toLowerCase().includes(query.toLowerCase()))
                    return person
            })
        )
        if(query === '')
            setFilterMode(false)
    }

    useEffect(() => {
        axios.get('http://192.168.44.83:8080/u/0/employees/info-for-students/by-key/assistant'
            , {
                headers: {
                    Accept: 'application/json',
                    Authorization: TOKEN
                }
            })
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])

    return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <MyHeader myTitle="Nastavno osoblje" navigation={navigation}/>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{}}
                />
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Prezime</DataTable.Title>
                            <DataTable.Title>Ime</DataTable.Title>
                            <DataTable.Title>Email</DataTable.Title>
                        </DataTable.Header>
                        {
                            returnData().map((prof, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{prof.lastName}</DataTable.Cell>
                                        <DataTable.Cell>{prof.firstName}</DataTable.Cell>
                                        <DataTable.Cell style={{borderColor: '#dcf3f5'}} onPress={() => {if(prof.emails.length > 0) copyToClipboard(prof.emails[0].value)}}> <Text style={{color: 'dodgerblue'}}>{(prof.emails.length > 0)? prof.emails[0].value:''}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                    </DataTable>
                    <Snackbar
                        visible={visibleSnackbar}
                        onDismiss={onDismissSnackBar}
                        action={{
                            label: 'Undo',
                            onPress: () => {
                                Clipboard.setString('')
                            },
                        }}>
                        Email copied to clipboard
                    </Snackbar>
            </View>
    );
}