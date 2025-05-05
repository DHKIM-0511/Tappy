const API_BASE_URL = 'http://localhost:8080';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('AccessToken');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  
  if (token) {
    defaultOptions.headers.Authorization = token;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  });
  
  if (response.status === 401) {
    // 토큰 만료 - 갱신 시도
    const refreshed = await refreshToken();
    if (refreshed) {
      // 새 토큰으로 재시도
      return fetchWithAuth(endpoint, options);
    } else {
      // 토큰 갱신 실패
      localStorage.removeItem('AccessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
      throw new Error('인증이 만료되었습니다.');
    }
  }
  
  return response;
};

// 토큰 갱신 함수
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) throw new Error('토큰 갱신 실패');
    
    const data = await response.json();
    localStorage.setItem('AccessToken', `Bearer ${data.accessToken}`);
    localStorage.setItem('RefreshToken', data.refreshToken);
    return true;
  } catch (error) {
    console.error('토큰 갱신 중 오류 발생:', error);
    return false;
  }
};

// 로그아웃 함수
export const logout = async () => {
  const token = localStorage.getItem('AccessToken');
  if (!token) return;
  
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ accessToken: token.replace('Bearer ', '') }),
    });
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
  } finally {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    window.location.href = '/';
  }
};