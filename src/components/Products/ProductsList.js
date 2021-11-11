import React , { useEffect , useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { TableContainer,Table,TableCell,TextField,TableHead,Grid,TableRow,TableBody,Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { getAllProducts } from '../../REDUX/Actions/productsActions'
import ProductsListItems from './ProductsListItems'
import {SearchFunction } from './Search'

const useStyles = makeStyles({
    table: {
      minWidth: 150,
    },
  });

const ProductsList = () => {
    
    const [search,setSearch]=useState('')
     const [data,setData]=useState([])
     
     const classes = useStyles();

     const dispatch=useDispatch()

      useEffect(()=>{
          dispatch(getAllProducts())
      },[dispatch])
      
        const products=useSelector((state)=>{
            return state.products
        })
        
        useEffect(()=>{
          setData([...products])
        },[products])
       
        //Search
      const handleChange=(e)=>{
          const inputValue=e.target.value
          setSearch(inputValue)
          
          const result=SearchFunction(products,inputValue)
          setData(result)
      }

    return (
        <div>
            <Paper style={{textAlign:'center' , backgroundColor:"black" , color:"white"}}>
                  <h1>Total Products - {data.length}</h1>
                </Paper>
                <br/>
                 
                 <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <SearchIcon/>
                          <TextField 
                            placeholder="Search Products Here"
                           type="text" 
                           value={search} 
                           onChange={handleChange}/>
    
                      </Grid>
                 </Grid>
                 <br/>
                  { 
                    products.length===0 ?
                     <>
                       <div style={{textAlign:'center'}}>
                       <h1>Add Products...</h1>
                     </div>
                    </>
                    :
                    <div style={{margin:'30px'}}>
                        <TableContainer component={Paper} item="true" xs={9} >
                            

                        <Table className={classes.table} >
                                <TableHead>
                                      <TableRow>
                                            <TableCell>Sr.No</TableCell>
                                            <TableCell >Product Name</TableCell>
                                            <TableCell >Product Price</TableCell>
                                            <TableCell >Edit</TableCell>
                                            <TableCell>Delete</TableCell>
                                        </TableRow>
                                </TableHead>
                                <TableBody>
                                {     
                                       data
                                       .map((ele,i)=>{
                                        return <ProductsListItems key={ele._id} {...ele} srNo={i+1} />
                                      })
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                }
        </div>
    )
}

export default ProductsList
