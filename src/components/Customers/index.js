import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid , Box } from '@material-ui/core'
import AddCustomer from './AddCustomer'
import CustomersList from './CustomersList'
import Footer from '../Home/Footer'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary
    }
  }))
 
const Customers = () => {

    const classes = useStyles()

    return (
        <div>
        <div style={{margin:'20px'}}  >
        <Grid container >
            <Grid item xs={12} sm={8}>
                     <CustomersList/>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Box className={classes.paper}>
                       <AddCustomer/>
                </Box >
            </Grid>

        </Grid>
     
    </div>  
    <Footer/>
    </div>
    )
}

export default Customers
