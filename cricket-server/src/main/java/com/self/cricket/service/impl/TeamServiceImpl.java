package com.self.cricket.service.impl;

import java.time.LocalDate;
import java.util.List;

import com.self.cricket.entity.Match;
import com.self.cricket.entity.Team;
import com.self.cricket.repository.MatchRepository;
import com.self.cricket.repository.TeamRepository;
import com.self.cricket.service.TeamService;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamServiceImpl(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @Override
    public Team getTeamByName(String teamName) {
        var teamResult = this.teamRepository.findByTeamName(teamName);
        Pageable pageable = PageRequest.of(0, 4);
        teamResult.setMatches(matchRepository.getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, pageable));
        return teamResult;
    }

    @Override
    public List<Match> getTeamMatches(String teamName, LocalDate startDate, LocalDate endDate) {
        return this.matchRepository.getMatchesByTeamBetweenDates(
            teamName, startDate, endDate
            );
    }

}
