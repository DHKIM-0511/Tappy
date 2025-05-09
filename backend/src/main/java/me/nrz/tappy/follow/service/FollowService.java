package me.nrz.tappy.follow.service;

import me.nrz.tappy.follow.dto.request.FollowRequest;
import me.nrz.tappy.follow.dto.response.FollowersResponse;
import me.nrz.tappy.user.dto.response.UserResponse;
import me.nrz.tappy.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FollowService {
    void followUser(FollowRequest followRequest);

    void breakFollow(FollowRequest followRequest);

    FollowersResponse getFollowers(User user, Pageable pageable);
}
