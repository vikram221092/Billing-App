import React from 'react'
import { TableRow , TableCell , Button } from '@material-ui/core'

const CartItem = ({id,quantity,product,products,decrementQuantity,incrementQuantity,removeItem}) => {
   
    const getProduct=()=>{
        if(product.length!==0){
           const result=products.find((ele)=>{
               return ele._id===product
           })
           return result
       }
     }

     const handleIncrement=(id)=>{
        incrementQuantity(id)
     }
     const handleDecrement=(id)=>{
        decrementQuantity(id)
     }
     const removeHandle=(id)=>{
        removeItem(id)
     }

    return (
        <>
        <TableRow>
                <TableCell>
                    {getProduct(product).name}
                </TableCell>
                <TableCell>
                {getProduct(product).price * Number(quantity)}
                </TableCell>
                <TableCell>     
                        <button disabled={quantity <=1} style={{margin:'3px'}} onClick={()=>handleDecrement(id)} > - </button> 
                        {quantity} 
                        <button style={{margin:'2px'}} onClick={()=>handleIncrement(id)} > + </button>
                </TableCell>
                <TableCell>
                        <Button onClick={()=>removeHandle(id)}>Remove</Button>
                </TableCell>
        </TableRow>
    </>
    )
}

export default CartItem
