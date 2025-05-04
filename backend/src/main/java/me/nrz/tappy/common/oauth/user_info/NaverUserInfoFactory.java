package me.nrz.tappy.common.oauth.user_info;

import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class NaverUserInfoFactory implements UserInfoFactory {

    @Override
    public UserInfo createUserInfo(Map<String, Object> attribute) {
        Map<Object, Object> att = (Map)attribute.get("response");
        String id = att.get("id").toString();
        String name = att.get("name").toString();
        String image = att.get("profile_image").toString();

        return new NaverUserInfo(id, name, image);
    }

    @Override
    public void validateProvider(Map<String, Object> attribute) {
        Map<Object, Object> att = (Map)attribute.get("response");
        if (!StringUtils.hasText(att.get("id").toString()) ||
            !StringUtils.hasText(att.get("name").toString()) ||
            !StringUtils.hasText(att.get("profile_image").toString())){

            throw new IllegalArgumentException("Required fields from OAuth2 provider are missing");
        }
    }
}
