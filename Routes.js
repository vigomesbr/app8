import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';

import FormLogin from './src/components/FormLogin'
import FormCadastro from './src/components/FormCadastro';
import BoasVindas from './src/components/BoasVindas';
import Principal from './src/components/Principal';
import AdicionarContato from './src/components/AdicionarContato';



export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#fff'}} headerTintColor='#fff' >
        <Scene key='root'>
            <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar/>
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" />
            <Scene key='boasVindas' component={BoasVindas} title="Cadastro" />
            <Scene key='principal' component={Principal} title="Principal" hideNavBar/>
            <Scene key='adicionarContato' component={AdicionarContato} title="Adicionar Contato" />
        </Scene>
    </Router>
);
