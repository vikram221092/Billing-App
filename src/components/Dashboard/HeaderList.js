import React from 'react'
import { Grid , Paper } from '@material-ui/core'

const HeaderList = ({classes,allCustomers,allProducts,allBills,totalAmount}) => {
    return (
        <div>
            <Grid container>
                      <Grid item xs={3} sm={3} >
                        <Paper className={classes.paper}>
                        <h1>Customers</h1>  <br/><br/>
                           <h3> {allCustomers.length}</h3>
                          </Paper>
                      </Grid>

                      <Grid item xs={3} sm={3}>
                        <Paper className={classes.paper}>
                        <h1>Products</h1> <br/> <br/>
                           <h3>{allProducts.length}</h3> 
                        </Paper>
                      </Grid>
                      <Grid item xs={3} sm={3}>
                        <Paper className={classes.paper}>
                         <h1>Bills</h1> <br/><br/>
                          <h3>{allBills.length}</h3>
                        </Paper>
                      </Grid>
                      <Grid item xs={3} sm={3}>
                        <Paper className={classes.paper}>
                        <h1>Amount</h1> <br/><br/>
                          <h3>{totalAmount()}</h3>
                        </Paper>
                      </Grid>
                </Grid>
        </div>
    )
}

export default HeaderList
