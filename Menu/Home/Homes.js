import { Body, Button, Card, CardItem, Content, Icon, Left, Right, Text } from 'native-base';
import React, { Component } from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import Footers from '../Footers';
import axios from 'axios';


export default class Homes extends Component {
    constructor(props){
        super(props);
        this.state = {
            images: [
                "https://images.pexels.com/photos/1161468/pexels-photo-1161468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            dataCategory: [],
            dataRestaurant: []
        }
    }

    static navigationOptions={headerShown: false};

    getDataCategory=()=> {
        axios.get(`https://developers.zomato.com/api/v2.1/categories`,
        {headers:{"user-key":"f881e76912e294c540c04c7e70d9ccd4"}})
        .then((res)=>{
            this.setState({
                dataCategory:res.data.categories
            })
        })
    }

    getDataRestaurant=()=>{
        axios.get(`https://developers.zomato.com/api/v2.1/search?start=6&count=10&lat=-6.320138&lon=106.665596&sort=rating`,
        {headers:{"user-key":"f881e76912e294c540c04c7e70d9ccd4"}})
        .then((res)=>{
            this.setState({
                dataRestaurant:res.data.restaurants
            })
        })
    }

    componentDidMount(){
        this.getDataCategory();
        this.getDataRestaurant();
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#403417"/>
                {
                    //imageslider
                }
                <Content>
                <View style={{height: 150}}>
                    <ImageSlider 
                        images={this.state.images} autoPlayWithInterval={3000}
                    />
                </View>
                {
                    //Category
                }

                <Text style={{margin:10, fontSize: 20, fontWeight: 'bold'}}>Pilihan Kategori</Text>
                <Content horizontal>
                    {this.state.dataCategory.map((data,key)=>{
                        return(
                            <Button rounded key={key} style={{margin: 5}}>
                            <Text>{data.categories.name}</Text>
                            </Button>
                        )
                    })}

                </Content>

                {
                    //Restaurant
                }
                <Text style={{margin:10, fontSize: 20, fontWeight: 'bold'}}>Restaurant Terbaik</Text>
                {this.state.dataRestaurant.map((data,key)=>{

                    var image="";
                    if (data.restaurant.thumb==="") {
                        image="https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg"
                    } else {
                        image= data.restaurant.thumb
                    }

                    return(
                        <TouchableOpacity key={key} 
                            onPress={()=>{this.props.navigation.navigate("Restaurant",
                            {
                                nama_restaurant: data.restaurant.name,
                                res_id: data.restaurant.R.res_id
                            });
                        }}
                        >
                        <Card>
                        <CardItem vertical>
                            <Body>
                                <Text style={{fontWeight: 'bold'}}>{data.restaurant.name}</Text>
                                <Text>{data.restaurant.location.locality_verbose}</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image style={{height: 200, width: null, flex:1}} 
                                source={{
                                uri: image}}
                            />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Icon name="star" style={{color: "#f7ce31"}}/>
                                <Text>{data.restaurant.user_rating.aggregate_rating}</Text>
                            </Left>
                            <Right>
                                <Text style={{color: "#3f7e00"}}>{data.restaurant.user_rating.rating_text}</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{data.restaurant.cuisines}</Text>
                                <Text>{data.restaurant.timings}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    </TouchableOpacity>
                    )
                })}
                
                </Content>
                <Footers/>
            </View>
        );
    }
}