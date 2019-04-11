import { 
    LISTA_CONVERSAS_ATIVAS
    } from '../actions/types';
        
    
    const INITIAL_STATE = {}
    
    export default (state = INITIAL_STATE, action) => {
        switch (action.type){
        
            case LISTA_CONVERSAS_ATIVAS:
                return action.payload
            default:
                return state;
        }
    }