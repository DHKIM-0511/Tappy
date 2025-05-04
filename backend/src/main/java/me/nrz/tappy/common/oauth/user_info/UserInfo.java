package me.nrz.tappy.common.oauth.user_info;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserInfo {
    private String provider;
    private String providerId;
    private String name;
    private String profileImageUrl;
    
    public UserInfo(String provider, String providerId, String name, String profileImageUrl) {
        this.provider = provider;
        this.providerId = providerId;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
    }
}
