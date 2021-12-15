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
import descriptionApi from "../../service/descriptionApi";
import addLikeApi from "../../service/addLikeApi";


export default class Details extends React.Component{

    constructor(props){
        super(props);

        this.state={
            feedId: this.props.navigation.state.params.feedId,
            feed: {},
            like: false
        }
    }
    
    componentDidMount = () =>{
        this.getFeed();
    }

    getFeed = async() =>{
        const id = this.state.feedId;
        const response = await descriptionApi.get(`description_feed/${id}`);
        this.setState({
            feed: response.data
        });
    }

    adicionarLike = async() =>{
        const { feed } = this.state;
        const dataJson = JSON.stringify(feed.id);
        const response = await addLikeApi.get('add_like',
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            data: dataJson
        });
        console.log(response.data)
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
                        <NomeProduto>{feed.nome}</NomeProduto>
                        <NomeEmpresa>{feed.fabricante}</NomeEmpresa>
                        <Espaco/>
                        <DescricaoProduto>{feed.descricao}</DescricaoProduto>
                        <Espaco/>
                        <PrecoProduto>R$ {feed.preco}</PrecoProduto>
                        <Espaco/>
                        <CentralizarItens>
                            <Icon name="heart" size={18} color={'#ff0000'}>
                                <Likes>{feed.likes}</Likes>
                            </Icon>  
                            <EspacoHorizontal/>
                            <Icon name="message1" size={18} onPress={
                                    ()=>{
                                        this.props.navigation.navigate("Comments", 
                                        {feedId: this.state.feedId
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
