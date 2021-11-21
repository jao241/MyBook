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
        console.log(feed.produto.nome)
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


 /*
       constructor(props){
        super(props);
        this.state = {
            proximaPagina: 0,
            feeds: [],
            carregando:false
        };
    }

    carregarFeeds = () =>{
        const { proximaPagina, feeds } = this.state;

        this.setState({
            carregando: true
        });

        const idInicial = proximaPagina * FEEDS_POR_PAGINA + 1;
        const idFinal = idInicial + FEEDS_POR_PAGINA -1;
        
        const content = feedsEstaticos.feeds.filter((feed)=> feed._id >= idInicial && feed._id <= idFinal);
        if(content.length){
            console.log(`Adicionando ${content.length} feeds.`);
            
            this.setState({
                proximaPagina: proximaPagina + 1,
                feeds: [...feeds, ...content],
                carregando: false
            });
        }else{
            this.setState({
                carregando: false
            });
        }
    }

    componentDidMount = () =>{
        this.carregarMaisFeeds();
    }

    carregarMaisFeeds = () =>{
        const { carregando } = this.state;

        if(carregando){
            return;
        }

        this.carregarFeeds();
    }

    mostrarFeed = (feed) =>{
        console.log("Cheguei no mostrarFeed");
        return(
            <TouchableOpacity>
                <Card>
                    <CardImage source={produto}/>
                    <CardContent>
                        <Avatar source={avatar}/>
                        <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                    </CardContent>
                    <CardContent>
                        <NomeProduto>{feed.product.name}</NomeProduto>
                    </CardContent>
                    <CardContent>
                        <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    </CardContent>
                    <CardContent>
                        <PrecoProduto>{`R$ ${feed.product.price}`}</PrecoProduto>
                        <Icon name="heart" size={18}>
                            <Likes>{feed.likes}</Likes>
                        </Icon>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    }

    mostrarFeeds = (feeds) =>{
        console.log("Cheguei no mostarFeeds");
        <FlatList
            data={feeds}
            numColumns={2}
            onEndReached={()=> this.carregarMaisFeeds()}
            onEndReachedThreshold={0.1}
            keyExtractor={(item)=> String(item._id)}
            renderItem={({item})=>{
                return(
                    <View style={{width: '50%'}}>
                        {this.mostrarFeed(item.item)}
                    </View>
                );
            }}
        >

        </FlatList>
    }

    render = () =>{
        const { feeds } = this.state;

        if(feeds.length){
            console.log(`Exibindo ${feeds.length} feeds.`);
            return(
                this.mostrarFeeds(feeds)
            );
        }else{
            return(
                <View></View>
            );
        }
    }
 */
}