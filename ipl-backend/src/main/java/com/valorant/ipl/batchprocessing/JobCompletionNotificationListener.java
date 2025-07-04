package com.valorant.ipl.batchprocessing;

import com.valorant.ipl.model.Team;
import com.valorant.ipl.repository.TeamRepository;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

    private final JdbcTemplate jdbcTemplate;

    private final EntityManager em;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate, EntityManager em) {
        this.jdbcTemplate = jdbcTemplate;
        this.em = em;
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            Map<String, Team> teamMap1 = new HashMap<>();
            Map<String, Team> teamMap2 = new HashMap<>();

            // total matches in team1 column
            em.createQuery("select team1, count('*') as numMatches from Match group by team1", Object[].class)
                    .getResultList()
                    .stream()
                    .map(res -> new Team((String) res[0], (long) res[1]))
                    .forEach(x -> teamMap1.put(x.getTeamName(), x));

            em.createQuery("select team2, count('*') as numMatches from Match group by team2", Object[].class)
                    .getResultList()
                    .stream()
                    .map(res -> new Team((String) res[0], (long) res[1]))
                    .forEach(x -> teamMap2.put(x.getTeamName(), x));

            // create a resulting hashmap where key is the team and value is the total matches played for that team
            Map<String, Long> teamTotalMatchesPlayed = new HashMap<>();
            teamMap1.keySet()
                    .forEach(s -> {
                        if (teamMap2.containsKey(s)) { // if check not needed
                            teamTotalMatchesPlayed.put(s, teamMap1.get(s).getTotalMatches() + teamMap2.get(s).getTotalMatches());
                        }
                    });

            // save all teams to Team table with the number of total matches played
            teamTotalMatchesPlayed.forEach((teamName, numGamesPlayed) -> {

                // getting total wins for a team
                Long totalWins = (Long) em.createQuery("select count('*') from Match where matchWinner= ?1")
                        .setParameter(1, teamName)
                        .getSingleResult();
                Team teamObj = new Team();
                teamObj.setTeamName(teamName);
                teamObj.setTotalMatches(numGamesPlayed);
                teamObj.setTotalWins(totalWins);
                teamRepository.save(teamObj);
            });

            teamRepository.findAll()
                    .forEach(team -> System.out.println(team.getTeamName() + " played " + team.getTotalMatches() + " matches and won "
                            + team.getTotalWins()));

        }

    }
}
