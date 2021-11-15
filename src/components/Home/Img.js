import React from 'react'
import { Button } from "@material-ui/core"
import { Link } from 'react-router-dom'
import './Img.css'

const Img = () => {
    return (
        <div className = "home" >
          <h1 className = "h1" > Billing Application </h1>
          <div className = "container">
          <video src = 'video-3.mp4' autoPlay loop muted />
          </div>

          <div className="button" >
                <Button variant="contained" color="secondary" >
                    <Link style={{color:'white',textDecoration:'none' , fontSize:"20px" }}to="/login">Get Started</Link> 
                </Button>
          </div>
       
        </div>
    )
}

export default Img
