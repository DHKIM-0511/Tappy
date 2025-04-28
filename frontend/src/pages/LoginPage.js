import React from 'react';
import Box from '../components/Box';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const socialButtonStyles = css`
  width: 100%;
  max-width: 400px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 10px 0;
  border: none;
  padding: 0 16px;
  position: relative;
  text-align: center;
`;

const SocialButton = styled.button`
  ${socialButtonStyles}
`;

const GoogleButton = styled(SocialButton)`
  background-color: white;
  color: #757575;
  border: 1px solid #dadce0;
  
  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
`;

const NaverButton = styled(SocialButton)`
  background-color: #03C75A;
  color: white;
  
  &:hover {
    background-color: #02b350;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
`;

const ButtonIcon = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.span`
  flex: 1;
`;

const GoogleIcon = () => (
  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const NaverIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5615 10.704L6.14588 0H0V20H6.43845V9.296L13.8541 20H20V0H13.5615V10.704Z" fill="white" />
  </svg>
);

const ProjectTitle = styled.div`
  font-size: 2.8rem;
  font-weight: 900;
  color: #1DFFA3;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 64px;
  font-family: 'Noto Sans KR', sans-serif;
`;

function LoginPage({ children }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/rooms');
  };

  return (
    <>
      <ProjectTitle>Tappy</ProjectTitle>
      <Box background='#000000' color='#1DFFA3' margin='64px auto 32px'>
        <div style={{ textAlign: 'center', marginBottom: '58px' }}><h1>로그인</h1></div>
        {children}
        <GoogleButton onClick={handleLogin}>
          <ButtonIcon>
            <GoogleIcon />
          </ButtonIcon>
          <ButtonText>Google로 계속하기</ButtonText>
        </GoogleButton>

        <NaverButton onClick={handleLogin}>
          <ButtonIcon>
            <NaverIcon />
          </ButtonIcon>
          <ButtonText>네이버로 계속하기</ButtonText>
        </NaverButton>
      </Box>
    </>
  );
}

export default LoginPage;