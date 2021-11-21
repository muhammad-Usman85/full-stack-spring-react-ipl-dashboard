package com.self.cricket.service;

import java.time.LocalDate;
import java.util.List;

import com.self.cricket.entity.Match;
import com.self.cricket.entity.Team;

public interface TeamService {
    
    public Team getTeamByName(String teamName);
    
    public List<Match> getTeamMatches(String teamName, LocalDate startDate, LocalDate endDate);

}
