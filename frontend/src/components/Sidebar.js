import { useState } from "react";
import styled from "styled-components";
import { Plus } from "lucide-react";
import IconButton from "./IconButton";
import SearchBar from "./SearchBar";
import FriendItem from "./FriendItem";

const SidebarContainer = styled.div`
  width: ${(props) => props.width || "320px"};
  background: #000000;
  border-left: 2px solid #495057;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #F1F3F5;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
`;

/**
 * 사이드바 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 사이드바 제목
 * @param {Array} props.items - 표시할 아이템 배열
 * @param {Function} props.onAddClick - + 버튼 클릭 이벤트 핸들러
 * @param {Function} props.onSearch - 검색 이벤트 핸들러
 * @param {string} props.searchPlaceholder - 검색창 플레이스홀더
 * @param {string} [props.width] - 사이드바 너비 (CSS 값)
 * @param {Function} [props.renderItem] - 아이템 렌더링 함수 (기본값: FriendItem)
 */
function Sidebar({ title, items, onAddClick, onSearch, searchPlaceholder, width, renderItem }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  }

  return (
    <SidebarContainer width={width}>
      <Header>
        <Title>{title}</Title>
        <IconButton type="add" onClick={onAddClick}>
          <Plus size={20} />
        </IconButton>
      </Header>

      <SearchBar placeholder={searchPlaceholder} value={searchTerm} onChange={handleSearch} />

      <List>{items.map((item) => (renderItem ? renderItem(item) : <FriendItem key={item.id} friend={item} />))}</List>
    </SidebarContainer>
  );
}

export default Sidebar;
