import React, { useEffect , useState } from 'react'
import validator from 'validator'
import { Button , TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'

const UserInfo = ({formSubmission,handleIsSaved,isSaved}) => {

    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [businessName,setBusinessName]=useState('')
    const [address,setAddress]=useState('')
    const [errorObj,setErrorObj]=useState({})

    let errors={}

    useEffect(()=>{
       if(isSaved){
          setUsername('')
          setEmail('')
          setPassword('')
          setBusinessName('')
          setAddress('') 
          handleIsSaved()
       }
    },[isSaved,handleIsSaved])

    const handleChange=(e)=>{
        const attr=e.target.name
        if(attr==="username"){
            setUsername(e.target.value)
        }
        else if(attr==="email"){
            setEmail(e.target.value)
        }
        else if(attr==="password"){
            setPassword(e.target.value)
        }
        else if(attr==="businessName"){
            setBusinessName(e.target.value)
        }
        else if(attr==="address"){
            setAddress(e.target.value)
        }
    }

    //Validation

    const runValidator=()=>{
        if(username.length===0){
            errors.username="username can't be blank"
        }
        else if(username.length<3){
           errors.username="username is to short"
        }
        if(email.length===0){
            errors.email="email can't be blank"
        }
        else if(!validator.isEmail(email)){
           errors.email="Email is not valid"
        }

        if(password.length===0){
            errors.password="Password can't be blank"
        }
        
        if(businessName.length===0){
            errors.businessName="Business name can't be blank"
        }
        if(address.length===0){
            errors.address="Address can't be blank"
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        runValidator()
         if(Object.keys(errors).length===0){          
              setErrorObj({})
              const formData={
                   username:username,
                   email:email.toLowerCase(),
                   password:password,
                   businessName:businessName,
                   address:address
               }
           formSubmission(formData) 
         }
         else{
           setErrorObj(errors)
         }
    }

    return (
        <div>
                <form onSubmit={handleSubmit}>
                    <TextField type="text" 
                           label="Name" 
                           color="primary" 
                           name="username" 
                           value={username}  
                           onChange={handleChange} 
                           placeholder="Enter Your name"/><br/>
                <span>{errorObj.username && <span style={{color:'red'}}>{errorObj.username}</span>}</span>
                <br/>

                    <TextField type="email" 
                           label="Email" 
                           color="primary"  
                           name="email" 
                           value={email} 
                           onChange={handleChange} 
                           placeholder="Enter Email"/><br/>
                <span>{errorObj.email && <span style={{color:'red'}}>{errorObj.email}</span>}</span>
               
                <br/>
                <TextField type="password" 
                           label="Password" 
                           color="primary"
                           name="password" 
                           value={password} 
                           onChange={handleChange} 
                           placeholder="Enter Password"/><br/>
                <span>{errorObj.password && <span style={{color:'red'}}>{errorObj.password}</span>}</span>
               
                <br/>
                <TextField type="text" 
                           label="Business Name"
                           color="primary" 
                           name="businessName" 
                           value={businessName} 
                           onChange={handleChange} 
                           placeholder="Enter business Name"/><br/>
                <span>{errorObj.businessName && <span style={{color:'red'}}>{errorObj.businessName}</span>}</span>
                <br/>
                <TextField type="text" 
                           label="Address"
                           color="primary"
                           name="address" 
                           value={address} 
                           onChange={handleChange} 
                           placeholder="Enter Address"/><br/>
                <span>{errorObj.address && <span style={{color:'red'}}>{errorObj.address}</span>}</span>
               
                <br/> <br/>
                <Button type="submit" variant="contained" color="secondary">
                    Register
                </Button><br/>
            </form>
            <br/>
            <p>Already Have an Account ? </p> <br/>
                <Button variant="contained" color="primary">
                    <Link style={{color:'white',textDecoration:'none'}}to="/login">Login</Link> 
                </Button>
        </div>
    )
}

export default UserInfo
