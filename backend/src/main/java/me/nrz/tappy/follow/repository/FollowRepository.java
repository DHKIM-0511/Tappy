package me.nrz.tappy.follow.repository;

import java.util.Optional;
import me.nrz.tappy.follow.entity.Follow;
import me.nrz.tappy.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

    Optional<Follow> findByFromAndTo(User fromUser, User toUser);
}
