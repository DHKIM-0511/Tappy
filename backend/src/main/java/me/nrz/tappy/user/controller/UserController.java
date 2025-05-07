package me.nrz.tappy.user.controller;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.user.dto.response.UserResponse;
import me.nrz.tappy.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    ResponseEntity<UserResponse> getUserInfo(@PathVariable int id){
        return ResponseEntity.ok(userService.getUserInfo(id));
    }

    @GetMapping
    ResponseEntity<UserResponse> searchUser(@RequestParam String name){
        return ResponseEntity.ok(userService.searchUser(name));
    }
}
