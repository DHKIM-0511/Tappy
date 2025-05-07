package me.nrz.tappy.user.service;

import me.nrz.tappy.user.dto.response.UserResponse;

public interface UserService {

    UserResponse getUserInfo(int id);
}
