import React, {useEffect} from 'react'
import {View, Clipboard, ToastAndroid, Text} from "react-native";
import {DataTable, IconButton, Searchbar} from "react-native-paper";
import axios from "axios";
import {TOKEN} from "../App";
import Toast from 'react-native-toast-message';


export default function Staff({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterData, setFilterData] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [filterMode, setFilterMode] = React.useState(false);

    const toastConfig = {
        success: ({ text1, props, ...rest }) => (
            <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
                <Text>{text1}</Text>
                <Text>{props.guid}</Text>
            </View>
        ),
        error: () => {},
        info: () => {},
        any_custom_type: () => {}
    };

    const returnData = () => {
        if(filterMode) {
            return filterData
        }
        return data
    }

    const copyToClipboard = (email) => {
        Clipboard.setString(email)
        Toast.show({
            text1: 'Hello',
            text2: 'This is some something 👋',
            type: 'success',
        });
        //ToastAndroid.show("Email copied to clipboard", ToastAndroid.SHORT);
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
                console.log('response: ', response.data);
                setData(response.data)
            })
            .catch(function (error) {
                console.log('error: ',error);
            })
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <IconButton icon={'menu'} size={50} style={{marginRight: '75%'}} onPress={() => navigation.openDrawer()} />
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
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
                                    <DataTable.Cell style={{borderColor: '#dcf3f5'}} onPress={() => {copyToClipboard((prof.emails.length > 0)? prof.emails[0].value:'')}}>{(prof.emails.length > 0)? prof.emails[0].value:''}</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                </DataTable>
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
}