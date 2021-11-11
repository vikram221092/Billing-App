import React , { useState , useEffect } from 'react'
import BillsListItems from './BillsListItems'
import { getAllBillsAction } from '../../REDUX/Actions/billsActions'
import { useDispatch , useSelector } from 'react-redux'
import { Table,TableContainer,Input,Paper,TableHead,TableRow,TableBody,Grid,TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const BillsList = ({customers,products}) => {

    const dispatch=useDispatch()
    const [data,setData]=useState([])

    const [searchTerm,setSearchTerm]=useState('')

    const classes = useStyles();

    useEffect(()=>{
        dispatch(getAllBillsAction())
    },[dispatch])

    const bills=useSelector((state)=>{
        return state.bills
    })

    useEffect(()=>{
    setData([...bills]) 
    },[bills])

    
  //Searching 
  const handleSearchChange=(e)=>{

        const result=e.target.value
        setSearchTerm(result)
        filterData(result)     
  }

  const filterData=(query)=>{
      let finalResult=[]  
    const result=customers.filter((ele)=>{
          return ele.name.toLowerCase().includes(query.toLowerCase())
    })
    result.forEach((ele)=>{
        const result=bills.filter((e=>e.customer===ele._id))
        finalResult=finalResult.concat(result)
    })
    setData(finalResult)
  }
  const styleSelect={
      padding:'20px'
  }

    return (
        <div>
            <TableContainer style={{marginLeft:'70px'}}>
             
             <br/>
                 <Paper style={{textAlign:'center' , padding:"10px" , backgroundColor:"black" , color:"white" }}>
                                 <h1>Total Bills - {data.length}</h1>
                                
                </Paper>
             <br/>
             
                

                         <Grid item xs={6}>       
                         <SearchIcon/> 
                                 <Input 
                                         type="text" 
                                          styles={styleSelect}
                                          value={searchTerm} 
                                          placeholder="Enter name to search Bill" 
                                          onChange={handleSearchChange}/><br/>                            
                                          </Grid>                       
            
                 <br/><br/>
                 {
                 data.length===0
                  ?
                 <>
                         <div style={{textAlign:'center'}}>
                             <h1>Generate Bill...</h1>
                         </div>
                 </>
                  :
                  <Table className={classes.table}>
                     <TableHead>
                         <TableRow>
                                     <TableCell>Sr.No</TableCell>
                                     <TableCell>Customer Name</TableCell>
                                     <TableCell>Total</TableCell>
                                     <TableCell>Bill created Date</TableCell>
                                     <TableCell>View Product Details</TableCell>
                                     <TableCell>Delete</TableCell>
                                 </TableRow>
                             </TableHead>

                             <TableBody>
                                     {  data.length !==0 &&

                                         data
                                         .map((ele,i)=>{
                                                 return <BillsListItems key={i} {...ele} srNo={i+1} customers={customers} products={products}/>
                                         })     
                                     }   
                                 
                             </TableBody>
                     </Table>                      
                  }
                

       </TableContainer> 
        </div>
    )
}

export default BillsList
