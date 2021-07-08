package com.valorant.ipl.service;

import com.valorant.ipl.constants.IplConstants;
import com.valorant.ipl.exception.TeamNotFoundException;
import com.valorant.ipl.model.Match;
import com.valorant.ipl.repository.MatchRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public List<Match> getMatchesList(final String teamName) {

        List<Match> matchesTeam1 = new ArrayList<>();
        List<Match> matchesTeam2 = new ArrayList<>();

        log.info("In get matches list method");

        if (!matchRepository.findByTeam1(teamName).isEmpty()) { // implies team2 is valid too
            matchRepository.findByTeam1(teamName).forEach(match -> matchesTeam1.add(match));
            matchRepository.findByTeam2(teamName).forEach(match -> matchesTeam2.add(match));
        } else {
            throw new TeamNotFoundException(IplConstants.TEAM_NAME_NOT_FOUND);
        }

        List<Match> allMatches = Stream.concat(matchesTeam1.stream(), matchesTeam2.stream()).collect(Collectors.toList());

        // sorts matches by date, top 3 latest played matches
        Comparator<Match> com = (o1, o2) -> {
            if (o1.getDate().compareTo(o2.getDate()) < 0) {
                return 1;
            } else {
                return -1;
            }
        };
        allMatches.sort(com);
        List<Match> matchList = allMatches.subList(0,3).stream().map(match -> {
           // perform swap
           if (!match.getTeam1().equals(teamName)) {
              String team2 = match.getTeam1();
              match.setTeam1(teamName);
              match.setTeam2(team2);
           }
           return allMatches.subList(0,3);
        }).flatMap(Collection::stream).collect(Collectors.toList());
        return matchList.subList(0,3);
    }
}
