package com.valorant.ipl.service;

import com.valorant.ipl.model.Match;
import com.valorant.ipl.repository.MatchRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

        matchRepository.findByTeam1(teamName).forEach(match -> matchesTeam1.add(match));
        matchRepository.findByTeam2(teamName).forEach(match -> matchesTeam2.add(match));

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
        log.info("{}", allMatches.subList(0,3));
        return allMatches.subList(0,3);
    }
}