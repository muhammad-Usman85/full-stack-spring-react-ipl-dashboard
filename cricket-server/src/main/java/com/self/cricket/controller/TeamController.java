package com.self.cricket.controller;

import java.time.LocalDate;
import java.util.List;

import com.self.cricket.entity.Match;
import com.self.cricket.entity.Team;
import com.self.cricket.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/team")
@CrossOrigin
public class TeamController {

    private TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/{teamName}")
    public ResponseEntity<?> getTeamByTeamName(@PathVariable String teamName){
        Team teamResult = teamService.getTeamByName(teamName);
        if(teamResult == null) {
            return new ResponseEntity<String>("Team with this Name " + teamName + " is not Found!", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Team>(teamResult, HttpStatus.OK);
    }

    @GetMapping("/{teamName}/matches")
    public ResponseEntity<List<Match>> getTeamMatches(@PathVariable String teamName, @RequestParam int year){
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);
        List<Match> matchList = teamService.getTeamMatches(teamName, startDate, endDate);
        return new ResponseEntity<List<Match>>(matchList, HttpStatus.OK); 
    }
    
}
