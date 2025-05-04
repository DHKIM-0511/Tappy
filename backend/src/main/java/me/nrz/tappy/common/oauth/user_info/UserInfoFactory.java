package me.nrz.tappy.common.oauth.user_info;

import java.util.Map;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface UserInfoFactory {
    default UserInfo getUserInfo(OAuth2User oAuth2User) {
        validate(oAuth2User);
        return createUserInfo(oAuth2User.getAttributes());
    }

    UserInfo createUserInfo(Map<String, Object> oAuth2User);

    default void validate(OAuth2User oAuth2User) {
        if (oAuth2User == null) {
            throw new IllegalArgumentException("OAuth2User must not be null");
        }
        
        if (oAuth2User.getAttributes() == null || oAuth2User.getAttributes().isEmpty()) {
            throw new IllegalArgumentException("OAuth2User attributes are missing");
        }
        
        validateProvider(oAuth2User.getAttributes());
    }
    
    void validateProvider(Map<String, Object> oAuth2User);
}
