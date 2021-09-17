import React, {Component} from 'react';
import { Image, View, StatusBar, TouchableOpacity } from 'react-native';
import { Button, Card, CardItem, Content, Icon, Left, Right, Text, Body } from 'native-base';
import Footers from '../Footers';
import axios from 'axios';


export default class Masakan extends Component {
    static navigationOptions={headerShown: false};

    constructor(props){
        super(props);
        this.state={
            JenisMasakan:[],
            dataRestaurant:[]
        };
    }
    getJenisMasakan = ()=> {
        axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=74`, {
            headers: {"user-key": "f881e76912e294c540c04c7e70d9ccd4"}
        }).then((res)=>{
            this.setState({
                JenisMasakan: res.data.cuisines
            })
        })
    }
    getDataRestaurant=()=>{
        axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&q=jakarta&start=70&count=10&sort=rating`,
        {headers:{"user-key":"f881e76912e294c540c04c7e70d9ccd4"}})
        .then((res)=>{
            this.setState({
                dataRestaurant:res.data.restaurants
            })
        })
    }
    componentDidMount(){
        this.getJenisMasakan();
        this.getDataRestaurant();
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#403417"/>
                <Content>
                <Text style={{margin: 10, fontSize: 20, fontWeight: 'bold'}}>Halaman Masakan</Text>
                <Content horizontal style={{marginTop: 20, marginLeft: 10}}>
                    {this.state.JenisMasakan.map((data,key)=>{
                        return(
                            <View key={key}>
                                <Button style={{margin: 10}}>
                                    <Text>{data.cuisine.cuisine_name}</Text>
                                </Button>
                            </View>
                        );
                    })}
                </Content>
                <Text style={{marginTop: 20, marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>Restaurant</Text>
                <Content horizontal style={{marginTop: 20, marginLeft: 10}}>
                    {this.state.dataRestaurant.map((data,key)=>{
                        var image="";
                        if (data.restaurant.thumb==="") {
                            image="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
                        } else {
                            image=data.restaurant.thumb
                        }
                        return(
                            <TouchableOpacity key={key}
                                onPress={()=>{this.props.navigation.navigate("Restaurant", {
                                    nama_restaurant: data.restaurant.name,
                                    res_id: data.restaurant.R.res_id
                                });
                            }}
                            >
                            <Card style={{width: 300}}>
                                <CardItem>
                                    <Left>
                                        <Text>{data.restaurant.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="home"/>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{height: 200, width: null, flex: 1}}
                                    source={{uri: image}}/>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>Jenis Masakan</Text>
                                        <Text>{data.restaurant.cuisines}</Text>
                                        <Text>{data.restaurant.location.locality_verbose}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            </TouchableOpacity>
                        );
                    })}
                    
                </Content>
                </Content>
                <Footers />
            </View>
        );
    }
}