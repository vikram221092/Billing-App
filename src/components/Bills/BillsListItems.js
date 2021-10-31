import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBillsAction } from '../../REDUX/Actions/billsActions'
import { TableRow,TableCell,Button,IconButton,Dialog,DialogActions ,DialogTitle,DialogContent } from '@material-ui/core'
import ViewProductDetails from './ViewProductDetails'
import ViewListIcon from "@material-ui/icons/ViewList"
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment'

const BillsListItems = ({srNo,customer,total,date,_id,customers,products,}) => {

    const [open, setOpen] = useState(false);

    const dispatch=useDispatch()

    //get Customer Name
    const getCustomer=(id)=>{
        const result=customers.find((ele)=>{
             return ele._id===id && { name:ele.name}  
        })
        return result !== undefined && result.name
    }
    //View Bill

    // delete Bill
    const deleteHandle=(_id)=>{
        const sure=window.confirm("Are you sure")
        if(sure){
            dispatch(deleteBillsAction(_id))
        }
    }
    // for Modal
      const handleClickOpen = () => {
         setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
    };
    //For Parse a Date
    const getParsedDate=(date)=>{
        const result=moment.utc(date)
        const da=result._d.toString()
        const Index=da.indexOf('G')  
        const result1= da.slice(0,Index)  
        return result1
   }

    return (
        <>
        <TableRow>
           <TableCell>{srNo}</TableCell> 
           <TableCell>{getCustomer(customer)}</TableCell>
           <TableCell>{total}</TableCell>
           <TableCell>{getParsedDate(date)}</TableCell>
           <TableCell>
                    <IconButton  onClick={()=>handleClickOpen(_id)} edge="end" aria-label="delete">
                         <ViewListIcon />
                     </IconButton>   
           </TableCell>
           <TableCell>
                <IconButton onClick={()=>deleteHandle(_id)} edge="end" aria-label="delete">
                            <DeleteIcon />
                </IconButton>   
           </TableCell>

        </TableRow>
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
             >
                 <DialogTitle id="alert-dialog-title">View Bill Details</DialogTitle>
                    <DialogContent>

                        <ViewProductDetails _id={_id} customers={customers} products={products} />
                    
                    </DialogContent>
                    <DialogActions>
                        <Button  color="primary" onClick={handleClose} autoFocus>
                            Go Back
                        </Button>
                    </DialogActions>
            </Dialog>
        </>
    )
}

export default BillsListItems
