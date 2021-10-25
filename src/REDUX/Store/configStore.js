import { createStore , combineReducers , applyMiddleware  } from 'redux' 
import thunk from 'redux-thunk'

import userReducers from '../Reducers/userReducers'

const ConfigureStore = (props) => {
    const store = createStore(combineReducers({
        user: userReducers , 
        

    }),applyMiddleware(thunk))
    return store
}

export default ConfigureStore
