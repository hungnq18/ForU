import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import applauseSound from '../audio/applause.mp3';
import clickSound from '../audio/click.mp3'; // Âm thanh nhấn nút
import explosionSound from '../audio/explosion.mp3'; // Âm thanh nổ tung
import '../css/airplane.css';
import airplanePilotImage from '../img/airplane_pilot.png'; // Ảnh phi công ngồi trên máy bay

function Airplane() {
  const [energy, setEnergy] = useState(0);
  const [airplanePosition, setAirplanePosition] = useState(0);
  const [airplaneFlyUp, setAirplaneFlyUp] = useState(false);
  const [note, setNote] = useState('');
  const [showHelpMessage, setShowHelpMessage] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showCongratulatoryMessage, setShowCongratulatoryMessage] = useState(false);
  const navigate = useNavigate();
  const phrases = [
    "❤️ Cố lên! Bạn đang giúp tôi rất nhiều!",
    "🚀 Máy bay chuẩn bị cất cánh!",
    "🌟 Cảm ơn bạn, phi công rất vui!",
    "💪 Bạn là người hùng của tôi!",
    "✈️ Chút nữa thôi, máy bay sắp bay lên trời rồi!",
    "Một chút nữa thôi, cô gái xinh đẹp!",
    "Điểm đến của chúng ta là sự hạnh phúc"
  ];

  // Hiển thị dòng chữ "Giúp tôi với" sau 5 giây nếu người chơi không tương tác
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpMessage(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleTakeoff = () => {
    // Kiểm tra năng lượng để quyết định cách bay
    if (energy > 99) {
      setAirplaneFlyUp(true);
      playSound(applauseSound); // Phát âm thanh vỗ tay
      setShowCongratulatoryMessage(true); // Hiển thị thông điệp chúc mừng

      setTimeout(() => {
        alert('Cất cánh thành công!');
        navigate('/success'); // Chuyển hướng sang trang thành công
      }, 2000);
    } else {
      // Khi năng lượng dưới 60%, phát âm thanh nổ và hiển thị thông điệp
      setShowExplosion(true);
      playSound(explosionSound); // Phát âm thanh nổ tung
      setNote('⏳ Sống là không vội ní ơi =)))'); // Hiển thị thông điệp
      setTimeout(() => {
        setShowExplosion(false);
      }, 2000);
    }
  };

  const increaseEnergy = () => {
    setEnergy(prevEnergy => Math.min(prevEnergy + 5, 100)); // Tăng 10% năng lượng mỗi lần nhấn nút
    setAirplanePosition(prev => Math.min(prev + 5, 100)); // Di chuyển máy bay theo phần trăm năng lượng

    // Chọn một câu ngẫu nhiên từ danh sách
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setNote(randomPhrase);
    playSound(clickSound); // Phát âm thanh nhấn nút

    // Nếu năng lượng đạt 100%, máy bay sẽ bay lên
    if (energy + 10 >= 100) {
      setAirplaneFlyUp(true); // Khi năng lượng đạt 100%, máy bay sẽ bay lên
      setTimeout(() => {
        alert('Máy bay đã đạt 100%! Cất cánh!');
        playSound(applauseSound, 0.7); // Phát âm thanh vỗ tay
        setShowCongratulatoryMessage(true); // Hiển thị thông điệp chúc mừng
        navigate('/success'); // Chuyển hướng sang trang thành công
      }, 2000);
    }
  };

  const handleNoHelpClick = () => {
    // Lấy kích thước của cửa sổ
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Tạo vị trí ngẫu nhiên cho nút
    const randomX = Math.random() * (windowWidth - 100);
    const randomY = Math.random() * (windowHeight - 50);

    // Cập nhật vị trí cho nút không giúp
    const noHelpButton = document.querySelector('.no-help-button');
    noHelpButton.style.position = 'absolute';
    noHelpButton.style.left = `${randomX}px`;
    noHelpButton.style.top = `${randomY}px`;

    playSound(clickSound); // Phát âm thanh nhấn nút khi không giúp
  };

  return (
    <div className="airplane-container">
      <h1>Bạn hãy giúp phi công này chinh phục máy bay và bầu trời nhaaaa !!!</h1>
      <div className="pilot-gif">
        <a src="../img/airplane.jpg" alt="Cute Pilot" />
      </div>
      <div className="buttons-container">
        <button className="help-button" onClick={increaseEnergy}>Giúp</button>
        <button className="no-help-button" onClick={handleNoHelpClick}>
          Không giúp
        </button>
      </div>
      <button className="takeoff-button" onClick={handleTakeoff}>
        Cất cánh
      </button>

      <div className="energy-container">
        <div className="energy-bar" style={{ width: `${energy}%` }} />

        <div
          className={`airplane ${airplaneFlyUp ? 'fly-up' : ''}`} 
          style={{
            left: `${airplanePosition}%`,
            transition: 'left 1s ease',
          }}
        >
          <img src={airplanePilotImage} alt="Airplane with Pilot" className="airplane-icon" />
        </div>
      </div>

      {note && <div className="cute-note">{note}</div>}
      
      {showHelpMessage && !note && (
        <div className="help-message">
          ⏳ Giúp tôi với, phi công cần bạn!
        </div>
      )}

      {showExplosion && (
        <div className="explosion">
          💥 BOOM! 💥
        </div>
      )}

      {showCongratulatoryMessage && (
        <div className="congratulations">
          🎉 Cất cánh thành công! 👩‍✈️❤️ 🎉
        </div>
      )}
    </div>
  );
}

export default Airplane;
