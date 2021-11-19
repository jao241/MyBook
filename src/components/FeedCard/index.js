import React from "react";
import { Card, CardContent, CardImage} from 'react-native-cards';
import { Avatar, NomeEmpresa, NomeProduto, DescricaoProduto, PrecoProduto, Likes, CentralizarItens } from '../../assets/style/styles'
import Icon from 'react-native-vector-icons/AntDesign';
import avatar from '../../assets/images/avatar.jpeg';
import produto from '../../assets/images/produto.jpeg';

export default class FeedCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            feed: this.props.feed
        }
    }

    render = () =>{
        const { feed }  = this.state;
        return(
            <Card>
                <CardImage source={produto}/>
                <CardContent>
                    <Avatar source={avatar}/>
                    <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                    <NomeProduto>{feed.product.name}</NomeProduto>
                </CardContent>
                <CardContent>
                    <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                </CardContent>
                <CardContent>
                    <PrecoProduto>{`R$ ${feed.product.price}`}</PrecoProduto>                    
                </CardContent>
                <CardContent>
                    <CentralizarItens>
                        <Icon name="heart" size={18} color={'#ff0000'}></Icon>
                        <Likes>{feed.likes}</Likes>
                    </CentralizarItens>
                </CardContent>
        </Card>
        );
    }
}