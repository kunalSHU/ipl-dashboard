package com.valorant.ipl.controller;

import com.valorant.ipl.model.Team;
import com.valorant.ipl.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("team/{teamName}")
    public ResponseEntity<Team> getTeamInfo(@PathVariable final String teamName) {
        final Team team = teamService.getTeamStats(teamName);
        return ResponseEntity.ok().body(team);
    }
}
