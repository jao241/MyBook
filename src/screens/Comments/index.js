import React from "react";
import { Text, View } from "react-native";
import { Header } from "react-native-elements";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ComentariosEstaticos from "../../assets/dicionarios/comentarios.json";
import { Card, CardContent } from "react-native-cards";

export default class Comments extends React.Component{
    constructor(props){
        super(props);

        this.state={
            feed: this.props.navigation.state.params.feed,
            feedId: this.props.navigation.state.params.feedId,
        }
    }
    

    componentDidMount = () =>{
        this.carregarComentarios()
    }

    criarCabecalho = () =>{
        return(
            <Header
                leftComponent={
                    <Icon color={'white'} size={28} name="left" onPress={
                        ()=>{
                            this.props.navigation.goBack();
                        }
                    }></Icon>
                }
                centerComponent={<Text>MyBook</Text>
                }
                rightComponent={<></>}
                backgroundColor={'rgba(125, 49, 201, 0.9)'}
            ></Header>
        );
    }

    estruturarComentario = (comentario) =>{
        return(
            <Card>
                <CardContent>
                    <Text>
                        {comentario.user.name}
                    </Text>
                </CardContent>
                <CardContent>
                    <Text>
                        {comentario.content}
                    </Text>
                </CardContent>
            </Card>
        );
    }

    carregarComentarios = () =>{
        const { feed } = this.state;
        const todosComentarios = ComentariosEstaticos.comentarios;
        const comentarios = todosComentarios.filter((itens)=>{
            return itens.feed == feed._id;
        });
        return comentarios;
    }

    exibirComentarios = () =>{
        const comentarios = this.carregarComentarios();
        this.criarCabecalho();
        return(
            <FlatList
                data={comentarios}
                numColumns={1}
                keyExtractor={(item)=> String(item._id)}
                renderItem={({item})=>{
                    return(
                        <View>
                            {this.estruturarComentario(item)}
                        </View>
                    );
                }}
            ></FlatList>
        );
    }  

    render = () =>{
        return(
            <View>
                {this.criarCabecalho()}
                {this.exibirComentarios()}
            </View>
            );
    }
}