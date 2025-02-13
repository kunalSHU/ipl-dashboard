package com.valorant.ipl.repository;

import com.valorant.ipl.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    List<Match> findByTeam1(final String teamName);

    List<Match> findByTeam2(final String teamName);

}
