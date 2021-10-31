import React , { useState , useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { Button,Dialog,DialogTitle,Input,TableRow,TableCell,TableBody,TableContainer,Table,TableHead,FormControl,DialogContent,Box,DialogActions } from '@material-ui/core'
import Select from 'react-select'
import CartItem from './CartItem'
import DownloadBill from './DownloadBill'


const BillForm = ({customers,products,formSubmission,resetForm,isSaved}) => {

    const [myDate,setMyDate]=useState('')
    const [selectCustomer,setSelectCustomer]=useState('')
    const [lineItems,setLineItems]=useState([])

    const [filteredCustomer,setFilteredCustomer]=useState([])
    const [filteredProducts,setFilteredProducts]=useState([])
    const [selectedValue, setSelectedValue] = useState([]);

    const [isAddedToCart,setIsAddedToCart]=useState(false)

    const [errorObj,setErrorObj]=useState({})
    
    const user=useSelector((state)=>{
        return state.user
    })

    //modal    
    const [open, setOpen] = useState(false);

    //reset form
    useEffect(()=>{
        if(isSaved){
            setMyDate('')
            setLineItems([])
            setSelectCustomer('') 
            resetForm()
        }
    },[isSaved,resetForm])

       //for errors
       let errors={}
      
       //For React Select  
        const handleDateChange=(e)=>{
            const result=e.target.value
            setMyDate(result)
        }
        //Generate Data for Customer
        const handleChange=(item)=>{
            setSelectCustomer(item)
        }

        useEffect(()=>{
            const result=customers.map((ele)=>{ 
                return {value:ele._id,label:ele.name}
            })
            setFilteredCustomer(result)
        },[customers])

        //Generate Data for Products
        const multiHandleChange=(e)=>{
            const result=e.map((ele)=>{
                return ele.value || []
            })
            setSelectedValue(result)
        }
        useEffect(()=>{
            const result=products.map((ele)=>{
                return {value:ele._id,label:ele.name} // start from here
            })
            setFilteredProducts(result)
        },[products])   

        // forAdding lineItems
          const addItem=(items)=>{
               
               const result=items.map((ele)=>{
                    return {id:uuidv4(),product:ele,quantity:"1"}
                })
              const data=[...result,...lineItems]
              setLineItems(data)  
              setIsAddedToCart(true)
              setSelectedValue([])
          }
          //Increment
          const incrementQuantity=(id)=>{

            const result=lineItems.map((ele)=>{
                if(ele.id===id){
                    return {...ele,quantity:Number(ele.quantity)+1}
                }else{
                    return {...ele}
                }
            })
            setLineItems(result)
          }
          const decrementQuantity=(id)=>{
            const result=lineItems.map((ele)=>{
                if(ele.id===id){
                    return {...ele,quantity:Number(ele.quantity)-1}
                }else{
                    return {...ele}
                }
            })
            setLineItems(result)
          } 
          const removeItem=(id)=>{
              const result=lineItems.filter((ele)=>{
                  return ele.id !==id
              })
              setLineItems(result)
          }
       //validation

       const runValidator=()=>{
         if(myDate.length ===0){
             errors.myDate="Date is not preset"
         }
         if(selectCustomer.length===0){
             errors.selectCustomer="Your not preset User"
         }

         if(selectedValue.length===0 && lineItems.length===0){
                errors.multipleProducts="Products list is empty"
         }

       }
       //formSubmit
       const handleSubmit=(e)=>{
            e.preventDefault()

            runValidator()
            if(Object.keys(errors).length ===0){
                setErrorObj({})
                const formData={
                    date: myDate,
                    customer:selectCustomer.value,
                    lineItems:lineItems,
                    user:user !== undefined && user._id
                }
               formSubmission(formData)
            }else{
                setOpen(true)
                setErrorObj(errors)
            }
       } 
       //for modal

        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
            setErrorObj({})
        };
        
        const handleReset=()=>{
            setMyDate('')
            setLineItems([])
            setSelectCustomer('')
            setErrorObj({})
            setSelectedValue([])
          }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Generate Bill Here
                </Button>
                 <Dialog fullWidth={true} maxWidth={'md'}   open={open} onClose={handleClose} style={{padding:'20px'}}>
                     <DialogTitle id="form-dialog-title"> Add Your Bill</DialogTitle>
                     <DialogContent>            
                           <Box
                            display="flex"
                            >
                             <Box
                               mr={2}
                             >
                                <form  noValidate  onSubmit={handleSubmit} autoComplete="off">
                                        <FormControl>
                                            <Input type="date" 
                                            style={{  width: '25ch'}} value={myDate} onChange={handleDateChange}/>
                                            <br/>
                                            <span style={{color:'red'}}>{errorObj.myDate && <span>{errorObj.myDate}</span>}</span>        
                                            <br/>
                                        </FormControl>

                                        <br/><br/>  

                                        <label>Select Customers</label>                                    
                                        <Select
                                            placeholder="Select Customer"
                                            options={filteredCustomer}
                                            onChange={handleChange}
                                            value={selectCustomer}
                                        />  
                                        <span style={{color:'red'}}>{errorObj.selectCustomer && <span>{errorObj.selectCustomer}</span>}</span>
                                        
                                        <br/>
                                        <label>Select Products</label>
                                        <Select
                                                placeholder="Select Multiple Products"
                                                options={filteredProducts}
                                                defaultValue=""
                                                value={filteredProducts.filter(ele=> selectedValue.includes(ele.value))}
                                                onChange={multiHandleChange}  
                                                isMulti
                                                className="dropdown"
                                        />  
                                        <span>{errorObj.multipleProducts && <span style={{color:'red'}}>{errorObj.multipleProducts}</span>}</span>
                                        <br/>
                                        <div>
                                            <Button variant="contained" color="primary" onClick={()=>addItem(selectedValue)}>Add Items </Button>
                                        </div>
                                        <br/>
                                        <hr/>
                                            <DialogActions>
                                                    <Button onClick={handleReset} variant="contained"  color="secondary">
                                                        Reset
                                                    </Button>
                                                    <Button onClick={handleClose} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button  variant="outlined"  onClick={handleClose} type="submit" color="primary">
                                                        add Bill
                                                    </Button> 
                                            </DialogActions>      
                                    </form>
                            </Box>
                            <TableContainer>
                                 {
                                  lineItems.length===0 ?

                                    <img style={{height:'400px',textAlign:'center',width:'400px',objectFit:'contain'}} src={`https://image.freepik.com/free-vector/add-cart-concept-illustration_114360-1435.jpg`} alt="No Carts Items"/>    
                                :<>
                                  <Table>
                                  <TableHead>
                                          <TableRow>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>SubTotal</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Remove</TableCell>        
                                          </TableRow>
                                  </TableHead>
                                      <TableBody>
                                              {
                                                  lineItems.map((ele,i)=>{
                                                  return <CartItem key={i} removeItem={removeItem} incrementQuantity={incrementQuantity} selectCustomer={selectCustomer} decrementQuantity={decrementQuantity} products={products} customers={customers} {...ele}/>                  
                                              })
                                          }
                                      </TableBody>
                                  </Table>

                                 {isAddedToCart &&(
                                         <>
                                           <DownloadBill customerName={selectCustomer.label} myDate={myDate} lineItems={lineItems} customers={customers} products={products}/>  
                                        </>
                                  )}   
                                 </>
                                }
                            </TableContainer>
                      </Box>
                     </DialogContent>     
                 </Dialog>
        </div>
    )
}

export default BillForm
