package me.nrz.tappy.follow.dto.response;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import me.nrz.tappy.user.dto.response.UserResponse;
import me.nrz.tappy.user.entity.User;
import org.springframework.data.domain.Page;

@Getter
public class FollowersResponse {
    private List<UserResponse> userResponses = new ArrayList<>();
    private final int pageNum;
    private final long totalElements;
    private final int totalPages;
    private final boolean first;
    private final boolean last;

    public FollowersResponse(Page<User> userPage) {
        this.userResponses = userPage.map(UserResponse::new).getContent();
        this.pageNum = userPage.getNumber();
        this.totalElements = userPage.getTotalElements();
        this.totalPages = userPage.getTotalPages();
        this.first = userPage.isFirst();
        this.last = userPage.isLast();
    }
}
