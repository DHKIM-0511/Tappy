package me.nrz.tappy.follow.service;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.follow.dto.request.FollowRequest;
import me.nrz.tappy.follow.dto.response.FollowersResponse;
import me.nrz.tappy.follow.entity.Follow;
import me.nrz.tappy.follow.repository.FollowRepository;
import me.nrz.tappy.user.entity.User;
import me.nrz.tappy.user.repository.UserRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{

    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Override
    @Transactional
    public void followUser(FollowRequest followRequest) {
        User fromUser = userRepository.findById(followRequest.getFrom())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User toUser = userRepository.findById(followRequest.getTo())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        followRepository.findByFromAndTo(fromUser, toUser)
            .ifPresentOrElse(
                Follow::restoreFollow,
                () -> followRepository.save(new Follow(fromUser, toUser))
            );
    }

    @Override
    @Transactional
    public void breakFollow(FollowRequest followRequest) {
        User fromUser = userRepository.findById(followRequest.getFrom())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        User toUser = userRepository.findById(followRequest.getTo())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        followRepository.findByFromAndTo(fromUser, toUser)
            .orElseThrow(() -> new IllegalArgumentException("Follow not Found"))
            .breakFollow();
    }

    @Override
    public FollowersResponse getFollowers(User user, Pageable pageable) {
        return new FollowersResponse(userRepository.findAllByUser(user, pageable));
    }
}
