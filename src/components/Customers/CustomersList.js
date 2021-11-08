import React , { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { TextField ,TablePagination,TableContainer,Paper,Table,TableRow,TableBody,Box, TableCell, TableHead, Grid } from '@material-ui/core'
import {  SearchFunction } from './Search'
import SearchIcon from '@material-ui/icons/Search'
import CustomersListItem from './CustomersListItem'
import { allCustomerListAction } from '../../REDUX/Actions/customersActions'

const useStyles = makeStyles({
    table: {
      minWidth: 150,
    },
});

const CustomersList = (props) => {

   
    const [search,setSearch]=useState('')
    const [data,setData]=useState([])

    const [page,setPage]=useState(0)
    const [rowsPerPage,setRowsPerPage]=useState(5)

    const dispatch=useDispatch()
    const classes = useStyles();

    useEffect(()=>{
        dispatch(allCustomerListAction())
    },[dispatch])

    const customers=useSelector((state)=>{
        return state.customers
    })
    
     useEffect(()=>{
         setData([...customers])
     },[customers])
    

    // Searching

    const handleSearchChange=(e)=>{
        const res=e.target.value
        setSearch(res)

        const result= SearchFunction(res,customers)
        setData(result)
    }   

    //Pagination
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

    return (
        <div style={{marginLeft:'50px'}} >
                                <Paper style={{textAlign:'center',padding:"10px" , backgroundColor:"black" , color:"white" }}>
                   <h1>Total Customers - {data.length}</h1>
                </Paper>
                <br/>
                <Grid container spacing={3}>
                  
                    <Grid item xs={6}>
                    <SearchIcon/>
                        <TextField  placeholder="Search Customers Here" type="text" value={search} onChange={handleSearchChange} />
                        
                    </Grid>   
                </Grid>
                <br/>
             {
                customers.length===0 ?
                <>
                 <div style={{textAlign:'center'}}>
                         <h1>Add Customers...</h1>
                 </div>
                  
                </>
                :
                <>
                  <TableContainer component={Box} item="true" xs={9}>

                        <Table className={classes.table}>
                        <TableHead>
                                <TableRow>
                                    <TableCell component="th">Sr.No</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell >Delete</TableCell> 
                                    <TableCell>View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {  
                                        data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)                
                                        .map((ele,i)=>{
                                        return <CustomersListItem key={ele._id} {...ele} srNo={i+1}/>
                                        })
                            }
                        </TableBody>

                        </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                           />
                  </TableContainer>
                </>
          } 
        </div>
    )
}

export default CustomersList
