import axios, { AxiosResponse } from "axios";

// Base URL for the sports database API
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function for fetching teams by league
export const fetchTeamsByLeague = async (
  league: string
): Promise<AxiosResponse<any>> => {
  try {
    // Send a GET request to the API to fetch teams based on the specified league
    const response = await axios.get(
      `${BASE_URL}/search_all_teams.php?l=${league}`
    );
    return response;
  } catch (error: any) {
    // Handle errors and throw a custom error message
    throw new Error(`Error fetching teams: ${error.message}`);
  }
};

// Function for fetching the top 5 leagues excluding "No League Soccer"
export const fetchTop5Leagues = async (): Promise<AxiosResponse<any>> => {
  try {
    // Send a GET request to the API to fetch all available leagues
    const response = await axios.get(`${BASE_URL}/all_leagues.php`);
    const allLeagues: any[] = response.data.leagues || [];

    // Filter out "No League Soccer" and get the top 5 leagues
    const top5Leagues = allLeagues
      .filter((league) => league.strLeague !== "No League Soccer")
      .slice(0, 5);

    return Promise.resolve({
      data: { leagues: top5Leagues },
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
    });
  } catch (error: any) {
    // Handle errors and throw a custom error message
    throw new Error(`Error fetching top 5 leagues: ${error.message}`);
  }
};
