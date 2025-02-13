import axios from 'axios';
import { teamsEndpoint, teamInfoEndpoint, teamMatchesEndpoint } from './apiUrl';

axios.interceptors.request.use(config => {
    console.log("Setting the token in the header before request")
    config.headers.Authorization = 'Bearer eyJraWQiOiJ6X1p0WlRHVEE1UE5faFdIaUEwQ3Y2S29sRjFoMXEzMTlGX3c1c0NiM2dBIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjRwZVUyN095S3poWENVcGZhTTRPODlBb2duMzZfV29KdlloX21kZFVFa28iLCJpc3MiOiJodHRwczovL2Rldi0zMDAwMjc5Mi5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2NjM3NjM0ODEsImV4cCI6MTY2Mzc2NzA4MSwiY2lkIjoiMG9hNWpzbGdxbFZ0V3U0VUQ1ZDYiLCJzY3AiOlsiY3VzdG9tX3Njb3BlIl0sInN1YiI6IjBvYTVqc2xncWxWdFd1NFVENWQ2In0.FwRxZ2p532aTqctpMUvoscBkxDRaLAFOl0vakq7EnSlX42VXLOg7ioNnp7A5aU7uJiSazg4mAOn81oRtX9SHJXF3DpKPCNl7wyBg1hrkCzK_vf52_KtLvdtiPl7Lm6KB4EqS8jFpUyvePVC2gusnUZIxZH6tpYI2Et7YurllJky0IWS2ehxpHlzTe0I32QJxV4aOkuBMtdNZnI4g9G9371roSEzGQND1EqXzl8FcFKEYfpkW8LY7DdBR8GvR8dMPqL2BDWa_dEP9Kll7byu5gJ5pyuGPm0TLfREqIbM3F5PR_NkLFdtTioyyqKdOFXb_WtnJ_S6Wzf2QnQzgER78Hw';
    console.log(config.headers)
    return config;
})

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