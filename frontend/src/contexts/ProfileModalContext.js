import { createContext, useState, useContext } from 'react'
import ProfileModal from '../components/ProfileModal'

const ProfileModalContext = createContext()

/**
 * 프로필 모달 컨텍스트 제공자
 * @param {Object} props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 */
export function ProfileModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  // 프로필 모달 열기
  const openProfileModal = (id) => {
    setUserId(id)
    setIsOpen(true)
  }

  // 프로필 모달 닫기
  const closeProfileModal = () => {
    setIsOpen(false)
  }

  return (
    <ProfileModalContext.Provider
      value={{
        openProfileModal,
        closeProfileModal
      }}
    >
      {children}
      <ProfileModal 
        isOpen={isOpen} 
        onClose={closeProfileModal} 
        userId={userId} 
      />
    </ProfileModalContext.Provider>
  )
}

/**
 * 프로필 모달 컨텍스트 훅
 * @returns {Object} profileModal context
 */
export function useProfileModal() {
  const context = useContext(ProfileModalContext)
  if (!context) {
    throw new Error('useProfileModal must be used within a ProfileModalProvider')
  }
  return context
}
