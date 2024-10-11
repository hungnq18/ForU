import React, { useState } from 'react';
import Heart from 'react-heart';
import { useNavigate } from 'react-router';
import '../css/intro.css';

function Intro({ startMusic }) {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý khi nhấn nút Play
  const handlePlayClick = () => {
    startMusic();  // Phát nhạc
    navigate('/home');  // Sau đó chuyển hướng đến trang Home
  };

  return (
    <div className="bg">
      <div className="title">
      </div>
      <div className="intro">
        <div className="intro-text">
          <p>
            Hi! cùng chơi một trò chơi nhỏ nhaa!!!
            <br />
            <div style={{ textAlign: 'center' }}>   
              <span style={{ color: 'red' }}>
                I wish you happy with the game{' '}
                <span style={{ display: 'inline-block', verticalAlign: 'middle', width: '1rem' }}>
                  <Heart isActive={active} onClick={() => setActive(!active)} />
                </span>
                .
              </span>
            </div>
          </p>
          {/* Gọi hàm handlePlayClick khi nhấn nút Play */}
          <button onClick={handlePlayClick}>Play</button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
