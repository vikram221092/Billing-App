import React from 'react'
import { Typography } from '@material-ui/core'

const TabsComponent = ({allCustomers,allBills,allProducts}) => {

    const style={
        marginTop:'40px'
    }

    return (
       <>
        <div style = {style} >
                    <Typography variant="h4" component="h2">    
                        Dashboard Details
                    </Typography>
            <br/>
        </div>
       </>
    )
}

export default TabsComponent
