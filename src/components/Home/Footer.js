import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt,FaMailBulk } from 'react-icons/fa'

const Footer = (props) => {
    return (
        <div style = {{backgroundColor:"black" , display:"flex" , alignItems:"center" , marginTop:"40px",marginBottom:"20px" , position:"static"}} >
            <div style = {{alignItems:"flex-start"}}>
            <h6  style = {{color:"white" ,  marginLeft:"64px" , marginTop:'16px' , padding:"10px", fontSize:"24px"}} >Contact Detail</h6>
            <p style = {{color:"white" ,  marginLeft:"64px" , padding:"5px", fontSize:"16px"}} ><FaPhoneAlt /> 9590022344</p>
                <p style = {{color:"white" , marginLeft:"64px",marginBottom:'20px' , padding:'5px', fontSize:"16px" }} ><FaMailBulk/> vikramscvicky@gmail.com</p>
                </div>
                <div style = {{alignItems:"flex-end"}} >
                <h6  style = {{color:"white" ,  marginLeft:"800px" , padding:"10px", fontSize:"24px"}}  >Follow Us</h6>
                <  FaInstagram  style = {{color:"white" ,  marginLeft:"780px" , padding:"10px", fontSize:"22px"}}  />
                <FaFacebookF  style = {{color:"white" ,  marginLeft:"20px" , padding:"10px", fontSize:"22px"}}  />
                <FaTwitter  style = {{color:"white" ,  marginLeft:"20px" , padding:"10px", fontSize:"22px"}}  />
                </div>
            </div>
    )
}

export default Footer