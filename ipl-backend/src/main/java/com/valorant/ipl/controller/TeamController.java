package com.valorant.ipl.controller;

import com.valorant.ipl.model.Match;
import com.valorant.ipl.model.Team;
import com.valorant.ipl.service.MatchService;
import com.valorant.ipl.service.TeamService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @Autowired
    private MatchService matchService;

    @GetMapping("team/{teamName}")
    public ResponseEntity<Team> getTeamInfo(@PathVariable final String teamName) {
        final Team team = teamService.getTeamStats(teamName);
        return ResponseEntity.ok().body(team);
    }

    @GetMapping("/teams")
    public ResponseEntity<List<String>> getTeams() {
        final List<String> teamNames = teamService.getTeams();
        return ResponseEntity.ok().body(teamNames);
    }

    @GetMapping("matches/{teamName}")
    public ResponseEntity<List<Match>> getMatchesHistoryByTeam(@PathVariable final String teamName) {
        final List<Match> matchList = matchService.getMatchesList(teamName);
        return ResponseEntity.ok(matchList);
    }
}
