import { Container, ScrollableTab, Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import Footers from '../Footers';
import RestaurantKota from './RestaurantKota';

export default class Kota extends Component {
    static navigationOptions={headerShown: false};
    render(){
        return(
            <Container>
                <Tabs renderTabBar={()=> <ScrollableTab/>} >
                    <Tab heading="Jakarta">
                        <RestaurantKota nama="Jakarta" id_kota="74"/>
                    </Tab>
                    <Tab heading="Bandung">
                        <RestaurantKota nama="Bandung" id_kota="11052"/>
                    </Tab>
                    <Tab heading="Bali">
                        <RestaurantKota nama="Bali" id_kota="170"/>
                    </Tab>
                </Tabs>
                <Footers />
            </Container>
        )
    }
}