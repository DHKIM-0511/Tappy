package me.nrz.tappy.room.service;

import org.springframework.data.redis.connection.Message;
import org.springframework.stereotype.Service;

@Service
public class RoomPubSubServiceImpl implements RoomPubSubService {

    @Override
    public void onMessage(Message message, byte[] pattern) {

    }
}
