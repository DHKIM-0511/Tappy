import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #F1F3F5;
`;

function OAuthCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('AccessToken', 'Bearer ' + token);
      
      // 로그인 후 리다이렉트
      navigate('/rooms');
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <LoadingContainer>
      <p>로그인 처리 중...</p>
    </LoadingContainer>
  );
}

export default OAuthCallbackPage;