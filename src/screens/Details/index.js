import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import DetailsCard from "../../components/DetailsCard";
import { Header } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import { HeaderText } from "../../assets/style/styles";

export default class Details extends React.Component{

    constructor(props){
        super(props);

        this.state={
            feedId: this.props.navigation.state.params.feedId,
            feed: this.props.navigation.state.params.feed
        }
    }
/*
    carregarFeed = () =>{
        const { feedId } = this.state;
        const feeds = feedsEstaticos.feeds;
        const feed = feeds.filter((item)=>{
            return item._id === feedId;
        });
        this.setState({
            feed: feed[0] 
        });
    }
*/
    componentDidMount = () =>{
        //this.carregarFeed();
    }

    render = () =>{
        const { feed } = this.state;
        return(
            <>
               <Header
                    leftComponent={
                        <Icon color={'white'} size={28} name="left" onPress={
                            ()=>{
                                this.props.navigation.goBack();
                            }
                        }></Icon>
                    }
                    centerComponent={
                        <HeaderText>
                            <Text>MyBook</Text>
                        </HeaderText>
                    }
                    rightComponent={<></>}
                    backgroundColor={'rgba(125, 49, 201, 0.9)'}
                ></Header>
                <DetailsCard feed={feed}/>
                <Card>
                <Icon name="message1" size={18} onPress={
                            ()=>{
                                this.props.navigation.navigate("Comments", 
                                {feedId: this.state.feedId,
                                feed: this.state.feed
                                });
                            }
                        }></Icon>
                </Card>
            </>
        );
    }
}
