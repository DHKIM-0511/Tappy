package me.nrz.tappy.common.oauth.user_info;

import me.nrz.tappy.user.entity.User;

public class NaverUserInfo extends UserInfo {
    public NaverUserInfo(String providerId, String name, String profileImageUrl){
        super("naver", providerId, name, profileImageUrl);
    }
}
