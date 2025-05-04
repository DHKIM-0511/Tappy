package me.nrz.tappy.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.nrz.tappy.common.oauth.user_info.UserInfo;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String provider;

    String providerId;

    String name;

    String image;

    @Enumerated(EnumType.STRING)
    UserRole role;

    public User(UserInfo userInfo) {
        this.provider = userInfo.getProvider();
        this.providerId = userInfo.getProviderId();
        this.name = userInfo.getName();
        this.image = userInfo.getProfileImageUrl();
        this.role = UserRole.USER;
    }
}
