package com.example.workbridgeback.controller;

import com.example.workbridgeback.entity.AuthenticationRequest;
import com.example.workbridgeback.entity.AuthenticationResponse;
import com.example.workbridgeback.entity.ImageModel;
import com.example.workbridgeback.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.workbridgeback.service.AuthenticationService;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping(path = "/register")
    public AuthenticationResponse register(
            @RequestBody() User user
            // @RequestParam("imageFile") MultipartFile[] file
    ) {

        try {
            return service.register(user);
        } catch (Exception e) {

            return null;
        }
    }




    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);

    }


}