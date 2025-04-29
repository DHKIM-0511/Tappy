import React from 'react';
import { createGlobalStyle  } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoomListPage from './pages/RoomListPage';
import ChatRoomPage from './pages/ChatRoomPage';
import { ProfileModalProvider } from './contexts/ProfileModalContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #141517;
    margin: 0;
    padding: 0;
  }
`
function App() {
  return (
    <>
      <GlobalStyle /> 
      <ProfileModalProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/rooms" element={<RoomListPage />} />
          <Route path="/chat/:roomId" element={<ChatRoomPage />} />
        </Routes>
      </ProfileModalProvider>
    </>
  );
}

export default App;