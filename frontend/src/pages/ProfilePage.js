import { useState, useRef } from "react"
import styled from "styled-components"
import { ArrowLeft, Edit, UserPlus, UserMinus, Upload } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  color: #F1F3F5;
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #F1F3F5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  
  &:hover {
    color: #1DFFA3;
  }
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #F1F3F5;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${(props) => props.color || "#7140EA"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 64px;
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
  width: 40px;
  height: 40px;
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
  font-size: 24px;
  font-weight: bold;
  color: #F1F3F5;
  margin-bottom: 10px;
`

const EditNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`

const NameInput = styled.input`
  background: #000000;
  border: 2px solid #495057;
  border-radius: 8px;
  padding: 10px 16px;
  color: #F1F3F5;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #1DFFA3;
  }
`

const Button = styled.button`
  background: #1DFFA3;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
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
]

function ProfilePage() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const fileInputRef = useRef(null)

  // 현재 보고 있는 사용자 정보 (URL 파라미터에 따라 결정)
  const user = users.find((u) => u.id === Number.parseInt(userId || "1")) || currentUser
  const isMyProfile = user.id === currentUser.id

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [profileImage, setProfileImage] = useState(user.image)

  // 친구 상태 (실제로는 API에서 가져와야 함)
  const [isFriend, setIsFriend] = useState(user.id !== currentUser.id)

  const handleBack = () => {
    navigate(-1)
  }

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

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>{isMyProfile ? "내 프로필" : `${user.name}님의 프로필`}</Title>
      </Header>

      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage color={user.color}>
            {profileImage ? <img src={profileImage || "/placeholder.svg"} alt="프로필 이미지" /> : user.name.charAt(0)}
          </ProfileImage>

          {isMyProfile && (
            <EditImageButton onClick={() => fileInputRef.current.click()}>
              <Upload size={20} />
            </EditImageButton>
          )}

          <FileInput type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
        </ProfileImageContainer>

        {isEditing ? (
          <EditNameContainer>
            <NameInput value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />
            <Button onClick={handleSaveClick}>저장</Button>
          </EditNameContainer>
        ) : (
          <>
            <ProfileName>{user.name}</ProfileName>

            {isMyProfile ? (
              <Button onClick={handleEditClick}>
                <Edit size={18} />
                프로필 수정
              </Button>
            ) : isFriend ? (
              <DangerButton onClick={handleFriendAction}>
                <UserMinus size={18} />
                친구 삭제
              </DangerButton>
            ) : (
              <Button onClick={handleFriendAction}>
                <UserPlus size={18} />
                친구 요청
              </Button>
            )}
          </>
        )}
      </ProfileContainer>
    </PageContainer>
  )
}

export default ProfilePage;
