package me.nrz.tappy.follow.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.nrz.tappy.follow.dto.request.FollowRequest;
import me.nrz.tappy.follow.dto.response.FollowersResponse;
import me.nrz.tappy.follow.service.FollowService;
import me.nrz.tappy.user.dto.response.UserResponse;
import me.nrz.tappy.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping
    ResponseEntity<Void> followUser(@RequestBody FollowRequest followRequest){
        followService.followUser(followRequest);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/break")
    ResponseEntity<Void> breakFollow(@RequestBody FollowRequest followRequest){
        followService.breakFollow(followRequest);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    ResponseEntity<FollowersResponse>getFollowers(
        @AuthenticationPrincipal User loginUser,
        @PageableDefault(size = 30, sort = "name")Pageable pageable
    ){
        return ResponseEntity.ok(followService.getFollowers(loginUser, pageable));
    }
}
