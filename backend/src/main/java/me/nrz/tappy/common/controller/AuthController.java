package me.nrz.tappy.common.controller;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.nrz.tappy.common.jwt.JwtTokenProvider;
import me.nrz.tappy.common.jwt.JwtTokenService;
import me.nrz.tappy.common.jwt.dto.TokenDto;
import me.nrz.tappy.user.entity.User;
import me.nrz.tappy.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenService jwtTokenService;
    private final UserRepository userRepository;

    @PostMapping("/refresh")
    public ResponseEntity<TokenDto> refresh(@RequestBody Map<String, String> request){
        String refreshToken =request.get("refreshToken");
        if(refreshToken == null){
            return ResponseEntity.badRequest().build();
        }

        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);
        if(!jwtTokenService.validateRefreshToken(userId, refreshToken)){
            return ResponseEntity.badRequest().build();
        }

        User user = userRepository.findById(Integer.parseInt(userId))
            .orElseThrow(() -> new IllegalArgumentException("Required User is missing"));

        TokenDto tokenDto = jwtTokenProvider.generateTokenDto(user);
        jwtTokenService.saveRefreshToken(
            userId,
            tokenDto.getRefreshToken(),
            tokenDto.getAccessTokenExpiresIn() - System.currentTimeMillis()
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody Map<String, String> request) {
        String accessToken = request.get("AccessToken");
        log.info("logout 시도 : {}", accessToken);

        if (accessToken == null || !jwtTokenProvider.validateToken(accessToken)) {
            return ResponseEntity.badRequest().build();
        }

        String userId = jwtTokenProvider.getUserIdFromToken(accessToken);

        long expirationTime = jwtTokenProvider.getTokenExpirationTime(accessToken);
        long now = System.currentTimeMillis();
        long timeToLive = Math.max(0, expirationTime - now);

        jwtTokenService.invalidateToken(accessToken, timeToLive);
        return ResponseEntity.ok().build();
    }
}
