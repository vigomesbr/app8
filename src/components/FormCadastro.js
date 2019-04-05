import React, { Component } from 'react';
import { View, TextInput, Button, ImageBackground, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario, erroCadastro } from '../actions/AutenticacaoActions';

const bg = require('../imgs/bg.png');

class formCadastro extends Component {

    _cadastrausuario(){
        const { nome, email, senha } = this.props;

        this.props.cadastraUsuario({ nome, email, senha });
    }

    render(){
        return (
            <ImageBackground style={{ flex: 1 }} source={bg}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput 
                            onChangeText={text => this.props.modificaNome(text) } 
                            value={this.props.nome} 
                            placeholder="Nome" 
                            style={{ fontSize: 20, height: 45 }} 
                            placeholderTextColor='#fff'/>
                        <TextInput 
                            onChangeText={text => this.props.modificaEmail(text) } 
                            value={this.props.email}
                            style={{ fontSize: 20, height: 45 }} 
                            placeholder='E-mail' 
                            placeholderTextColor='#fff'/>
                        <TextInput 
                            secureTextEntry 
                            onChangeText={text => this.props.modificaSenha(text)} 
                            value={this.props.senha} 
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Senha' 
                            placeholderTextColor='#fff'/>

                            <Text style={{ color: 'red', fontSize: 18 }}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button 
                            title="Cadastrar" 
                            color="#115E54" 
                            onPress={() => this._cadastrausuario()} />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroCadastro: state.AutenticacaoReducer.erroCadastro,
})

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome, cadastraUsuario, erroCadastro })(formCadastro)