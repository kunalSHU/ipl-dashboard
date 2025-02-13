package com.valorant.ipl.config;

import com.valorant.ipl.model.Token;
import lombok.extern.slf4j.Slf4j;
import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.CacheConfiguration;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
@Slf4j
public class IplBackendConfig {

    @Bean
    public RestTemplate getTemplate() {
        return new RestTemplate();
    }

    @Bean(name = "oktaTokenCache")
    public Cache<String, Token> oktaTokenCache() {

        // Configure the cache
        // The type of key and value and the duration in which we cache the token
        CacheConfiguration<String, Token> cacheConfiguration = CacheConfigurationBuilder
                .newCacheConfigurationBuilder(String.class, Token.class, ResourcePoolsBuilder.heap(100))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofMinutes(25L))).build();

        // Add the cache config to the cache manager
        CacheManager cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
                .withCache("TokenCache", cacheConfiguration).build();
        cacheManager.init();
        // get the cache from the cache manager
        Cache<String, Token> tokenCache = cacheManager.getCache("TokenCache", String.class, Token.class);
        log.info("The token cache {}", tokenCache.get("TokenCache"));
        return tokenCache;
    }
}
