import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

const bg = require('../imgs/bg.png');

class formLogin extends Component {

    _autenticarusuario() {
        const { email, senha } = this.props;
        this.props.autenticarUsuario({ email, senha });

    }

    renderBtnAcessar(){
        if(this.props.loading_login) {
            return(
                <ActivityIndicator size="large" />
            )
        }
        return(
                <Button 
                    title="Acessar" 
                    color='#115E54' 
                    onPress={() => this._autenticarusuario()} 
                />
        )
    }

    render(){
        return(
            <ImageBackground style={{ flex: 1 }} source={bg}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, backgroundColor: 'transparent', color: '#fff' }}>WhatsApp Clone</Text>
                    </View>
                    <View style={{ flex: 2}}>
                        <TextInput 
                            onChangeText={text => this.props.modificaEmail(text) } 
                            value={this.props.email} 
                            style={{ fontSize: 20, height: 45 }} 
                            placeholder='E-mail' 
                            placeholderTextColor='#fff' 
                        />
                        <TextInput 
                            secureTextEntry 
                            onChangeText={text => this.props.modificaSenha(text)} 
                            value={this.props.senha} style={{ fontSize: 20, height: 45 }} 
                            placeholder='Senha' 
                            placeholderTextColor='#fff'
                        />
                        <Text style={{ color: 'red', fontSize: 18 }}>{this.props.erroLogin}</Text>
                        <TouchableOpacity onPress={() => Actions.formCadastro() }>
                            <Text style={{ fontSize: 20, color: '#fff' }}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2}}>
                        {this.renderBtnAcessar()}
                    </View>
                </View>
            </ImageBackground>
        )
    }
};

const mapStateToProps = state => ({
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroLogin: state.AutenticacaoReducer.erroLogin,
    loading_login: state.AutenticacaoReducer.loading_login,
})

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);
