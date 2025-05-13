package me.nrz.tappy.room.repository;

import me.nrz.tappy.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {

}
