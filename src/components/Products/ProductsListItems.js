import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon  from '@material-ui/icons/Delete'
import { deleteProductAction,editProductAction } from '../../REDUX/Actions/productsActions'
import { TableRow,TableCell,IconButton,TextField,Button,Dialog,DialogContent,DialogTitle,DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    },
}));

const ProductsListItems = ({name:Ename,price:Eprice, _id,srNo}) => {

    const [open, setOpen] = useState(false);

    const [name,setName]=useState(Ename? Ename:'')
    const [price,setPrice]=useState(Eprice ? Eprice:'')

    const [errorObj,setErrorObj]=useState({})

    const classes = useStyles();

    let errors={}

    const dispatch=useDispatch()

    const deleteHandle=(_id)=>{
        const sure=window.confirm("Are you sure")
            if(sure){
                dispatch(deleteProductAction(_id))
            }
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const runValidator=()=>{
        if(name.length===0){
            errors.name="Name can't be blank"
        }
        else if(price<=0){
             errors.price="Price is not set"   
        }
     } 
  
    const handleSubmit=(e)=>{
        e.preventDefault()
         runValidator()
         if(Object.keys(errors).length===0){
             setErrorObj({})
                const formData={
                    name:name,
                    price:Number(price)
                }    
            dispatch(editProductAction(formData,_id))  
         }
         else{
            setErrorObj(errors)
         }
     }

    return (
        <>
        <TableRow >
            <TableCell  scope="row">{srNo}</TableCell>
            <TableCell>{Ename}</TableCell>
            <TableCell>{Eprice}</TableCell>
            <TableCell>
                    <IconButton  onClick={handleClickOpen} edge="end" aria-label="delete">
                        <EditIcon  />
                    </IconButton>
            </TableCell>
            <TableCell>
                     <IconButton onClick={()=>deleteHandle(_id)} edge="end" aria-label="delete">
                         <DeleteIcon />
                     </IconButton>      
            </TableCell>
        </TableRow>


        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>  
               <DialogContent>
              <form onSubmit={handleSubmit} className={classes.root}>

                        <TextField label="Name" type="text" placeholder="Enter product name" value={name} onChange={(e)=>setName(e.target.value)}/><br/>
                        <span>{errorObj.name && <span>{errorObj.name}</span>}</span>
                        <br/>
                        <TextField label="Price" type="text" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
                        <span>{errorObj.price && <span>{errorObj.price}</span>}</span>
                        <br/>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button  type="submit" onClick={handleClose} color="primary">
                            Edit
                        </Button>
                    </DialogActions>

                </form>
                </DialogContent>
            
        </Dialog>

        </>
    )
}

export default ProductsListItems
