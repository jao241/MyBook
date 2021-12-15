import React from "react";
import { Text, View, Modal, TextInput, Alert } from "react-native";
import { Header, Button } from "react-native-elements";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Card, CardContent } from "react-native-cards";
import { NovoComentario, HeaderText, ContainerBotao, Espaco } from "../../assets/style/styles";
import Swipeable from "react-native-swipeable-row";
import Toast from "react-native-simple-toast"
import commentsApi from "../../services/commentsApi";
import removeCommentsApi from "../../services/removeCommentsApi";
import addCommentsApi from "../../services/addCommentApi";

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
    
    adicionarComentario = async() =>{
        const { feedId, textoComentario, comentarios } = this.state;
        const comentario = {
                "id": comentarios.length + 1,
                "feed_id": feedId,
                "usuario":"João",
                "datetime": "2019-01-01T12:00-0500",
                "conteudo": textoComentario
            }
        ;
        const response = await addCommentsApi.post("add_comentario", comentario);
        this.carregarComentarios();
        this.setState({
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

    removerComentario = async(comentario_id) =>{
        const response = await removeCommentsApi.delete(`remove_comentario/${comentario_id}`);
        this.carregarComentarios();
        Toast.show("Comentário removido!", Toast.LONG);
    }

    confirmarRemocao = (comentario_id) =>{
        Alert.alert(
            null,
            "Remover o seu comentário?",
            [
                {text: "NÃO", style: "cancel"},
                {text: "SIM", onPress: ()=>{
                    this.removerComentario(comentario_id);
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
                                this.confirmarRemocao(comentario.id);
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

    carregarComentarios = async() =>{
        const { feedId } = this.state;
        const response = await commentsApi.get(`comentarios/${feedId}`);
        this.setState({
            comentarios: [...response.data]
        });
    }

    exibirComentarios = () =>{
        const {comentarios} = this.state;
        const comentariosListReverted = comentarios.reverse();
        return(
            <FlatList
                data={comentariosListReverted}
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