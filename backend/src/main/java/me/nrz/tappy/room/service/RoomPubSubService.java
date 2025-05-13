package me.nrz.tappy.room.service;

import org.springframework.data.redis.connection.MessageListener;

public interface RoomPubSubService extends MessageListener {
}
