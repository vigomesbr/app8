import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import _ from 'lodash';

import { 
MODIFICA_ADICIONA_CONTATO_EMAIL
,ADICIONA_CONTATO_ERRO
,ADICIONA_CONTATO_SUCESSO
,LISTA_CONTATO_USUARIO
,MODIFICA_MENSAGEM
,LISTA_CONVERSA_USUARIO
,MENSAGEM_ENVIADA
} from './types';

export const modificaAdicionaContatoEmail = text => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: text
    }
}

export const adicionaContato = email => {
    
    return dispatch => {
        let emailB64 = b64.encode(email);
    
        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()) {
                    //email do contato que queremos adicionar
                    const dadosUsuario = _.first(_.values(snapshot.val()));
                    console.log(dadosUsuario);
                    
                    //email do usuário autenticado
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);

                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email, nome: dadosUsuario.nome })
                        .then(() => adicionaContatoSucesso(dispatch))
                        .catch(erro => adicionaContatoErro(erro.message, dispatch))

                } else {
                    dispatch(
                        { 
                            type: ADICIONA_CONTATO_ERRO, 
                            payload: 'E-mail informado não corresponde a um usuário válido!'
                        }
                    )
                }
            })
    }
}

const adicionaContatoErro = (erro, dispatch) => (
    dispatch (
        {
            type: ADICIONA_CONTATO_ERRO, 
            payload: erro
        }
    )
)

const adicionaContatoSucesso = dispatch => (
    dispatch (
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true
        }
    )
)

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = text => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: text
    })
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {

    const { currentUser } = firebase.auth();

    return dispatch => {

        let emailUsuarioB64 = b64.encode(currentUser.email);
        let emailContatoB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
            .push({ mensagem, tipo: 'e'})
            .then(() => {

                firebase.database().ref(`/mensagens/${emailContatoB64}/${emailUsuarioB64}`)
                    .push({ mensagem, tipo: 'r'})
                    .then(() => dispatch({ type: MENSAGEM_ENVIADA }))
            })
            .then(()=> {
                firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}/${emailContatoB64}`)
                    .set({ nome: contatoNome, email: contatoEmail })
            })
            .then(()=> {

                firebase.database().ref(`/contatos/${emailUsuarioB64}`)
                    .once("value")
                    .then(snapshot => {

                        const dadosUsuario = _.first(_.values(snapshot.val()))

                        firebase.database().ref(`/usuario_conversas/${emailContatoB64}/${emailUsuarioB64}`)
                        .set({ nome: dadosUsuario.nome, email: contatoEmail })
                    })

                
            })

    }
    
}

export const conversaUsuarioFetch = contatoEmail => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let emailUsuarioB64 = b64.encode(currentUser.email);
        let emailContatoB64 = b64.encode(contatoEmail)

        firebase.database().ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })
    }
}