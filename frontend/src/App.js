import React from 'react';
import { createGlobalStyle  } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

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
          <Route path="/" element={<LoginPage><h1>로그인</h1></LoginPage>} />
        </Routes>
    </>
  );
}

export default App;