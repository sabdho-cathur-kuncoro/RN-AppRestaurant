import axios from 'axios';
import { Card, CardItem, Content, Left, Right, Text, Icon, Body, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Footers from './Footers';

var res_id="";
export default class Restaurant extends Component {
    static navigationOptions = ({navigation})=> {
        res_id=navigation.getParam("res_id");
        return{
            title: navigation.getParam("nama_restaurant")
        };
    };

    constructor(props){
        super(props);
        this.state={
            detailRestaurant: [],
            Review: []
        };
    }
    getDetailRestaurant(){
        axios.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`, {
            headers: {"user-key": "f881e76912e294c540c04c7e70d9ccd4"}
        })
        .then(res=>{
            this.setState({
                detailRestaurant: res.data
            })
        })
    }
    getReview(){
        axios.get(`https://developers.zomato.com/api/v2.1/reviews?res_id=${res_id}`, {
            headers: {user_key: "f881e76912e294c540c04c7e70d9ccd4"}
        }).then(res=>{
            this.setState({
                Review: res.data.user_reviews
            })
        })
    }
    componentDidMount(){
        this.getDetailRestaurant();
        this.getReview();
    }

    render(){
        var alamat= {...this.state.detailRestaurant.location};
        var rating= {...this.state.detailRestaurant.user_rating};
        return(
            <View style={{flex:1}}>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image style={{height: 240, width: null, flex:1}}
                            source={{
                                uri: this.state.detailRestaurant.featured_image
                                }} />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Alamat Restaurant: {alamat.address}</Text>
                                <Text>No. Telp: {this.state.detailRestaurant.phone_numbers}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Icon name="star" style={{backgroundColor: "#e1ee17"}}/>
                                <Text>{rating.aggregate_rating}</Text>
                            </Left>
                            <Right>
                                <Icon name="chatbubbles"/>
                                <Text>{this.state.detailRestaurant.all_reviews_count}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>Jenis Masakan: {this.state.detailRestaurant.cuisines}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    {
                        //Reviews
                    }
                    <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>User Reviews</Text>
                    {this.state.Review.map((data,key)=>{
                        return(
                            <Card key={key}>
                                <CardItem>
                                    <Left>
                                        <Icon name="star" style={{color:"#e1ee17" }} />
                                        <Text>{data.review.rating}</Text>
                                        <Text>{data.review.rating_text}</Text>
                                    </Left>
                                    <Right>
                                        <Text>{data.review.review_time_friendly}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: data.review.user.profile_image}} />
                                        <Text>{data.review.user.name}</Text>
                                    </Left>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>{data.review.review_text}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Icon name="heart" style={{marginLeft:10}} />
                                        <Text>{data.review.likes}</Text>
                                        <Icon name="chatbubbles" style={{marginLeft:10}}/>
                                        <Text>{data.review.comments_count}</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        )
                    })}
                </Content>
                <Footers/>
            </View>
        )
    }
}