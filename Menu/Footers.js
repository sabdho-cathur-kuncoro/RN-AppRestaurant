import React, { Component } from "react";
import { Button, Footer, FooterTab, Icon, Text } from "native-base";
import { withNavigation } from 'react-navigation';

class Footers extends Component {
    render(){
        return(
            <Footer>
                <FooterTab>
                    <Button vertical onPress={()=>{this.props.navigation.navigate("Homes")}}>
                        <Icon name="home"/>
                        <Text>Home</Text> 
                    </Button>
                    <Button vertical onPress={()=>{this.props.navigation.navigate("Masakan")}}>
                        <Icon name="pizza"/>
                        <Text>Masakan</Text>
                    </Button>
                    <Button vertical onPress={()=>{this.props.navigation.navigate("Kota")}}>
                        <Icon name="list"/>
                        <Text>Kota</Text>
                    </Button>
                    <Button vertical onPress={()=>{this.props.navigation.navigate("Kategori")}}>
                        <Icon name="grid"/>
                        <Text>Kategori</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default withNavigation(Footers);