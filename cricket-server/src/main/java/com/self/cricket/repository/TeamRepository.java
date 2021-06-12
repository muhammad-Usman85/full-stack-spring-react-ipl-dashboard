package com.self.cricket.repository;

import com.self.cricket.entity.Team;

import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long>{

    Team findByTeamName(String teamName); 
    
}
