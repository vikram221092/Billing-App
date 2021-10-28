import React , { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { TextField ,TablePagination,TableContainer,Paper,Table,TableRow,TableBody,Box, TableCell, TableHead, Grid } from '@material-ui/core'
import {  SearchFunction ,sortByAscName,sortByDescName } from './Search'
import Select from 'react-select'
import CustomersListItem from './CustomersListItem'
import { allCustomerListAction } from '../../REDUX/Actions/customersActions'

const useStyles = makeStyles({
    table: {
      minWidth: 150,
    },
});

const CustomersList = (props) => {

    const [order,setOrder]=useState('')    
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
    

     //sorting

    const handleSelectChange=(item)=>{
        const res=item.value
        setOrder(item)
        
        if(res==="asc"){
            const result= sortByAscName(data,res)
            setData(result)
         }
         else if(res==="dscn"){
            const result =sortByDescName(data,res)
            setData(result)
         }
    }

    // Searching

    const handleSearchChange=(e)=>{
        const res=e.target.value
        setSearch(res)

        const result= SearchFunction(res,customers)
        setData(result)
    }   

     
    const options=[
        { value:"asc", label:"Order ASC"},
        { value:"dscn",label:"Order DSCE"}
    ]
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
                                <Paper style={{textAlign:'center'}}>
                   <h1>Total Customer-{data.length}</h1>
                    <br/>
                </Paper>
                <label id="order">Order By</label>
                <Grid container spacing={3}>
                    <Grid item xs={6}  >
                        <Select
                            options={options}
                            value={order}
                            onChange={handleSelectChange}
                        />
                    </Grid>  
                    <Grid item xs={6}>
                        <TextField  placeholder="Enter Term to search" type="text" value={search} onChange={handleSearchChange} />
                    </Grid>   
                </Grid>
                <br/>
             {
                customers.length===0 ?
                <>
                 <div style={{textAlign:'center'}}>

                         <img src="https://icons8.com/preloaders/preloaders/1474/Walk.gif" alt="loaded"/>
                         <h1>Data not found</h1>
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
