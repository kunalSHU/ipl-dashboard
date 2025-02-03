package com.valorant.ipl.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest {

    private String grant_type = "client_credentials";

    private String scope = "custom_scope";

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("grant_type=").append(grant_type).append("&");
        sb.append("scope=").append(scope);
        return sb.toString();
    }
}
