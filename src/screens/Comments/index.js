import React from "react";
import { Text, View, Modal, TextInput } from "react-native";
import { Header, Button } from "react-native-elements";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import ComentariosEstaticos from "../../assets/dicionarios/comentarios.json";
import { Card, CardContent } from "react-native-cards";
import { NovoComentario, HeaderText } from "../../assets/style/styles";

export default class Comments extends React.Component{
    constructor(props){
        super(props);

        this.state={
            feed: this.props.navigation.state.params.feed,
            feedId: this.props.navigation.state.params.feedId,
            visibilidadeModalAdicionarComentario: false,
            comentarios: [],
            textoComentario: ""
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
    adicionarComentario = () =>{
        const { feedId, textoComentario, comentarios } = this.state;
        const comentario = [
            {
                "user":{
                    "name": "Joao"
                },
                "id": comentarios.length + 1,
                "feed": feedId,
                "datetime": "2019-01-01T12:00-0500",
                "content": textoComentario
            }
        ];
        this.setState({
            comentarios: [...comentario, ...comentarios]
        });
        this.mudarVisibilidade();
    }

    atualizarComentario = (texto) =>{
        this.setState({
            textoComentario: texto
        });
    }

    modalComentario = () =>{
        return(
            <Modal
            animationType="fade"
            transparent={false}
            >          
                <NovoComentario>
                    <TextInput
                        multiline
                        editable
                        placeholder={"Digite um comentário!"}
                        maxLength={100}
                        onChangeText={
                            (texto)=>{
                                this.atualizarComentario(texto);
                            }
                        }
                    >
                    </TextInput>             
                    <Button
                            icon={
                                <Icon size={22} name="check" color="#fff"/>
                            }
                            title="Comentar"
                            type="solid"
                            onPress={
                                ()=>{
                                    this.adicionarComentario();
                                }
                            }
                        />
                        <Button
                            icon={
                                <Icon size={22} name="closecircle" color="#fff"/>
                            }
                            title=" Fechar"
                            type="solid"
                            onPress={
                                ()=>{
                                    this.mudarVisibilidade();
                                }
                            }
                        />
                </NovoComentario>
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
        const { feed, comentarios } = this.state;
        const todosComentarios = ComentariosEstaticos.comentarios;
        const comentariosSelecionados = todosComentarios.filter((itens)=>{
            return itens.feed == feed._id;
        });
        this.setState({
            comentarios: [ ...comentariosSelecionados ]
        });
    }

    exibirComentarios = () =>{
        const {comentarios} = this.state;
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