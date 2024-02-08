import React, { useState, useEffect } from "react";
import Leagues from "./Leagues"; // Importing the Leagues component
import { fetchTeamsByLeague } from "../api"; // Importing the fetchTeamsByLeague function
import "../App.scss"; // Importing the styles

interface Team {
  strTeam: string;
  strTeamLogo: string | null;
}

const Content = () => {
  // State variables for selected league, teams, loading status, and notification
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // Effect hook to fetch data when the selected league changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading status to true
      if (selectedLeague) {
        // If a league is selected
        try {
          // Fetch teams for the selected league
          const response = await Promise.race([
            fetchTeamsByLeague(selectedLeague), // Actual API call
            new Promise((_resolve, reject) =>
              setTimeout(() => reject(new Error("Timeout")), 5000)
            ), // Timeout promise
          ]);
          // Extract teams data from the response
          const teamsData = (response as { data: { teams?: Team[] } }).data
            ?.teams;
          if (teamsData) {
            setTeams(teamsData); // Set fetched teams
          } else {
            console.error("No teams found."); // Log error if no teams found
          }
        } catch (error: any) {
          console.error("Error fetching teams:", error.message); // Log error if fetching teams fails
        } finally {
          setIsLoading(false); // Set loading status to false after fetching data
        }
      }
    };

    fetchData(); // Call the fetchData function
  }, [selectedLeague]); // Trigger the effect when selectedLeague changes

  // Effect hook to show notification after 6 seconds
  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setShowNotification(true); // Set showNotification to true after 6 seconds
    }, 6000); // Show notification after 6 seconds

    return () => clearTimeout(notificationTimer); // Cleanup timer on component unmount
  }, [selectedLeague]); // Trigger the effect when selectedLeague changes

  return (
    <div className="content-container">
      <Leagues onLeagueClick={setSelectedLeague} />{" "}
      {/* Render the Leagues component */}
      {isLoading && <p>Loading...</p>}{" "}
      {/* Render loading indicator if isLoading is true */}
      {showNotification} {/* Render notification if showNotification is true */}
      {/* Render teams if a league is selected */}
      {selectedLeague && (
        <div>
          {/* Display the selected league */}
          <h2>Selected League: {selectedLeague}</h2>
          {/* Container for displaying teams */}
          <div className="teams-container">
            {/* Map through teams and display logos and names */}
            {teams.map((team, index) => (
              <div key={index} className="team">
                {/* Display team logo if available, otherwise show "No Logo" */}
                {team.strTeamLogo ? (
                  <img
                    src={team.strTeamLogo}
                    alt={team.strTeam}
                    className="team-logo"
                  />
                ) : (
                  <span className="no-logo">No Logo</span>
                )}
                {/* Display team name */}
                <p className="team-name">{team.strTeam}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
