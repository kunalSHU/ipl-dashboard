package com.valorant.ipl.service;

import com.valorant.ipl.constants.IplConstants;
import com.valorant.ipl.exception.TeamNotFoundException;
import com.valorant.ipl.model.Team;
import com.valorant.ipl.repository.TeamRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public Team getTeamStats(final String teamName) {
      final Team team = teamRepository.findByTeamName(teamName);

      // team not found
      if (null == team) {
          throw new TeamNotFoundException(IplConstants.TEAM_NAME_NOT_FOUND);
      }

      log.info("This is the team : {} ", team.toString());
      return team;
    }
}
