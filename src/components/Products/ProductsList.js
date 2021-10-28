import React , { useEffect , useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { TableContainer,Table,TableCell,TextField,TableHead,Grid,TableRow,TableBody,Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getAllProducts } from '../../REDUX/Actions/productsActions'
import Select from 'react-select'
import ProductsListItems from './ProductsListItems'
import { sortByName,sortByDescName,sortByPrice,sortByPriceDenc,SearchFunction } from './Search'

const useStyles = makeStyles({
    table: {
      minWidth: 150,
    },
  });

const ProductsList = () => {
    
    const [search,setSearch]=useState('')
     const [data,setData]=useState([])
     const [order,setOrder]=useState('')
     
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

      //sorting

      const handleSelectChange=(item)=>{
            const res=item.value
            setOrder(item)             
            if(res==="asc"){
              const result= sortByName(data,res)
              setData(result)
            }
            else if(res==="dscn"){
             const result= sortByDescName(data,res)
              setData(result)
            }
            else if(res==="priceasc"){
             const result= sortByPrice(data,res)
             setData(result)
            }
            else if(res==="pricedscn"){
              const result=sortByPriceDenc(data,res)
              setData(result)
            }
      }

      const options=[
        {value:"asc",label:'Order ASC'},
        {value:'dscn',label:'Order DSCN'},
        {value:'priceasc',label:'Price ASC'},
        {value:"pricedscn",label:'price DSCN'}
      ]

    return (
        <div>
            <Paper style={{textAlign:'center'}}>
                  <h1>Total Products-{data.length}</h1>
                  <br/>
                </Paper>
                <br/>
                 <label id="order">Order By</label>
                 
                 <Grid container spacing={3}>
                      <Grid item xs={6}> 
                          <Select
                              placeholder="Select to sort"
                              options={options}
                              value={order}
                              onChange={handleSelectChange}   
                          />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField 
                            placeholder="Enter Term to search"
                           type="text" 
                           value={search} 
                           onChange={handleChange}/>
    
                      </Grid>
                 </Grid>

                  { 
                    products.length===0 ?
                     <>
                       <div style={{textAlign:'center'}}>
                           <img src="https://icons8.com/preloaders/preloaders/1474/Walk.gif" alt="loaded"/>
                       <h1>Either you Don't have products or data not found</h1>
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
