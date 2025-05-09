package me.nrz.tappy.user.service;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.user.dto.response.UserResponse;
import me.nrz.tappy.user.entity.User;
import me.nrz.tappy.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public UserResponse getUserInfo(int id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new UserResponse(user);
    }

    @Override
    public UserResponse searchUser(String name) {
        if(!StringUtils.hasText(name))
            throw new IllegalArgumentException("Search keyword is must not be null or blank");

        User user = userRepository.findByName(name)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new UserResponse(user);
    }
}
