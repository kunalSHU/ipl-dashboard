package com.valorant.ipl.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Team {

    @Id
    @GeneratedValue
    private Long id;
    private String teamName;
    private long totalMatches;

    public Team(final String teamName, final long totalMatches) {
        this.teamName = teamName;
        this.totalMatches = totalMatches;
    }
}
