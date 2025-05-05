package me.nrz.tappy.common.jwt;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final JwtTokenProvider jwtTokenProvider;

    private static final String REFRESH_TOKEN_PREFIX = "RT:";
    private static final String BLACKLIST_PREFIX = "BL:";

    public void saveRefreshToken(String userId, String refreshToken, long ttl) {
        redisTemplate.opsForValue().set(
            REFRESH_TOKEN_PREFIX + userId,
            refreshToken,
            ttl,
            TimeUnit.MILLISECONDS
        );
    }

    public boolean validateRefreshToken(String userId, String refreshToken) {
        String storedToken = (String) redisTemplate.opsForValue().get(REFRESH_TOKEN_PREFIX + userId);
        return refreshToken.equals(storedToken) && jwtTokenProvider.validateToken(refreshToken);
    }

    public void invalidateToken(String accessToken, long remainingTimeMillis) {
        String userId = jwtTokenProvider.getUserIdFromToken(accessToken);

        redisTemplate.delete(REFRESH_TOKEN_PREFIX + userId);

        // Access Token을 블랙리스트에 추가 (남은 만료시간 동안)
        redisTemplate.opsForValue().set(
            BLACKLIST_PREFIX + accessToken,
            "logout",
            remainingTimeMillis,
            TimeUnit.MILLISECONDS
        );
    }

    public boolean isBlacklisted(String accessToken) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(BLACKLIST_PREFIX + accessToken));
    }

    public void deleteRefreshToken(String userId) {
        redisTemplate.delete(REFRESH_TOKEN_PREFIX + userId);
    }
}
