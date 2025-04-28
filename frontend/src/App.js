import React from 'react';
import { createGlobalStyle  } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RoomListPage from './pages/RoomListPage';

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
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>} />
          <Route path="/rooms" element={<RoomListPage></RoomListPage>} />
        </Routes>
    </>
  );
}

export default App;