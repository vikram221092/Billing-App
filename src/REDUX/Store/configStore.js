import { createStore , combineReducers , applyMiddleware  } from 'redux' 
import thunk from 'redux-thunk'

import userReducers from '../Reducers/userReducers'
import customersReducers from '../Reducers/customersReducers'
import productsReducers from '../Reducers/productsReducers'
import billsReducers from '../Reducers/billsReducers'

const ConfigureStore = (props) => {
    const store = createStore(combineReducers({
        user: userReducers , 
        customers: customersReducers ,
        products: productsReducers ,
        bills: billsReducers

    }),applyMiddleware(thunk))
    return store
}

export default ConfigureStore
