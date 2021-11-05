import React from 'react'

const style={
    objectFit: 'cover',
    width:'100%',
    opacity:'0.8',
}

const HomePageComp = (props) => {

    return (
        <div>
            <img src = './bg.jpg' style={style} alt=" not found"  />
        </div>
    )
}

export default HomePageComp
