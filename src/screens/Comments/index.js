import React from "react";
import { Text, View, Modal, TextInput } from "react-native";
import { Header, Button } from "react-native-elements";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ComentariosEstaticos from "../../assets/dicionarios/comentarios.json";
import { Card, CardContent } from "react-native-cards";
import { CaixaAdicionarComentario, HeaderText } from "../../assets/style/styles";

export default class Comments extends React.Component{
    constructor(props){
        super(props);

        this.state={
            feed: this.props.navigation.state.params.feed,
            feedId: this.props.navigation.state.params.feedId,
            visibilidadeModalAdicionarComentario: false
        }
    }
    

    componentDidMount = () =>{
        this.carregarComentarios()
    }

    mudarVisibilidade = () =>{
        const { visibilidadeModalAdicionarComentario } = this.state;
        this.setState({
            visibilidadeModalAdicionarComentario: !visibilidadeModalAdicionarComentario
        });
    }
    modalComentario = () =>{
        return(
                    <Modal
                    animationType="fade"
                    transparent={true}
                >          
                    <TextInput
                        multiline
                        editable
                        placeholder={"Digite um comentário!"}
                        maxLength={100}
                    >
                    </TextInput>             
                    <Button
                            icon={
                                <Icon size={22} name="check" color="#fff"/>
                            }
                            title="Comentar"
                            type="outline"
                            onPress={
                                ()=>{
                                    //
                                }
                            }
                        />
                        <Button
                            icon={
                                <Icon size={22} name="closecircle" color="#fff"/>
                            }
                            title="Fechar"
                            type="outline"
                            onPress={
                                ()=>{
                                    this.mudarVisibilidade();
                                }
                            }
                        />
                </Modal>    
        );
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
                centerComponent={
                    <HeaderText>
                        <Text>MyBook</Text>
                    </HeaderText>
                }
                rightComponent={<Icon color={'white'} size={28} name="pluscircleo" onPress={
                    ()=>{
                        this.mudarVisibilidade();
                    }
                }></Icon>}
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
        const { visibilidadeModalAdicionarComentario } = this.state;
        console.log(visibilidadeModalAdicionarComentario)
        return(
            <View>
                {this.criarCabecalho()}
                {this.exibirComentarios()}
                {visibilidadeModalAdicionarComentario && this.modalComentario()}
            </View>
            );
    }
}