import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { accountAction } from '../../REDUX/Actions/userAction'

const Account = (props) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        dispatch(accountAction())
    }, [])
    return (
        <div>
            <h3 > Admin Info</h3>
            <div >
                <p> Admin Name - {user.username}</p>
                <p> Email -  {user.email}</p>
                <p> Business Name - {user.businessName}</p>
                <p> Address - {user.address}</p>
            </div>
        </div>
    )
}

export default Account