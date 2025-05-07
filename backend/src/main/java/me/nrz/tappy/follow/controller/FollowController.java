package me.nrz.tappy.follow.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import me.nrz.tappy.follow.dto.request.FollowRequest;
import me.nrz.tappy.follow.service.FollowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping()
    ResponseEntity<Void> followUser(@RequestBody FollowRequest followRequest){
        followService.followUser(followRequest);
        return ResponseEntity.ok().build();
    }
}
