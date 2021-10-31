import React , { useState , useEffect } from 'react'
import { getAllBillsAction } from '../../REDUX/Actions/billsActions'
import { useDispatch , useSelector } from 'react-redux'
import { Table,TableContainer,Input,Paper,TableHead,TableRow,TableBody,Grid,TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Select from 'react-select'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const BillsList = ({customers,products}) => {

    const dispatch=useDispatch()
    const [data,setData]=useState([])
    const [selectTerm,setSelectTerm]=useState('')


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

    const handleChange=(item)=>{
        const result=item.value
        setSelectTerm(item)
        sortData(result)
    }

    const sortData=(term)=>{
        if(term==="asc"){
            const result=data.sort((a,b)=>a.total-b.total)
            setData(result)
        }
        else if(term==="date"){
           const result=data.sort((a,b)=>{
               return new Date(a.date)-new Date(b.date)
           }) 
           setData(result)
        }
        else if(term==="dateDsc"){
            const result=data.sort((a,b)=>{
                return new Date(b.date)-new Date(a.date)
            })
            setData(result)

        }
        else{
            const result=data.sort((a,b)=>b.total-a.total)
            setData(result)
        }
    }
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

  const options=[
      { value:"asc", label:"Price ASC"},
      { value:"desc",label:"Price DSCE"},
      {value:'date',label:"Sort by Date"},
      {value:'dateDsc',label:'Sort By Date DESN'}
  ]
  const styleSelect={
      padding:'20px'
  }

    return (
        <div>
            <TableContainer style={{marginLeft:'70px'}}>
             
             <br/>
                 <Paper style={{textAlign:'center'}}>
                                 <h1>Total Bills-{data.length}</h1>
                                 <br/>
                </Paper>
             <br/>
          
             <label id="orderBy">Order By</label>
             <Grid container spacing={3}>
                       
                       <Grid item xs={6}>

                                <Select
                                     value={selectTerm}
                                     placeholder="Select the term"
                                     onChange={handleChange}
                                     options={options}
                                 />
                       </Grid>

                         <Grid item xs={6}>        
                                 <Input 
                                         type="text" 
                                        
                                          styles={styleSelect}
                                          value={searchTerm} 
                                          placeholder="Enter name to search" 
                                          onChange={handleSearchChange}/><br/>                            </Grid>

                          </Grid>
            
                 <br/><br/>
                 {
                 data.length===0
                  ?
                 <>
                         <div style={{textAlign:'center'}}>
                             <img src="https://icons8.com/preloaders/preloaders/1474/Walk.gif" alt="loaded"/>
                             <h1>Data not found</h1>
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
