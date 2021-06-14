package com.valorant.ipl.batchprocessing;

import com.valorant.ipl.data.MatchFromCSV;
import com.valorant.ipl.model.Match;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

public class MatchInputProcessor implements ItemProcessor<MatchFromCSV, Match> {

    @Override
    public Match process(final MatchFromCSV matchFromCSV) throws Exception {

        // create a match object
        return Match.builder()
                .id(Long.parseLong(matchFromCSV.getId()))
                .date(LocalDate.parse(matchFromCSV.getDate()))
                .matchWinner(matchFromCSV.getWinner())
                .city(matchFromCSV.getCity())
                .playerOfMatch(matchFromCSV.getPlayer_of_match())
                .result(matchFromCSV.getResult())
                .result_margin(matchFromCSV.getResult_margin())
                .team1(matchFromCSV.getTeam1())
                .team2(matchFromCSV.getTeam2())
                .tossDecision(matchFromCSV.getToss_decision())
                .venue(matchFromCSV.getVenue())
                .umpire(matchFromCSV.getUmpire())
                .umpire1(matchFromCSV.getUmpire1())
                .build();
    }
}
