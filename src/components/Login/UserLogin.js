import React , {useState} from 'react'
import validator from 'validator'
import { Button , TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'

const UserLogin = ({formSubmission }) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errorObj,setErrorObj]=useState({})

    let errors={}
    
    const handleChange=(e)=>{
        const attr=e.target.name
        if(attr==="email"){
            setEmail(e.target.value)
        }
        else if(attr==="password"){
            setPassword(e.target.value)
        }
    }

    //validation
    const runValidator=()=>{
        if(email.length===0){
            errors.email="Email can't be blank"
        }
        else if(!validator.isEmail(email)){
            errors.email="Email is not valid"
        }
        if(password.length===0){
            errors.password="Password can't be blank"
        }   
    }

    const submitHandle=(e)=>{
         e.preventDefault()
         runValidator()  
         if(Object.keys(errors).length===0){
            setErrorObj({})
            const formData={
                email:email.toLowerCase(),
                password:password
            }
            formSubmission(formData)
         }
         else {
            setErrorObj(errors)
         }
    }

    return (
        <div>
            <form onSubmit={submitHandle}>
                    <TextField label="Email" 
                           color="primary" 
                           type="email" 
                           name="email" 
                           value={email} 
                           onChange={handleChange} 
                           placeholder="Enter Email"/>
                           <br/>
                <span>{errorObj.email && <span style={{color:'red'}}>{errorObj.email}</span>}</span>
                <br/>
                    <TextField label="Password" 
                           color="primary"
                           type="password" 
                           name="password" 
                           value={password} 
                           onChange={handleChange} 
                           placeholder="Enter Password" /><br/>
                <span>{errorObj.password && <span style={{color:'red'}}>{errorObj.password}</span>}</span>
                <br/>
                <Button type="submit" variant="contained" color="secondary">
                    Login
                </Button>
                <br/><br/>
                <p>You don't have Account...?</p> <br/>
                <Button variant="contained" color="primary">
                    <Link style={{color:'white',textDecoration:'none'}}to="/register">Register</Link> 
                </Button>
            </form>
        </div>
    )
}

export default UserLogin
