package me.nrz.tappy.user.service;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.user.dto.response.UserResponse;
import me.nrz.tappy.user.entity.User;
import me.nrz.tappy.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public UserResponse getUserInfo(int id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 입니다."));

        return new UserResponse(user);
    }
}
