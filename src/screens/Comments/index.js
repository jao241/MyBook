import React from "react";
import { Text, View, Modal, TextInput, Alert } from "react-native";
import { Header, Button } from "react-native-elements";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Card, CardContent } from "react-native-cards";
import { NovoComentario, HeaderText, ContainerBotao, Espaco } from "../../assets/style/styles";
import Swipeable from "react-native-swipeable-row";
import Toast from "react-native-simple-toast"
import commentsApi from "../../service/commentsApi";

export default class Comments extends React.Component{
    constructor(props){
        super(props);

        this.state={
            feedId: this.props.navigation.state.params.feedId,
            visibilidadeModalAdicionarComentario: false,
            comentarios: [],
            textoComentario: ""
        }
    }
    

    componentDidMount = () =>{
        this.carregarComentarios()
        this.exibirComentarios()
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
            comentarios: [...comentario, ...comentarios],
            textoComentario: ""
        }, Toast.show("Comentário adicionado!", Toast.LONG));
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
            transparent={true}
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
                        style={{backgroundColor: "white", borderRadius: 2, padding: 10}}
                    >
                    </TextInput>    
                    <Espaco/>         
                    <ContainerBotao>
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
                    </ContainerBotao>
                    <Espaco/>
                        <ContainerBotao>
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
                        </ContainerBotao>
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

    removerComentario = (comentario) =>{
        const { comentarios } = this.state;
        const comentariosFiltrados = comentarios.filter((item)=>{
            return item._id !== comentario._id;
        });
        this.setState({
            comentarios: comentariosFiltrados
        }, Toast.show("Comentário removido!", Toast.LONG));
    }

    confirmarRemocao = (comentario) =>{
        Alert.alert(
            null,
            "Remover o seu comentário?",
            [
                {text: "NÃO", style: "cancel"},
                {text: "SIM", onPress: ()=>{
                    this.removerComentario(comentario);
                }}
            ]
        )
    }

    estruturarComentario = (comentario) =>{
        return(
            <Swipeable
                rightButtonWidth={50}
                rightButtons={[
                    <View>
                        <Icon name="delete" color="#030303" size={28} onPress={
                            ()=>{
                                this.confirmarRemocao(comentario);
                            }
                        }/>
                    </View>
                    ]
                }
            >
                <Card>
                    <Espaco/>
                    <CardContent>
                        <Text>
                            {comentario.usuario}
                        </Text>
                    </CardContent>
                    <Espaco/>
                    <CardContent>
                        <Text>
                            {comentario.conteudo}
                        </Text>
                    </CardContent>
                    <CardContent>
                        <Text>
                            {comentario.datetime}
                        </Text>
                    </CardContent>
                    <Espaco/>
                </Card> 
            </Swipeable>
        );
    }

    carregarComentarios = () =>{
        const { feedId } = this.state;
        const response = commentsApi.get(`comentarios/${feedId}`);
        this.setState({
            comentarios: [...response.data]
        });
        console.log(this.state.comentarios);
    }

    exibirComentarios = () =>{
        const {comentarios} = this.state;
        return(
            <FlatList
                data={comentarios}
                numColumns={1}
                keyExtractor={(item)=> String(item.id)}
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
        return(
            <View>
                {this.criarCabecalho()}
                {this.exibirComentarios()}
                {visibilidadeModalAdicionarComentario && this.modalComentario()}
            </View>
            );
    }
}