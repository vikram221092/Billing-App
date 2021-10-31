import React , { useState } from 'react'
import { Button,DialogActions,TableCell,TableContainer,TableBody,Dialog, Table,TableHead, TableRow } from '@material-ui/core'
import ReactTOPdf from "react-to-pdf";

const DownloadBill = ({customerName,myDate,lineItems,products}) => {

    const [open, setOpen] = useState(false);
    const ref = React.createRef();
    
    const filteredPrice=[]

    const getProduct=(product)=>{
        if(product.length!==0){
           const result=products.find((ele)=>{
               return ele._id===product
           })
           filteredPrice.push(result)
           return result
       }
     }
     
     const FinalAmount=()=>{
        let sumTotal=0
         lineItems.forEach((ele)=>{
            sumTotal+=Number(ele.quantity) * getProduct(ele.product).price   
        }) 
        return sumTotal    
     }

     const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
             <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Download Here
              </Button>
              
              
              
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >       
                    <div ref={ref}>

                        <TableContainer>
                            <h3>Date:{myDate}</h3>
                            <h3>Customer Name:{customerName}</h3>
                            <h2>Total Amount:{FinalAmount()}</h2>
                            <Table>
                                <TableHead>
                                        <TableRow>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>SubTotal</TableCell>
                                            <TableCell>Quantity</TableCell>
                                        </TableRow> 
                                </TableHead>
                                <TableBody>
                                    {lineItems.map((ele,i)=>{
                                        return(
                                            <TableRow key={i}>
                                                <TableCell> {getProduct(ele.product).name}</TableCell>
                                                <TableCell>
                                                    {getProduct(ele.product).price * Number(ele.quantity)} 
                                                </TableCell> 
                                                <TableCell>
                                                    {ele.quantity}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                        <TableRow>  
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>  
                </div>
             

                <ReactTOPdf targetRef={ref} >
                {({toPdf}) => 
                    <Button onClick={toPdf} variant="contained"   color="primary">
                       Download
                   </Button>
                 }
             </ReactTOPdf>
             <DialogActions>
                    <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                </DialogActions>

             </Dialog>     
        </div>
    )
}

export default DownloadBill
