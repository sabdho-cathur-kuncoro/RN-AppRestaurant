import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Body, Card, CardItem, Content, Text } from 'native-base';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

class RestaurantKota extends Component {

    constructor(props){
        super(props);
        this.state={
            dataRestaurant: [],
            id_kota: this.props.id_kota
        }
    }
    getDataRestaurant(){
        axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.id_kota}&entity_type=city`,{
            headers:{user_key: "f881e76912e294c540c04c7e70d9ccd4"}
        }).then(res=>{
            this.setState({
                dataRestaurant: res.data.restaurants
            })
        })
    }
    componentDidMount(){
        this.getDataRestaurant();
    }

    render(){
        return(
            <Content>
                {this.state.dataRestaurant.map((data,key)=>{
                    return(
                        <View key={key}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Restaurant", {
                            nama_restaurant: data.restaurant.name,
                            res_id: data.restaurant.R.res_id
                        });
                        }}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>{data.restaurant.name}</Text>
                                    <Text note>{this.props.nama}</Text>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                <Image style={{height:250,width:null,flex:1}}
                                    source={{uri: data.restaurant.thumb}}
                                />
                            </CardItem>
                        </Card>
                        </TouchableOpacity>
                        </View>
                    )
                })}
            </Content>
        )
    }
}

export default withNavigation(RestaurantKota);