import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { accountAction } from '../../REDUX/Actions/userAction'
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
            <h1> Admin Info</h1>
                <div className = "box"  >
                        <p> Admin Name : {user.username}</p>
                </div>
                <div className = "box" >
                        <p> Email : {user.email}</p>
                </div>
                <div className = "box" >
                        <p> Business Name :  {user.businessName}</p>
                </div>
                <div className = "box"  >
                        <p> Address : {user.address}</p>
                </div>
        </div>
  
    )
}

export default Account