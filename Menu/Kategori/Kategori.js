import { Body, Button, Card, CardItem, Container, Content, Left, Text } from 'native-base';
import React, {Component} from 'react';
import { Image, View } from 'react-native';
import axios from 'axios';
import Footers from '../Footers';

export default class Kategori extends Component {
    static navigationOptions={headerShown: false};

    constructor(props){
        super(props);
        this.state={
            dataCategory: [],
            dataCollections: []
        }
    }
    getDataCategory=()=> {
        axios.get(`https://developers.zomato.com/api/v2.1/categories`,
        {headers:{"user-key":"f881e76912e294c540c04c7e70d9ccd4"}})
        .then((res)=>{
            this.setState({
                dataCategory: res.data.categories
            })
        })
    }
    getDataCollections=()=>{
        axios.get('https://developers.zomato.com/api/v2.1/collections?city_id=74', {
            headers: {user_key:"f881e76912e294c540c04c7e70d9ccd4"}
        }).then(res=>{
            this.setState({
                dataCollections: res.data.collections
            })
        })
    }
    componentDidMount(){
        this.getDataCategory();
        this.getDataCollections();
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <Container style={{flex: 3}}>
                <Content>
                    {this.state.dataCollections.map((data,key)=>{
                        return(
                            <Card key={key}>
                                <CardItem cardBody>
                                    <Image  style={{height:200, width: null, flex:1}}
                                    source={{uri: data.collection.image_url}} />
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>{data.collection.title}</Text>
                                        <Text note>{data.collection.description}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        )
                    })}
                </Content>
                </Container>

                <Container style={{flex: 1}}>
                <Text style={{margin: 10, fontSize: 20, fontWeight: 'bold'}}>Kategori</Text>
                <Content horizontal>
                    {this.state.dataCategory.map((data,key)=>{
                        return(
                            <Button style={{margin: 10}} key={key}>
                                <Text>{data.categories.name}</Text>
                            </Button>
                        )
                    })}
                </Content>
                </Container>
                <Footers/>
            </View>
        )
    }
}