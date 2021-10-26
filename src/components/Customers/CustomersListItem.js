import React , { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import validator from 'validator'
import { makeStyles } from '@material-ui/core/styles'
import { Paper,TableRow,DialogTitle,DialogActions,Button,IconButton,Dialog,TextField,TableCell } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ViewListIcon from '@material-ui/icons/ViewList'
import Swal from 'sweetalert2'
import Draggable from 'react-draggable'
import { deleteCustomerAction } from '../../REDUX/Actions/customersActions'
import { editCustomerAction } from '../../REDUX/Actions/customersActions'

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    }
}));

const CustomersListItem = ({_id ,srNo,name:Ename,mobile:Emobile,email:Eemail,createdAt}) => {
   
    const [open,setOpen]=useState(false)

    const [name,setName]=useState(Ename? Ename: '')
    const [mobile,setMobile]=useState(Emobile ? Emobile :'')
    const [email,setEmail]=useState(Eemail ? Eemail:'') 
    const [errorObj,setErrorObj]=useState({})
    
    let errors={}

    const classes = useStyles();

    const dispatch=useDispatch()

    const customers=useSelector((state)=>{
        return state.customers
    }) 


    //For open and close of handle

    const handleOpen=()=>{
        setOpen(true);
     }      

     const handleClose = () => {
         setErrorObj({})
        setOpen(false);
     };

    const handleView=(_id)=>{
        if(_id){
            const result=customers.find((ele)=>{
                return ele._id===_id
            })
            Swal.fire(
                  `Name:${result.name} Email:${result.email}`,
                  `Mobile:${result.mobile}`,  
                  'success'
              )
        }
    }
    // delete Handle
    const deleteHandle=(_id)=>{
        const sure=window.confirm("Most commonly Customer are not deleted")
            if(sure){
                    dispatch(deleteCustomerAction(_id))
            }
       }    

      const handleChange=(e)=>{
        const attr=e.target.name
        if(attr==="name"){
               setName(e.target.value) 
        }
        else if(attr==="mobile"){
            setMobile(e.target.value)
        }else if(attr==="email"){
            setEmail(e.target.value)
        }
      }
     
      const runValidator=()=>{

        if(name.length===0){
            errors.name="Name can't be blank"
        }

        if(mobile.length===0){
            errors.mobile="Mobile can't be blank"
        }
        else if(mobile.length !==10){
            errors.mobile="Mobile should be 10 digit"
        }

        if(email.length===0){
            errors.email="Email can't be blank"
        }
        else if(!validator.isEmail(email)){
            errors.email="Email is not valid"
        }
    }
        //form submission

      const handleSubmit=(e)=>{
        e.preventDefault()
        runValidator()
        if(Object.keys(errors).length===0){
            setErrorObj({})
            const formData={
                name:name,
                mobile:mobile,
                email:email
          }
        
          dispatch(editCustomerAction(formData,_id))
        
        }else{
            setErrorObj(errors)
        }
    }

    return (
        <>
        <TableRow >
        <TableCell scope="row">{srNo}</TableCell>

        <TableCell>{Ename}</TableCell>
        <TableCell>{Eemail}</TableCell>

        <TableCell>{Emobile}</TableCell>
        <TableCell>
                    <IconButton edge="end"  onClick={handleOpen} aria-label="view">
                                   <EditIcon title="Edit" />
                   </IconButton>                       
        </TableCell>
             <TableCell>
                       <IconButton edge="end"  onClick={()=>deleteHandle(_id)} aria-label="delete">
                               <DeleteIcon title="Delete" />
                       </IconButton>
            </TableCell>
                 <TableCell>
                       <IconButton edge="end" onClick={()=>handleView(_id)}  aria-label="view">
                               <ViewListIcon  title="View" />
                       </IconButton>
                  </TableCell>
                   
       </TableRow>
       <Dialog
           open={open}
           onClose={handleClose}
           PaperComponent={PaperComponent}
           aria-labelledby="draggable-dialog-title"
        >
               <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                   Edit from
               </DialogTitle>

               <form onSubmit={handleSubmit} className={classes.root}>
                   <TextField type="text" label="Name" name="name" placeholder="Enter name" value={name} onChange={handleChange}/><br/>
                   <span>{errorObj.name && <span style={{color:'red'}}>{errorObj.name}</span>}</span>
                   <br/>
                   <TextField type="text" label="Mobile" name="mobile" placeholder="Enter mobile" value={mobile} onChange={handleChange}/>
                   <br/>
                   <span>{errorObj.mobile && <span style={{color:'red'}}>{errorObj.mobile}</span>}</span>
            
                   <br/>
                    <TextField type="text" label="Email" name="email" placeholder="Enter email" value={email} onChange={handleChange}/>
                    <br/>
                    <span>{errorObj.email && <span style={{color:'red'}}>{errorObj.email}</span>}</span>

                   <br/>
                   <DialogActions>
                       <Button autoFocus onClick={handleClose} color="primary">
                           Cancel
                       </Button>
                       <Button type="submit" onClick={handleClose} color="primary">
                           Edit
                       </Button>
                   </DialogActions>
               </form>     
       </Dialog>
   </>
    )
}

export default CustomersListItem
