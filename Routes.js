import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './src/components/FormLogin'
import FormCadastro from './src/components/FormCadastro';
import BoasVindas from './src/components/BoasVindas';
import Principal from './src/components/Principal';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#fff'}} headerTintColor='#fff' >
        <Scene key='root'>
            <Scene key='formLogin' component={FormLogin} title="Login" hideNavBar/>
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" />
            <Scene key='boasVindas' component={BoasVindas} title="Cadastro" />
            <Scene key='principal' component={Principal} title="Principal" />
        </Scene>
    </Router>
);
