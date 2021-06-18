package com.valorant.ipl.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class TeamNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1292180132746277745L;

    public TeamNotFoundException(final String msg) {
        super(msg);
    }
}
