package me.nrz.tappy.common.oauth.user_info;


public class GoogleUserInfo extends UserInfo{
    public GoogleUserInfo(String providerId, String name, String profileImageUrl) {
        super("google", providerId, name, profileImageUrl);
    }
}
