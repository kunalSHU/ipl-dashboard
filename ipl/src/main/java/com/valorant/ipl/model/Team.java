package com.valorant.ipl.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Team {

    @Id
    private Long id;
    private String name;
    private long totalMatches;

    public Team(final String name, final long totalMatches) {
        this.name = name;
        this.totalMatches = totalMatches;
    }
}
