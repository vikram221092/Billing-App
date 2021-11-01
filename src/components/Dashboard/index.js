import React, { useState , useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { allCustomerListAction } from '../../REDUX/Actions/customersActions'
import { getAllProducts } from '../../REDUX/Actions/productsActions'
import { getAllBillsAction } from '../../REDUX/Actions/billsActions'
import HeaderList from './HeaderList'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft:'30px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
  }))

const Dashboard = () => {

      const [allCustomers,setAllCustomers]=useState([])
      const [allProducts,setAllProducts]=useState([])
      const [allBills,setAllBills]=useState([])

      const classes = useStyles()
      const dispatch=useDispatch()

      const {customers,products,bills}=useSelector((state)=>{
        return state
      })

      useEffect(()=>{
        dispatch(allCustomerListAction())
        dispatch(getAllProducts())
        dispatch(getAllBillsAction())
    },[dispatch])

    useEffect(()=>{
        setAllCustomers([...customers])
        setAllProducts([...products])
        setAllBills([...bills])
    },[customers,products,bills])

    const totalAmount=()=>{
        let sum=0 
        bills.forEach((ele)=>{
          sum+=ele.total
        })
        return sum
      }


    return (
        <div className={classes.root} >
             <Container maxWidth="lg" style={{marginTop:'50px'}}>
              <HeaderList totalAmount={totalAmount} 
                    allCustomers={allCustomers}
                    allBills={allBills}
                    allProducts={allProducts}
                    classes={classes}
              />
              {/* <TabsComponent 
                   allCustomers={allCustomers}
                   allBills={allBills}
                   allProducts={allProducts}
              /> */}
              
             
          </Container>
        </div>
    )
}

export default Dashboard
