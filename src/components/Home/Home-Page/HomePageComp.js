import React from 'react'
import ImageComp from './ImageComp'
import TextComp from './TextComp'
import { Grid } from '@material-ui/core'

const HomePageComp = (props) => {

    return (
        <div>
            <Grid container >
                <Grid item xs = {6} >
                    <TextComp/>
                </Grid>

                <Grid item xs = {6} >
                    <ImageComp/>
                    </Grid>
    

            </Grid>
        </div>
    )
}

export default HomePageComp
