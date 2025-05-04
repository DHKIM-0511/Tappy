package me.nrz.tappy.common.oauth.user_info;

import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class GoogleUserInfoFactory implements UserInfoFactory {

    @Override
    public UserInfo createUserInfo(Map<String, Object> attribute) {
        String sub = attribute.get("sub").toString();
        String name = attribute.get("name").toString();
        String picture = attribute.get("picture").toString();

        return new GoogleUserInfo(sub, name, picture);
    }

    @Override
    public void validateProvider(Map<String, Object> attribute) {
        if (!StringUtils.hasText(attribute.get("sub").toString()) ||
            !StringUtils.hasText(attribute.get("name").toString()) ||
            !StringUtils.hasText(attribute.get("picture").toString())){

            throw new IllegalArgumentException("Required fields from OAuth2 provider are missing");
        }
    }
}
