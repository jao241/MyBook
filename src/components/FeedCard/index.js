import React from "react";
import { Card, CardContent, CardImage} from 'react-native-cards';
import { 
    NomeProduto,
    PrecoProduto,
    Likes,
    CentralizarItens, 
    Espaco
} from '../../assets/style/styles'
import Icon from 'react-native-vector-icons/AntDesign';
import produto from '../../assets/images/produto2.jpeg';

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
                <Espaco/>
                <CardImage source={produto}/>
                <CardContent>
                    <NomeProduto>{feed.produto.nome}</NomeProduto>
                </CardContent>
                <CardContent>
                    <PrecoProduto>{`R$ ${feed.produto.preco}`}</PrecoProduto>                    
                </CardContent>
                <CardContent>
                    <CentralizarItens>
                        <Icon name="heart" size={18} color={'#ff0000'}></Icon>
                        <Likes>{feed.like}</Likes>
                    </CentralizarItens>
                </CardContent>
            </Card>
        );
    }
}