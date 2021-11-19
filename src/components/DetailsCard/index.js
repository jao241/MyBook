import React from "react";
import { DescricaoProduto, Likes, NomeEmpresa, NomeProduto, PrecoProduto } from "../../assets/style/styles";
import produto from '../../assets/images/produto.jpeg';
import { Card, CardImage, CardContent } from "react-native-cards";
import Icon from "react-native-vector-icons/AntDesign";

export default class DetailsCard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            feed: this.props.feed
        }
    }

    render = () =>{
        const { feed } = this.state;
        return(
            <Card>
                    <CardContent>
                        <CardImage source={produto}/>
                    </CardContent>
                    <CardContent>
                        <NomeProduto>{feed.product.name}</NomeProduto>
                        <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                        <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                        <PrecoProduto>R$ {feed.product.price}</PrecoProduto>
                        <Icon name="heart" size={18} color={'#ff0000'}>
                            <Likes>{feed.likes}</Likes>
                        </Icon>
                    </CardContent>
                    <CardContent>          
                    </CardContent>
                </Card>
        );
    }
}