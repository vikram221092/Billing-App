import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { accountAction } from '../../REDUX/Actions/userAction'
import { Paper } from '@material-ui/core'
import './Account.css'

const Account = (props) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        dispatch(accountAction())
    }, [])

    return (
      
        <div className = "account"  >
            <Paper style={{textAlign:'center' , backgroundColor:"black" , color:"white" }}>
                                 <h1>Admin Info</h1>  
                </Paper>
                <div className = "box"  >
                        <p className = "p" > Admin Name : {user.username}</p>
                </div>
                <div className = "box" >
                        <p className = "p" > Email : {user.email}</p>
                </div>
                <div className = "box" >
                        <p className = "p" > Business Name :  {user.businessName}</p>
                </div>
                <div className = "box"  >
                        <p className = "p" > Address : {user.address}</p>
                </div>
        </div>
  
    )
}

export default Account