import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MatchDetailCard } from "../../components";
import { YearSelector } from "../../components/yearSelector/YearSelector";
import "./MatchPage.scss";

export const MatchPage = () => {
  
  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/team/${teamName}/matches?year=${year}`
      );
      const data = await response.json();
      setMatches(data);
    };
    fetchMatches();
  }, [teamName, year]);

  return (
    <div className="MatchPage">
      <div className="year-selector">
        <h3>Select Year</h3>
        <YearSelector teamName={teamName}/>
      </div>
      <div>
      <h1 className="page-heading"> {teamName} matches in {year} </h1>
        {matches.map((match) => (
          <MatchDetailCard match={match} teamName={teamName} />
        ))}
      </div>
    </div>
  );
};
