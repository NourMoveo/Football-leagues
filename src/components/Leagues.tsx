import React, { useState, useEffect } from "react";
import { fetchTop5Leagues } from "../api";

interface League {
  strLeague: string;
}

interface LeaguesProps {
  onLeagueClick: (league: string) => void;
}

const Leagues: React.FC<LeaguesProps> = ({ onLeagueClick }) => {
  // State to store the fetched leagues
  const [leagues, setLeagues] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    // Function to fetch top 5 leagues when the component mounts
    const fetchLeagues = async () => {
      // Set loading timeout to 5 seconds
      const loadingTimeout = setTimeout(() => {
        setShowNotification(true);
      }, 5000);

      try {
        // Fetch top 5 leagues from the API
        const response = await fetchTop5Leagues();
        const fetchedLeagues: League[] = response.data.leagues || [];

        // Extract league names from the fetched leagues
        const leagueNames: string[] = fetchedLeagues.map(
          (league) => league.strLeague
        );

        // Set the fetched leagues in state
        setLeagues(leagueNames);
      } catch (error: any) {
        // Handle errors and log a message
        console.error("Error fetching leagues:", error.message);
      } finally {
        // Clear loading timeout
        clearTimeout(loadingTimeout);
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
    <div className="leagues-container">
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

      {/* Show notification if loading takes longer than 5 seconds */}
      {showNotification && (
        <p>Data is taking longer to load. Please be patient.</p>
      )}
    </div>
  );
};

export default Leagues;
