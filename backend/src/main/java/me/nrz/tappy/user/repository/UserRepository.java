package me.nrz.tappy.user.repository;

import java.util.Optional;
import me.nrz.tappy.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByProviderId(String id);
    Optional<User> findByName(String name);

    @Query("SELECT u FROM User u JOIN Follow f ON f.to = u WHERE f.from = :fromUser AND f.broken = false")
    Page<User> findAllByUser(@Param("fromUser") User user, Pageable pageable);
}
