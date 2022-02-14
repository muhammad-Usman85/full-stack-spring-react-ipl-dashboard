import "./HomePage.scss";
import { React, useEffect, useState } from "react";
import { TeamTitle } from "../../components/teamTitle/TeamTitle";
import { SlideShow } from "../../components/slideShow/SlideShow";

export const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchAllTeams = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/team/`
      );
      const data = await response.json();
      setTeams(data);
    };
    fetchAllTeams();
  }, []);

  return (
    <div className="HomePage">
      <SlideShow />
      <div className="header-section">
        <h1 className="app-name"> Cricket Dashboard </h1>
      </div>
      <div className="team-grid">
        {teams.map(team => <TeamTitle teamName={team.teamName}/>)}
      </div>
    </div>
  );
};
