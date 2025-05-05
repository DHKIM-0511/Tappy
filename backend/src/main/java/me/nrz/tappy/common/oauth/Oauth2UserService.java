package me.nrz.tappy.common.oauth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.nrz.tappy.common.oauth.user_info.GoogleUserInfoFactory;
import me.nrz.tappy.common.oauth.user_info.NaverUserInfoFactory;
import me.nrz.tappy.common.oauth.user_info.UserInfo;
import me.nrz.tappy.common.oauth.user_info.UserInfoFactory;
import me.nrz.tappy.user.entity.User;
import me.nrz.tappy.user.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class Oauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String provider = userRequest.getClientRegistration().getRegistrationId();
        OAuth2User loginUser = super.loadUser(userRequest);
        
        UserInfoFactory factory = getUserInfoFactory(provider);
        UserInfo userInfo = factory.getUserInfo(loginUser);
        
        User user = userRepository.findByProviderId(userInfo.getProviderId())
            .orElseGet(() -> userRepository.save(new User(userInfo)));

        return new Oauth2UserDetails(user, loginUser.getAttributes());
    }

    private UserInfoFactory getUserInfoFactory(String provider) {
        switch (provider){
            case "google": return new GoogleUserInfoFactory();
            case "naver": return new NaverUserInfoFactory();
            default: throw new IllegalArgumentException("Unsupported OAuth2 provider: "+ provider);
        }
    }
}
