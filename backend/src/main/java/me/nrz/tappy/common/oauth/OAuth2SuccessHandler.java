package me.nrz.tappy.common.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.nrz.tappy.common.jwt.JwtTokenProvider;
import me.nrz.tappy.common.jwt.JwtTokenService;
import me.nrz.tappy.common.jwt.dto.TokenDto;
import me.nrz.tappy.user.entity.User;
import me.nrz.tappy.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {
        log.info("Oauth login 성공");
        Oauth2UserDetails oAuth2User = (Oauth2UserDetails) authentication.getPrincipal();
        User user = oAuth2User.getUser();

        TokenDto tokenDto = jwtTokenProvider.generateTokenDto(user);
        jwtTokenService.saveRefreshToken(
            String.valueOf(user.getId()),
            tokenDto.getRefreshToken(),
            refreshTokenExpiration
        );

        String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl+"/oauth/callback")
            .queryParam("token", tokenDto.getAccessToken())
            .build().toUriString();

        getRedirectStrategy().sendRedirect(request,response,targetUrl);
    }
}
