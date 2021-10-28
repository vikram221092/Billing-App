import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid , Box } from '@material-ui/core'

import CustomersList from './CustomersList'

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
    )
}

export default Customers
