package me.nrz.tappy.common.config;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.common.oauth.Oauth2UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final Oauth2UserService oAuth2UserService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> {})
            .httpBasic(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/oauth2/**", "/login/**").permitAll() // OAuth2 관련 경로 허용
                .anyRequest().authenticated()
            )
            .formLogin(AbstractHttpConfigurer::disable)
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/")
                .successHandler(
                    (request, response, authentication) -> {
                        response.sendRedirect(frontendUrl + "/rooms");
                    }
                )
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(oAuth2UserService)
                )
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl(frontendUrl)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID"));

        return http.build();
    }
}
