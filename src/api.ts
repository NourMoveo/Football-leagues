import axios, { AxiosResponse } from 'axios';

// Base URL for the sports database API
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function for fetching teams by league
export const fetchTeamsByLeague = async (league: string): Promise<AxiosResponse<any>> => {
  try {
    // Send a GET request to the API to fetch teams based on the specified league
    const response = await axios.get(`${BASE_URL}/search_all_teams.php?l=${league}`);
    return response;
  } catch (error: any) {
    // Handle errors and throw a custom error message
    throw new Error(`Error fetching teams: ${error.message}`);
  }
};

// Function for fetching all leagues
export const fetchAllLeagues = async (): Promise<AxiosResponse<any>> => {
  try {
    // Send a GET request to the API to fetch all available leagues
    const response = await axios.get(`${BASE_URL}/all_leagues.php`);
    return response;
  } catch (error: any) {
    // Handle errors and throw a custom error message
    throw new Error(`Error fetching leagues: ${error.message}`);
  }
};
