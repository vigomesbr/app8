import React, { Component } from 'react';
import { View , Text, ListView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { contatosUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';


class Contatos extends Component {

    constructor (props){
        super(props)
    }

    componentWillMount(){
        this.props.contatosUsuarioFetch();
        this.criaFonteDeDados( this.props.contatos )
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.contatos )
    }

    criaFonteDeDados(contatos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        
        this.fonteDeDados = ds.cloneWithRows(contatos) 
    }

    renderRow(contato){
        return(
            <TouchableOpacity
                onPress={ ()=> Actions.conversa({ title: contato.nome, contatoNome: contato.nome, contatoEmail: contato.email }) }>
                <View style={{ flex: 1, padding:20, borderBottomWidth: 1, borderColor: '#CCC' }}>
                    <Text style={{ fontSize: 25 }}>{contato.nome}</Text>
                    <Text style={{ fontSize: 18 }}>{contato.email}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={this.renderRow}
            />
        );
    }
}

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return {...val, uid }
    })
    return { contatos }
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);
