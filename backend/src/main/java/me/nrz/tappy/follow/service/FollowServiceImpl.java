package me.nrz.tappy.follow.service;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.follow.dto.request.FollowRequest;
import me.nrz.tappy.follow.entity.Follow;
import me.nrz.tappy.follow.repository.FollowRepository;
import me.nrz.tappy.user.entity.User;
import me.nrz.tappy.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Override
    public void followUser(FollowRequest followRequest) {
        User fromUser = userRepository.findById(followRequest.getFrom())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User toUser = userRepository.findById(followRequest.getFrom())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        followRepository.save(new Follow(fromUser, toUser));
    }
}
