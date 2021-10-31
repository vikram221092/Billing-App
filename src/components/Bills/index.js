import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { allCustomerListAction } from '../../REDUX/Actions/customersActions'
import { getAllProducts } from '../../REDUX/Actions/productsActions'
import AddBill from './AddBill'
import { makeStyles } from '@material-ui/core/styles'
import { Grid , Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary
    }
  }))

const Bills = (props) => {

    const dispatch=useDispatch()
    const {customers,products}=useSelector((state)=>{
        return state
    })
    const classes = useStyles();

    useEffect(()=>{
        dispatch(allCustomerListAction())
        dispatch(getAllProducts())
    },[dispatch])

    return (
        <div>
           <Grid container >
                <Grid item xs={12} sm={8}>
                    <BillsList customers={customers} products={products} />                 
                </Grid>

            <Grid item xs={12} sm={4}>
                <Box className={classes.paper} >
                    <AddBill customers ={customers}
                            products={products}
                    />
                </Box> 
            </Grid>
            </Grid>
        </div>
    )
}

export default Bills
