package me.nrz.tappy.user.dto.response;

import lombok.Getter;
import me.nrz.tappy.user.entity.User;

@Getter
public class UserResponse {
    private final int id;
    private final String name;
    private final String profileImageUrl;

    public UserResponse(User user){
        this.id = user.getId();
        this.name = user.getName();
        this.profileImageUrl = user.getImage();
    }
}
