import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { X, Edit, UserPlus, UserMinus, Upload } from "lucide-react"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: #141517;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
  animation: fadeIn 0.3s;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @media (min-width: 768px) {
    width: 400px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #F1F3F5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #1DFFA3;
  }
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #F1F3F5;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${(props) => props.color || "#7140EA"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: bold;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const EditImageButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1DFFA3;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000000;
  
  &:hover {
    background: #19e090;
  }
`

const ProfileName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #F1F3F5;
  margin-bottom: 10px;
`

const EditNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`

const NameInput = styled.input`
  background: #000000;
  border: 2px solid #495057;
  border-radius: 8px;
  padding: 10px 16px;
  color: #F1F3F5;
  font-size: 16px;
  outline: none;
  flex: 1;
  
  &:focus {
    border-color: #1DFFA3;
  }
`

const Button = styled.button`
  background: #1DFFA3;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #19e090;
    transform: translateY(-2px);
  }
`

const DangerButton = styled(Button)`
  background: #E02020;
  color: white;
  
  &:hover {
    background: #c51818;
  }
`

const FileInput = styled.input`
  display: none;
`

// 샘플 데이터
const currentUser = { id: 1, name: "나", color: "#1DFFA3", image: null }
const users = [
  { id: 1, name: "나", color: "#1DFFA3", image: null },
  { id: 2, name: "김민수", color: "#7140EA", image: null },
  { id: 3, name: "이지은", color: "#EDFA19", image: null },
  { id: 4, name: "박준호", color: "#E02020", image: null },
  { id: 5, name: "최유진", color: "#EDFA19", image: null },
  { id: 6, name: "정승환", color: "#7140EA", image: null },
]

/**
 * 프로필 모달 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Function} props.onClose - 모달 닫기 핸들러
 * @param {string|number} props.userId - 사용자 ID
 */
function ProfileModal({ isOpen, onClose, userId }) {
  const fileInputRef = useRef(null)

  // 현재 보고 있는 사용자 정보
  const user = users.find((u) => u.id === Number(userId)) || currentUser
  const isMyProfile = user.id === currentUser.id

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [profileImage, setProfileImage] = useState(user.image)

  // 친구 상태 (실제로는 API에서 가져와야 함)
  const [isFriend, setIsFriend] = useState(user.id !== currentUser.id)
  
  // 모달이 열릴 때마다 사용자 정보 초기화
  useEffect(() => {
    if (isOpen) {
      const foundUser = users.find((u) => u.id === Number(userId)) || currentUser
      setName(foundUser.name)
      setProfileImage(foundUser.image)
      setIsEditing(false)
      setIsFriend(foundUser.id !== currentUser.id)
    }
  }, [isOpen, userId])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    // 실제로는 API 호출하여 저장
    console.log("저장된 정보:", { name, profileImage })
    setIsEditing(false)
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleFriendAction = () => {
    // 실제로는 API 호출하여 친구 추가/삭제
    setIsFriend(!isFriend)
    console.log(isFriend ? "친구 삭제됨" : "친구 요청 보냄")
  }

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Header>
          <Title>{isMyProfile ? "내 프로필" : `${user.name}님의 프로필`}</Title>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>

        <ProfileContainer>
          <ProfileImageContainer>
            <ProfileImage color={user.color}>
              {profileImage ? <img src={profileImage || "/placeholder.svg"} alt="프로필 이미지" /> : user.name.charAt(0)}
            </ProfileImage>

            {isMyProfile && (
              <EditImageButton onClick={() => fileInputRef.current.click()}>
                <Upload size={16} />
              </EditImageButton>
            )}

            <FileInput type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
          </ProfileImageContainer>

          {isEditing ? (
            <EditNameContainer>
              <NameInput 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="이름을 입력하세요" 
                autoFocus
              />
              <Button onClick={handleSaveClick}>저장</Button>
            </EditNameContainer>
          ) : (
            <>
              <ProfileName>{user.name}</ProfileName>

              {isMyProfile ? (
                <Button onClick={handleEditClick}>
                  <Edit size={16} />
                  프로필 수정
                </Button>
              ) : isFriend ? (
                <DangerButton onClick={handleFriendAction}>
                  <UserMinus size={16} />
                  친구 삭제
                </DangerButton>
              ) : (
                <Button onClick={handleFriendAction}>
                  <UserPlus size={16} />
                  친구 요청
                </Button>
              )}
            </>
          )}
        </ProfileContainer>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default ProfileModal
