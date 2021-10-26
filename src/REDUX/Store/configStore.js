import { createStore , combineReducers , applyMiddleware  } from 'redux' 
import thunk from 'redux-thunk'

import userReducers from '../Reducers/userReducers'
import customersReducers from '../Reducers/customersReducers'

const ConfigureStore = (props) => {
    const store = createStore(combineReducers({
        user: userReducers , 
        customers: customersReducers,

    }),applyMiddleware(thunk))
    return store
}

export default ConfigureStore
