import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import React from "react";


export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                name="Close"
                label="Zatvori"
                onPress={() => props.navigation.closeDrawer()}
            />
        </DrawerContentScrollView>
    );
}
