import React from "react";

import { Header } from "react-native-elements";
import { Text, FlatList, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import feedsEstaticos from '../../assets/dicionarios/feed.json';
import FeedCard from "../../components/FeedCard";
import { 
    EntradaNomeProduto,
    CentralizarItens,
    HeaderText,
    CaixaLupa
} from "../../assets/style/styles"
import Icon from 'react-native-vector-icons/AntDesign';

const FEEDS_POR_PAGINA = 2;

export default class Feeds extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state={
            nomeProduto:null,
            feed: []
        }
    }

    estruturarFeed = (feed) =>{
        return(
            <TouchableOpacity onPress={
                ()=>{
                    this.props.navigation.navigate("Details", {feedId: feed._id, feed: feed})
                }
            }>
                <FeedCard feed={feed}/>
            </TouchableOpacity>
        );
    }


    atualizarNome = (nome) =>{
        this.setState({
            nomeProduto: nome
        });
    }

    mostrarBarraPesquisa = () =>{
        return(
            <CentralizarItens>
                <HeaderText>
                    <Text>MyBook</Text>
                </HeaderText>
                <EntradaNomeProduto
                onChangeText={(nome) =>{
                    this.atualizarNome(nome);
                }}></EntradaNomeProduto>
                <CaixaLupa>
                <Icon size={20} name="search1" color={'white'}></Icon>
                </CaixaLupa>
            </CentralizarItens>
        );
    }

    filtrarItens = () =>{
        const { feed, nomeProduto } = this.state;
        if(nomeProduto){
            const feedFiltrado = feedsEstaticos.feeds.filter(
                (item)=>{
                    return item.produto.nome.toLowerCase().includes(nomeProduto.toLowerCase());
            });
            return feedFiltrado;
        }else{
            return feed;
        }
    }

    exibirItens = () =>{
            const feed = this.filtrarItens();
        return(
            <View>
                <Header
                    leftComponent={
                        <></>
                    }
                    centerComponent={this.mostrarBarraPesquisa()}
                    rightComponent={<></>}
                    backgroundColor={'rgba(125, 49, 201, 0.9)'}
                >

                </Header>
                <FlatList
                data={feed}
                numColumns={1}
                keyExtractor={(item)=> String(item._id)}
                renderItem={({item})=>{
                    return(
                        <View style={{width: '100%'}}>
                            {this.estruturarFeed(item)}
                        </View>
                    )
            }}/>
            </View>
        );
    }

    buscarItems = () =>{
        const feeds = feedsEstaticos.feeds;
        this.setState({
            feed: [...feeds]
        });
    }

    componentDidMount = () =>{
        this.buscarItems();
    }

    render = () =>{    
        return(
            this.exibirItens()
        );  
    }
}