package com.valorant.ipl.token;

import com.valorant.ipl.model.Token;
import com.valorant.ipl.model.TokenRequest;
import lombok.extern.slf4j.Slf4j;
import org.ehcache.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class TokenClient {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    @Qualifier("oktaTokenCache")
    private Cache<String, Token> cache;

    @Value("${spring.security.oauth2.client.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.client.clientSecret}")
    private String clientSecret;

    public Token getTokenFromAuthServer() {

        log.info("Token cache from auth server {}", cache.get("TokenCache"));
        // Check if token is in cache first
        if (cache.get("TokenCache") != null) {
            log.info("Sample token {}", cache.get("TokenCache"));
            return cache.get("TokenCache");
        }

        TokenRequest tokenRequest = new TokenRequest();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth(clientId, clientSecret);
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<String> httpEntity = new HttpEntity<>(tokenRequest.toString(), httpHeaders);
        System.out.println(httpEntity.getBody());
        HttpEntity<Token> response = restTemplate.postForEntity("https://dev-30002792.okta.com/oauth2/default/v1/token", httpEntity, Token.class);
        cache.put("TokenCache", response.getBody()); // put token in the cache
        return response.getBody();
    }
}
