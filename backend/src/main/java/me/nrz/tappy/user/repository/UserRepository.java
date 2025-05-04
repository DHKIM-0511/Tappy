package me.nrz.tappy.user.repository;

import java.util.Optional;
import me.nrz.tappy.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByProviderId(String id);
}
