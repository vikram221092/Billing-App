import React , { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillsAction } from '../../REDUX/Actions/billsActions'
import BillForm from './BillForm'
import Swal from 'sweetalert2'

const AddBill = ({ customers , products }) => {

    const dispatch=useDispatch()
    const [isSaved,setIsSaved]=useState(false)

    const formSubmission=(formData)=>{
        
        const successMessage=()=>{
            Swal.fire({
                icon: 'success',
                title: 'Added Successfully',
            })
        }
        
       const formSaved=()=>{
           setIsSaved(true)
       }  
       dispatch(addBillsAction(formData,formSaved,successMessage))  
    }
    const resetForm=()=>{
        setIsSaved(!isSaved)
    }

    return (
        <div style={{margin:'40px'}}>
        <BillForm customers={customers} products={products} formSubmission={formSubmission} resetForm={resetForm} isSaved={isSaved}/>
        </div>
    )
}

export default AddBill
