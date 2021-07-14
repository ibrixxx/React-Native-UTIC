import React, {useState} from 'react';
import {Drawer} from 'react-native-paper';

export default function Sidebar(props) {
    const [active, setActive] = useState('');

    return (
        <Drawer.Section title="Some title" theme={props.theme}>
            <Drawer.Item
                label="First Item"
                active={active === 'first'}
                onPress={() => setActive('first')}
            />
            <Drawer.Item
                label="Second Item"
                active={active === 'second'}
                onPress={() => setActive('second')}
            />
        </Drawer.Section>
    );
}