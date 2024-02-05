import React, { useState, useEffect } from 'react';
import Leagues from './Leagues';
import { fetchTeamsByLeague } from '../api';

interface Team {
  strTeam: string;
  strTeamLogo: string | null;
}

const Content = () => {
  // State to track the selected league and teams
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Function to fetch teams when the selected league changes
    const fetchData = async () => {
      if (selectedLeague) {
        try {
          // Fetch teams based on the selected league
          const response = await fetchTeamsByLeague(selectedLeague);
          const fetchedTeams: Team[] = response.data.teams || [];
          setTeams(fetchedTeams);
        } catch (error: any) {
          // Handle errors and log a message
          console.error('Error fetching teams:', error.message);
        }
      }
    };

    // Call the fetchData function when the selected league changes
    fetchData();
  }, [selectedLeague]);

  return (
    <div className='content-container'>
      {/* Render the Leagues component with buttons */}
      <Leagues onLeagueClick={setSelectedLeague} />

      {/* Render teams if a league is selected */}
      {selectedLeague && (
        <div>
          {/* Display the selected league */}
          <h2>Selected League: {selectedLeague}</h2>

          {/* Container for displaying teams */}
          <div className='teams-container'>
            {/* Map through teams and display logos and names */}
            {teams.map((team, index) => (
              <div key={index} className='team'>
                {/* Display team logo if available, otherwise show "No Logo" */}
                {team.strTeamLogo ? (
                  <img src={team.strTeamLogo} alt={team.strTeam} className='team-logo' />
                ) : (
                  <span className='no-logo'>No Logo</span>
                )}

                {/* Display team name */}
                <p className='team-name'>{team.strTeam}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
