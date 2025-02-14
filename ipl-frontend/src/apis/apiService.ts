import axios, { AxiosRequestConfig } from 'axios';
import { OKTA_HOST } from '../enum/EnumDeclare';
import { teamsEndpoint, teamInfoEndpoint, teamMatchesEndpoint, oktaUrlEndpoint } from './apiUrl';

axios.interceptors.request.use(config => {
    console.log(config.url)
    if (config.url !== oktaUrlEndpoint) {
        config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`
    }
    console.log(config.headers)
    return config;
})

export const getOktaToken = async () => {
    return await axios.get<any>(oktaUrlEndpoint);
}

export const pingHealth = async () => {
    return await axios.get<any>("http://localhost:8089/health/ping");
}

export const getTeams = async () => {
    return await axios.get<string[]>(teamsEndpoint);
}

export const getTeamInfo = async (teamName: string) => {
    return await axios.get<any>(teamInfoEndpoint + teamName);
}

export const getMatchesForTeam = async (teamName: string | undefined) => {
    return await axios.get<any>(teamMatchesEndpoint + teamName);
}