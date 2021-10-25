import React from 'react'

const ImageComp = (props) => {

    const style={
        objectFit: 'cover',
        width:'100%',
        opacity:'0.5',
    }
    return (
        <div>
            <img src = './bg.jpg' style={style} alt=" not found" />
        </div>
    )
}

export default ImageComp
