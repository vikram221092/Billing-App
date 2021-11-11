import React from "react";
import UserLogin from './UserLogin'
import Swal from "sweetalert2";
import { loginAction } from "../../REDUX/Actions/userAction";
import { useDispatch } from "react-redux";
import { Grid ,Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../Home/Footer";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(5),
      textAlign: 'center',
       },
  }));

  const Login = (props) => {

    const { handleLoginStatus }=props
    const dispatch=useDispatch()

    const classes = useStyles();

    const formSubmission=(formData)=>{
        const successMessage=()=>{
            Swal.fire({
                icon: 'success',
                text: 'Successfully LoggedIn'
            })
        }
        const errorMessage=(error)=>{
            Swal.fire({
                icon:'error',
                text:error.errors
            })
        }
        dispatch(loginAction(formData, props.history ,successMessage,errorMessage,handleLoginStatus))
    }

    return(
        <div className = 'root' >
                <Grid container >       
                <Grid item xs={12}>
                    <Box className={classes.paper} id="child">
                        <h1>LOGIN</h1><br/>
                        <UserLogin formSubmission={formSubmission}/> 
                    </Box>
                </Grid>
            </Grid>  
            
           <h3 style={{marginLeft:"580px"}}>Email - demo1234@gmail.com</h3>
           <h3 style={{marginLeft:"580px"}}>Password - demo1234</h3>
          
            <Footer/>
        </div>
    )
  }

  export default Login