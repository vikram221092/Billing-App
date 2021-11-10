import React from 'react'
import { Box , Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddProducts from './AddProducts'
import ProductsList from './ProductsList'
import Footer from '../Home/Footer'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary
    }
}));

const Products = () => {

    const classes = useStyles();

    return (
        <div>
        <div style={{margin:'20px', marginLeft:"60px"}}>
        <Grid container >                
            <Grid item xs={12} sm={8}>
                     <ProductsList/>
            </Grid>

            <Grid item xs={12} sm={4} >
                <Box className={classes.paper}> 
                    <AddProducts/>
                </Box>
            </Grid>
        </Grid>

    </div>
    <Footer/>
    </div>
    )
}

export default Products
