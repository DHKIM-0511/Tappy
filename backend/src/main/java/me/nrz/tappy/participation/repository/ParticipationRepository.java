package me.nrz.tappy.participation.repository;

import me.nrz.tappy.participation.entity.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipationRepository extends JpaRepository<Participation, Integer> {

}
