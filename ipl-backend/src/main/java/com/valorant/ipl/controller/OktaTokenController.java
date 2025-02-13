package com.valorant.ipl.controller;

import com.valorant.ipl.model.Token;
import com.valorant.ipl.token.TokenClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OktaTokenController {

    @Autowired
    private TokenClient tokenClient;

    @GetMapping(value = "oauth2/token", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Token> getOAuthToken() {
        // Get token from okta to access resource
        // Call Okta api
        Token token = tokenClient.getTokenFromAuthServer();
        return new ResponseEntity(token, HttpStatus.OK);
    }
}
