import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import backgroundMusic from './audio/bg.mp3'; // Đường dẫn tới file nhạc nền
import Home from './page/Home';
import Intro from './page/Intro';
import Success from './page/Success';

function App() {
  const [audio] = useState(new Audio(backgroundMusic)); // Tạo đối tượng âm thanh
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Trạng thái để kiểm tra nhạc

  const startMusic = () => {
    if (!isMusicPlaying) {
      audio.play().then(() => {
        setIsMusicPlaying(true);
        console.log("Nhạc nền bắt đầu phát!");
      }).catch((error) => {
        console.error("Không thể phát nhạc tự động:", error);
      });

      // Lặp lại nhạc nền
      audio.loop = true;
    }
  };

  useEffect(() => {
    return () => {
      audio.pause(); // Dừng phát nhạc khi component bị unmount
    };
  }, [audio]);

  return (
    <Routes>
      <Route path="/" element={<Intro startMusic={startMusic} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
