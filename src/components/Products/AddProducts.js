import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Typography } from '@material-ui/core'
import ProductsForm from './ProductsForm'
import { addProductsAction } from '../../REDUX/Actions/productsActions'

const AddProducts = (props) => {

    const [isSaved,setIsSaved]=useState(false)

    const dispatch=useDispatch()
    const formSubmission=(formData)=>{
        const successMessage=()=>{
             Swal.fire({
                 'text':'Product added successfully',
                 'icon':"success"
             })
        }
        const setResetFormHandle=()=>{
            setIsSaved(true)
        }
        dispatch(addProductsAction(formData,successMessage,setResetFormHandle))   
    }
    const toggleStatus=()=>{
        setIsSaved(!isSaved)
    }

    return (
        <div >
            <Typography variant="h5">Add Product</Typography>
    <ProductsForm formSubmission={formSubmission} toggleStatus={toggleStatus} isSaved={isSaved} />
    </div>
    )
}

export default AddProducts
