package me.nrz.tappy.follow.service;

import me.nrz.tappy.follow.dto.request.FollowRequest;

public interface FollowService {
    void followUser(FollowRequest followRequest);
}
