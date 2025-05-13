package me.nrz.tappy.room.controller;

import lombok.RequiredArgsConstructor;
import me.nrz.tappy.room.dto.request.RoomRequest;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RoomWebSocketController {

    @MessageMapping("/rooms")
    void chatRoom(RoomRequest roomCreateRequest){

    }
}
