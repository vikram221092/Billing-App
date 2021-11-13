import React from 'react'
import { Grid , Paper } from '@material-ui/core'

const HeaderList = ({classes,allCustomers,allProducts,totalAmount}) => {
    return (
        <div style = {{marginLeft:"200px"}} >
            <Grid container spacing={4} >
                      <Grid item xs={2} sm={3}  >
                        <Paper className={classes.paper}>
                        <h2 style = {{fontSize:"30px" , marginBottom:"20px"}} >Customers</h2> 
                           <h2> {allCustomers.length}</h2>
                          </Paper>
                      </Grid>

                      <Grid item xs={3} sm={3}>
                        <Paper className={classes.paper}>
                        <h2 style = {{fontSize:"30px" , marginBottom:"20px"}} >Products</h2>
                           <h2>{allProducts.length}</h2> 
                        </Paper>
                      </Grid>
                    
                      <Grid item xs={3} sm={3}>
                        <Paper className={classes.paper}>
                        <h2 style = {{fontSize:"30px" , marginBottom:"20px"}} >Total Amount</h2>
                          <h2>{totalAmount()}</h2>
                        </Paper>
                      </Grid>
                </Grid>
        </div>
    )
}

export default HeaderList
