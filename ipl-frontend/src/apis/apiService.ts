import axios from 'axios';
import {teamsEndpoint, teamInfoEndpoint, teamMatchesEndpoint} from './apiUrl';

export const getTeams = async () => {
    return await axios.get<string[]>(teamsEndpoint);
}

export const getTeamInfo = async (teamName: string) => {
    return await axios.get<any>(teamInfoEndpoint + teamName);
}

export const getMatchesForTeam = async (teamName: string | undefined) => {
    return await axios.get<any>(teamMatchesEndpoint + teamName);
}