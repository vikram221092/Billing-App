import React , { useState , useEffect } from 'react'
import validator from 'validator'
import { Button , TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

    const useStyles = makeStyles((theme) => ({
        root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        },
    }));

    const CustomersForm = ({formSubmission,isSaved,resetFormHandle,handleToggle}) => {

        const classes = useStyles();

        const [name,setName]=useState('')
        const [mobile,setMobile]=useState( '')
        const [email,setEmail]=useState('')
        const [errorObj,setErrorObj]=useState({})
        
        let errors={}
    
        useEffect(()=>{
            if(isSaved){
                setName('')
                setMobile('')
                setEmail('')
                resetFormHandle()
            }
        },[isSaved,resetFormHandle])
        
        const handleChange=(e)=>{
            const attr=e.target.name
            if(attr==="name"){
                setName(e.target.value)
            }
            else if(attr==="mobile"){
                setMobile(e.target.value)
            }
            else if(attr==="email"){
                setEmail(e.target.value)
            }
        }
        const runValidator=()=>{
            if(name.length===0){
                errors.name="Name can't be blank"
            }
            if(mobile.length===0){
                errors.mobile="Mobile can't be blank"
            }
            else if(mobile.length !==10){
                errors.mobile="Mobile should be 10 digit"
            }
    
            if(email.length===0){
                errors.email="Email can't be blank"
            }
            else if(!validator.isEmail(email)){
                errors.email="Email is not valid"
            }
        }
        const handleSubmit=(e)=>{
            e.preventDefault()
            runValidator()
            if(Object.keys(errors).length===0){
                setErrorObj({})
                    const formData={
                        name:name,
                        mobile:mobile,
                        email:email.toLowerCase()
                    }
                    formSubmission(formData)
                   if(handleToggle){
                       handleToggle()
                   }
            }else{
                setErrorObj(errors)
            }
        }
    
    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.root}>
                  <TextField type="text" label="Name" name="name" placeholder="Enter name" value={name} onChange={handleChange}/><br/>
                  <span>{errorObj.name && <span style={{color:'red'}}>{errorObj.name}</span>}</span>
                  <br/>
                  <TextField type="text" label="Mobile" name="mobile" placeholder="Enter mobile" value={mobile} onChange={handleChange}/>
                  <br/>
                  <span>{errorObj.mobile && <span style={{color:'red'}}>{errorObj.mobile}</span>}</span>
                  <br/>
                  <TextField type="text" label="Email" name="email" placeholder="Enter email" value={email} onChange={handleChange}/>
                  <br/>
                  <span>{errorObj.email && <span style={{color:'red'}}>{errorObj.email}</span>}</span>
                  <br/><br/><br/>
                  <Button variant="contained" color="secondary" type="submit">Add customer</Button>
              </form>
        </div>
    )
}

export default CustomersForm
