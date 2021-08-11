import React from 'react';
import {StyleSheet, View} from "react-native";
import {Header} from "react-native-elements";
import {Menu, Provider} from "react-native-paper";


export default function MyHeader({ myTitle, navigation }){
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return(
        <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', size: 30, onPress: () => navigation.openDrawer()}}
                centerComponent={{ text: myTitle, style: style.headerText}}
                rightComponent={{ icon: 'more', color: "#fff", size: 30, onPress: () => {} }}
                backgroundColor='#263238'
            />

            <Provider>
                <View
                    style={{
                        paddingTop: 50,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}>
                        <Menu.Item onPress={() => {}} title="Item 1" />
                        <Menu.Item onPress={() => {}} title="Item 2" />
                    </Menu>
                </View>
            </Provider>
        </View>
    );
}

const style = StyleSheet.create({
    headerText: {
        fontSize: 22,
        color: 'white',
    }
})
