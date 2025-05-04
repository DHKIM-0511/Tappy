package me.nrz.tappy.user.controller;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.user.service.UserService;

@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

}
