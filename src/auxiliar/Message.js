import React from 'react'

const Message = ({msg, bgcolor}) => {
    let styles ={
        padding:"1rem",
        margin: "20px",
        fontWeight:"bold",
        background:bgcolor,
    } 
  return (
    <div style={styles}>
        <p>{msg}</p>
    </div>
  )
}

export default Message