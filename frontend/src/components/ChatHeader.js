import { useState } from "react";
import styled from "styled-components";
import { Search, Menu, ArrowLeft, X, ArrowUp, ArrowDown } from "lucide-react";
import IconButton from "./IconButton";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 2px solid #495057;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #F1F3F5;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #F1F3F5;
  font-size: 16px;
  flex: 1;
  outline: none;
  
  &::placeholder {
    color: #6c757d;
  }
`;

const SearchNavigationButton = styled(IconButton)`
  color: ${props => props.disabled ? '#495057' : '#F1F3F5'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    color: ${props => props.disabled ? '#495057' : '#7140EA'};
  }
`;

const SearchInfo = styled.div`
  color: #7140EA;
  font-size: 14px;
  margin: 0 10px;
`;

/**
 * 채팅방 헤더 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 채팅방 제목
 * @param {Function} props.onToggleSidebar - 사이드바 토글 핸들러
 * @param {string} props.searchTerm - 검색어
 * @param {Function} props.onSearch - 검색 핸들러
 * @param {Function} props.onClearSearch - 검색 초기화 핸들러
 * @param {Function} props.onNextResult - 다음 검색 결과로 이동
 * @param {Function} props.onPrevResult - 이전 검색 결과로 이동
 * @param {number} props.searchResultsCount - 검색 결과 건수
 * @param {number} props.currentResultIndex - 현재 검색 결과 인덱스
 */
function ChatHeader({ 
  title, 
  onToggleSidebar, 
  searchTerm,
  onSearch,
  onClearSearch,
  onNextResult,
  onPrevResult,
  searchResultsCount,
  currentResultIndex
}) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const isSearching = searchTerm.length > 0 || isSearchMode;
  
  return (
    <HeaderContainer>
      {isSearching ? (
        <SearchContainer>
          <IconButton onClick={() => {
            onClearSearch();
            setIsSearchMode(false);
          }}>
            <ArrowLeft size={20} />
          </IconButton>
          <SearchInput 
            placeholder="채팅 내용 검색..." 
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)} 
            autoFocus 
          />
          <SearchInfo>
            {searchResultsCount > 0 ? `${currentResultIndex + 1}/${searchResultsCount}` : '0 결과'}
          </SearchInfo>
          <SearchNavigationButton 
            onClick={onPrevResult} 
            disabled={searchResultsCount === 0}
            title="이전 결과"
          >
            <ArrowUp size={20} />
          </SearchNavigationButton>
          <SearchNavigationButton 
            onClick={onNextResult} 
            disabled={searchResultsCount === 0}
            title="다음 결과"
          >
            <ArrowDown size={20} />
          </SearchNavigationButton>
          <IconButton onClick={() => {
            onClearSearch();
            setIsSearchMode(false);
          }}>
            <X size={20} />
          </IconButton>
        </SearchContainer>
      ) : (
        <>
          <Title>{title}</Title>
          <HeaderButtons>
            <IconButton 
              onClick={() => setIsSearchMode(true)} 
              title="검색"
            >
              <Search size={20} />
            </IconButton>
            <IconButton onClick={onToggleSidebar} title="참여자 목록">
              <Menu size={20} />
            </IconButton>
          </HeaderButtons>
        </>
      )}
    </HeaderContainer>
  );
}

export default ChatHeader;
