package me.nrz.tappy.common.oauth;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import lombok.Getter;
import lombok.ToString;
import me.nrz.tappy.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
@ToString
public class Oauth2UserDetails implements OAuth2User, Serializable {
    private User user;
    private Map<String, Object> attributes;

    public Oauth2UserDetails(User user ,Map<String, Object> attributes){
        this.attributes = attributes;
        this.user = user;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString()));
    }

    @Override
    public String getName() {
        return user.getProviderId();
    }
}
