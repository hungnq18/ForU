import React from 'react';
import { useNavigate } from 'react-router';
import '../css/sucess.css';
function Success() {
    const navigate = useNavigate();
  return (
    <div className="success">
      <div className="title">
      </div>
      <div className="intro">
        <div className="intro-text">
          <p>
            giúp phi công thêm một việc nữa nhaaaa !!!
          </p>
          <a href = "https://forms.gle/VZJgdm1DLoXyJauw5" >Giúp tiếp phi công</a>
          <button onClick={() => navigate('/')}>Play again</button>
        </div>
      </div>
    </div>
  )
}

export default Success
