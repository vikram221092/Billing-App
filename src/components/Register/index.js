import React, { useState } from 'react'
import UserInfo from './UserInfo'
import { useDispatch } from 'react-redux'
import { registerAction } from '../../REDUX/Actions/userAction'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles'
import { Grid , Box } from '@material-ui/core'
import Footer from '../Home/Footer'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(10),
      textAlign: 'center',
    },
  }));

const Register = (props) => {

    const [isSaved,setIsSaved]=useState(false)
    const dispatch=useDispatch()
    const classes = useStyles();

    const formSubmission=(formData)=>{      
        
        const successMessage=()=>{
            Swal.fire({
                icon: 'success',
                text: 'Successfully registered'
            })
        }
        const setSavedDetails=()=>{
            setIsSaved(true)
        }
        
        dispatch(registerAction(formData,successMessage,setSavedDetails,props.history))  
    }
    const handleIsSaved=()=>{
        setIsSaved(!isSaved)
    }

    return (
        <div className = 'root' >
                <Grid container>       
                <Grid item xs={12}>
                    <Box className={classes.paper} id="child">
                        <h1>REGISTER</h1><br/>
                        <UserInfo formSubmission={formSubmission} isSaved={isSaved} handleIsSaved={handleIsSaved}/>
                    </Box>
                </Grid>
            </Grid>    
            <Footer/>
        </div>
    )
}

export default Register
