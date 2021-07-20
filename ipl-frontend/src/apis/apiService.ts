import axios from 'axios';
import { teamsEndpoint, teamInfoEndpoint, teamMatchesEndpoint } from './apiUrl';

axios.interceptors.request.use(config => {
    console.log("Setting the token in the header before request")
    config.headers.Authorization = 'Bearer eyJraWQiOiJmZzZETkV6OGo4YXJJT2VPa1pCc0pKTjU2bjZaVmlnejZhcThUc1BJMFhjIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlZwNmJFTVhFa0dGVy1mbXUwNnI3c3YySGxsRllpSGtxcTRGazEyQkM0MU0iLCJpc3MiOiJodHRwczovL2Rldi0zMDAwMjc5Mi5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MjY3OTYxMzUsImV4cCI6MTYyNjc5OTczNSwiY2lkIjoiMG9hNWpzbGdxbFZ0V3U0VUQ1ZDYiLCJzY3AiOlsiY3VzdG9tX3Njb3BlIl0sInN1YiI6IjBvYTVqc2xncWxWdFd1NFVENWQ2In0.WlAK9su0o3vZ04qKl2GFIFvOSAB_VH4cu0HPeGO9cKWLHY1FAA_sNX3a6zNyoO1I_2PfHBcS2mItvU5mNm_0V9kL3EcaaIbt9rJbzZm_nYM8i3I6iVT-11c5NZ7fpUhT4oBCRyQF9eUi5oHSc-ifC-hqGr5pkdqz2AZ4OWn7F3BeZS2oObBtNCIiMMA9Z5oXt5cMxF3kSoHbkJ1JDN7XQ-v5iZyVp6OClKxRGE2jlRn9LUbp1_K4UUJA1tDLWWXOv_E-WYKoazwbGnpLtjkAB7RQ953St8gOKd5OrwrYrqbHl3NOClNtixGz3OBGJDdgOYLH1GAQ3tBMebRJyIATtg';
    console.log(config.headers)
    return config;
})

export const getTeams = async () => {
    return await axios.get<string[]>(teamsEndpoint);
}

export const getTeamInfo = async (teamName: string) => {
    return await axios.get<any>(teamInfoEndpoint + teamName);
}

export const getMatchesForTeam = async (teamName: string | undefined) => {
    return await axios.get<any>(teamMatchesEndpoint + teamName);
}