import React, { useState, useEffect } from 'react';
import { fetchAllLeagues } from '../api';
import '../App.scss';
interface Team {
  strLeague: string;
}

interface LeaguesProps {
  onLeagueClick: (league: string) => void;
}

const Leagues: React.FC<LeaguesProps> = ({ onLeagueClick }) => {
  // State to store the fetched leagues
  const [leagues, setLeagues] = useState<string[]>([]);

  useEffect(() => {
    // Function to fetch all leagues when the component mounts
    const fetchLeagues = async () => {
      try {
        // Fetch all leagues from the API
        const response = await fetchAllLeagues();
        const fetchedLeagues: Team[] = response.data.leagues || [];

        // Filter out 'No League Soccer' and get the top 5 leagues
        const filteredLeagues: string[] = fetchedLeagues
          .filter((league) => league.strLeague !== 'No League Soccer')
          .slice(0, 5)
          .map((league) => league.strLeague);

        // Set the fetched leagues in state
        setLeagues(filteredLeagues);
      } catch (error: any) {
        // Handle errors and log a message
        console.error('Error fetching leagues:', error.message);
      }
    };

    // Call the fetchLeagues function when the component mounts
    fetchLeagues();
  }, []);

  // Function to handle a league button click
  const handleLeagueClick = (league: string) => {
    // Pass the selected league to the parent component using the onLeagueClick prop
    onLeagueClick(league);
  };

  return (
    <div className='leagues-container'>
      {/* Heading for leagues */}
      <h2>Leagues</h2>

      {/* List of league buttons */}
      <ul>
        {/* Map through leagues and render buttons */}
        {leagues.map((league, index) => (
          <li key={index}>
            {/* Call the handleLeagueClick function on button click */}
            <button onClick={() => handleLeagueClick(league)}>{league}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leagues;
