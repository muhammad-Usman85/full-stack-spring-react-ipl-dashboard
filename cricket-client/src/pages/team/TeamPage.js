import "./TeamPage.scss";
import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MatchDetailCard, MatchSmallCard } from "../../components";
import { PieChart } from 'react-minimal-pie-chart';

export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/team/${teamName}`
      );
      const data = await response.json();
      setTeam(data);
    };
    fetchMatches();
  }, [teamName]);

  if (!team || !team.teamName) {
    return <h1>Team Not Found!</h1>;
  }
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name"> {team.teamName} </h1>
      </div>
      <div className="win-loss-section">
        Wins / Losses
        <PieChart
          data = {[
            {title: "Win", value: team.totalWins, color: '#4da375'},
            {title: "Losses", value: team.totalMatches - team.totalWins, color: '#a34d5d'},
          ]} 
        />
      </div>
      <div className="match-detail-section">
      <h3>Latest Match</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map((match) => (
        <MatchSmallCard match={match} teamName={team.teamName} />
      ))}
      <div className="more-link">
      <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATE_END_YEAR}`}>More {">"}</Link>
      </div>
    </div>
  );
};
