import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import React from "react";
import {Icon} from "react-native-elements";


export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                name="Close"
                label=''
                icon={() => <Icon name={'close'}/>}
                onPress={() => props.navigation.closeDrawer()}
            />
        </DrawerContentScrollView>
    );
}
