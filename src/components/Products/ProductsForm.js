import React , { useState , useEffect } from 'react'
import { TextField,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    },
}));

const ProductsForm = ({formSubmission,toggleStatus,isSaved}) => {

    const [name,setName]=useState('')
     const [price,setPrice]=useState('')
     const [errorObj,setErrorObj]=useState({})


     const [open, setOpen] = useState(false);

     const classes = useStyles();

     let errors={}

     useEffect(()=>{
        if(isSaved){
            setName('')
            setPrice('')
            toggleStatus()
           
        }
     },[isSaved,toggleStatus])

     const runValidator=()=>{
        if(name.length===0){
            errors.name="Name can't be blank"
        }
         if(price<=0){
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
                formSubmission(formData)
         }
         else{
            setOpen(true)
            setErrorObj(errors)
         }
     }

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
            setPrice('')
            setName('')
            setErrorObj({})
        };

    return (
        <div >
               <form onSubmit={handleSubmit} className={classes.root}>
                   <TextField label="Name" className={classes.margin} margin="dense" fullWidth type="text" placeholder="Enter product name" value={name} onChange={(e)=>setName(e.target.value)}/><br/>
                   <span>{errorObj.name && <span style={{color:'red'}}>{errorObj.name}</span>}</span>
                   <br/>
                   <TextField label="Price"  margin="dense" fullWidth type="text" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
                   <span>{errorObj.price && <span style={{color:'red'}}>{errorObj.price}</span>}</span>
                   <br/><br/><br/>

                   <Button variant="contained" onClick={handleClickOpen} color="secondary"  type="submit">Add Product</Button>

                   {/* <Button onClick={handleClose} variant="contained" color="primary">
                       Cancel
                   </Button> */}

             
               </form>
   </div>
    )
}

export default ProductsForm
