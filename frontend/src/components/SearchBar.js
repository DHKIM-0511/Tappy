import styled from "styled-components";
import { Search } from "lucide-react";

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #000000;
  border: 2px solid #495057;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: ${(props) => props.marginBottom || "20px"};
  gap: 8px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #F1F3F5;
  font-size: 14px;
  width: 100%;
  outline: none;
  
  &::placeholder {
    color: #6c757d;
  }
`;

/**
 * 검색바 컴포넌트
 * @param {Object} props
 * @param {string} props.placeholder - 검색창 플레이스홀더
 * @param {string} props.value - 검색창 값
 * @param {Function} props.onChange - 값 변경 이벤트 핸들러
 * @param {string} [props.marginBottom] - 하단 마진 (CSS 값)
 */
function SearchBar({ placeholder, value, onChange, marginBottom }) {
  return (
    <Container marginBottom={marginBottom}>
      <Search size={16} color="#6c757d" />
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </Container>
  );
}

export default SearchBar;