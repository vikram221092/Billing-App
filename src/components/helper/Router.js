import React , { useEffect } from "react";
import { Link , Route , Switch , withRouter } from "react-router-dom";
import { AppBar ,Toolbar , Typography  } from "@material-ui/core";
import { accountAction } from "../../REDUX/Actions/userAction";
import { useDispatch } from "react-redux";

import Home from '../Home/index'
import Register from '../Register/index'
import Login from '../Login/index'
import Dashboard from '../Dashboard/index'
import Customers from '../Customers/index'
import Products from '../Products/index'
import Bills from '../Bills/index'
import Profile from "../Account/Profile";
import PageNotFound from './PageNotFound'

const Router = (props) => {

    const {handleLoginStatus}=props

    const localVAr=localStorage.getItem('token') ||  false

    const dispatch=useDispatch()

    const LinkStyle={
        color:'white',
        margin:'26px',
        textDecoration:'none',
        fontSize:"24px",
    }
    const LinkStyle1 = {
        color:'white',
        margin:'50px',
        textDecoration:'none',
        fontSize:"26px",
    }
      useEffect(()=>{
          if(localStorage.getItem('token')){
            dispatch(accountAction())
          }
      },[dispatch])

    return (
        <div>
                <AppBar position="static" color= "secondary" >
                <Toolbar>
                <Typography variant="h6" style={{flexGrow:1}}>
                    
                     <Link style={LinkStyle1} to="/"><b>BILLING APP</b></Link>

                     <br/>
                
                </Typography>
                    <Typography>
                        {
                            localVAr ?
                            <>
                                <Link  style={LinkStyle} to="/dashboard" >Dashboard</Link>    
                                <Link style={LinkStyle} to="/customers">Customers</Link>
                                <Link style={LinkStyle} to="/products">Products</Link> 
                                <Link style={LinkStyle} to="/bills">Bills</Link>
                                <Link style={LinkStyle} to="/account">Account</Link>

                                <Link style={LinkStyle} onClick={()=>{
                                    localStorage.removeItem('token')
                                    props.history.push('/')
                                    handleLoginStatus()
                                }}to="#">Logout</Link>
                            </>
                            :
                            <>        
                                <Link  style={LinkStyle} to="/">Home</Link> 
                                <Link  style={LinkStyle} to="/register">Register</Link>  
                                <Link  style={LinkStyle} to="Login">Login</Link>   
                            </>
                        }
                    </Typography>
                </Toolbar>            
            </AppBar>
            <Switch>
               <Route path="/" component={Home} exact/>      
                {
                    localVAr ?
                     <Switch>
                        <Route path="/dashboard" component={Dashboard} exact/> 
                        <Route path="/customers" component={Customers} exact/>
                        <Route path="/products" render={(props)=><Products {...props}/> } exact/>
                        <Route path="/bills" component={Bills} exact/>  
                        <Route path="/account" component={Profile} exact />
                        <Route component={PageNotFound} />
                    </Switch>
                    :
                    <Switch>
                            <Route  path="/register" component={Register} exact/>
                            <Route path="/login" render={(props)=><Login handleLoginStatus={handleLoginStatus} {...props}/>} exact/>    
                            <Route component={PageNotFound} />
                    </Switch> 
                 }
            </Switch>
        </div>
    )
}

export default  withRouter(Router) 
