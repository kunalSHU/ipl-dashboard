package com.valorant.ipl.data;

import lombok.Data;

/**
 * Data we get from the CSV file in the current format.
 */
@Data
public class MatchFromCSV {

    private String id;
    private String city;
    private String date;
    private String player_of_match;
    private String venue;
    private String neutral_venue;
    private String team1;
    private String team2;
    private String toss_winner;
    private String toss_decision;
    private String winner;
    private String result;
    private String result_margin;
    private String eliminator;
    private String method;
    private String umpire1;
    private String umpire2;
}
