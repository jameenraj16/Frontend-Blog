import React from 'react'
import { useNavigate } from 'react-router-dom';


const Deleted = () => {
    const containerStyle = {
        textAlign: 'center',
        marginTop: '50px',
      };
    
      const messageStyle = {
        fontSize: '18px',
        marginBottom: '20px',
      };
    
      const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };
    
const navigate = useNavigate()
    const handleOkClick = () => {
        navigate("/blogs")
  };

  return (
    <div style={containerStyle}>
      <p style={messageStyle}>Your Blog is Deleted</p>
      <button style={buttonStyle} onClick={handleOkClick}>
        OK
      </button>
    </div>
  );
};

export default Deleted