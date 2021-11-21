import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import { CardImage, CardContent } from "react-native-cards";
import produto from '../../assets/images/produto2.jpeg';
import { 
    Caixa,
    HeaderText, 
    DescricaoProduto, 
    Espaco, 
    Imagen, 
    Likes, 
    NomeEmpresa, 
    NomeProduto, 
    PrecoProduto, 
    CentralizarItens,
    EspacoHorizontal
} from "../../assets/style/styles";
import Toast from "react-native-simple-toast";


export default class Details extends React.Component{

    constructor(props){
        super(props);

        this.state={
            feedId: this.props.navigation.state.params.feedId,
            feed: this.props.navigation.state.params.feed,
            like: false
        }
    }
    
    componentDidMount = () =>{
        //this.carregarFeed();
    }
    adicionarLike = () =>{
        const { feed } = this.state;
        feed.like++;
        this.setState({
            feed: feed,
            like: true
        },
        ()=>{
            Toast.show("Obrigada pela avaliação!", Toast.LONG);
        });
    }

    removerLike = () =>{
        const { feed } = this.state;
        feed.like--;
        this.setState({
            feed: feed,
            like: false
        },
        ()=>{
            Toast.show("Like removido!", Toast.LONG);
        });
    }

    render = () =>{
        const { feed, like } = this.state;
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
                    rightComponent={
                        <>
                        {like && <Icon size={30} name="heart" color="#ff0000" onPress={
                            ()=>{
                                this.removerLike();
                            }
                        }/>}
                        {!like && <Icon size={30} name="hearto" color="#ff0000" onPress={
                            ()=>{
                                this.adicionarLike();
                            }
                        }/>}
                        </>
                    }
                    backgroundColor={'rgba(125, 49, 201, 0.9)'}
                ></Header>
                <Caixa>
                    <Espaco/>
                    <CardContent>
                        <Imagen>
                            <CardImage source={produto}/>
                        </Imagen>
                        <NomeProduto>{feed.produto.nome}</NomeProduto>
                        <NomeEmpresa>{feed.produto.fabricante}</NomeEmpresa>
                        <Espaco/>
                        <DescricaoProduto>{feed.produto.descricao}</DescricaoProduto>
                        <Espaco/>
                        <PrecoProduto>R$ {feed.produto.preco}</PrecoProduto>
                        <Espaco/>
                        <CentralizarItens>
                            <Icon name="heart" size={18} color={'#ff0000'}>
                                <Likes>{feed.like}</Likes>
                            </Icon>  
                            <EspacoHorizontal/>
                            <Icon name="message1" size={18} onPress={
                                    ()=>{
                                        this.props.navigation.navigate("Comments", 
                                        {feedId: this.state.feedId,
                                        feed: this.state.feed
                                        });
                                    }
                                }>
                            </Icon>     
                        </CentralizarItens>                                             
                    </CardContent>                    
                </Caixa>
            </>
        );
    }
}
