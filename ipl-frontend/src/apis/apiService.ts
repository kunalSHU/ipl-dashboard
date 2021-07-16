import axios from 'axios';
import { teamsEndpoint, teamInfoEndpoint, teamMatchesEndpoint } from './apiUrl';

axios.interceptors.request.use(config => {
    console.log("Setting the token in the header before request")
    config.headers.Authorization = 'Bearer eyJraWQiOiJmZzZETkV6OGo4YXJJT2VPa1pCc0pKTjU2bjZaVmlnejZhcThUc1BJMFhjIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlloak5yQVRMNk9FQ3R3aTVTTmJzekRtZTg2YURJMEppQTU3SC1aUUgzVGciLCJpc3MiOiJodHRwczovL2Rldi0zMDAwMjc5Mi5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MjY0NjcxNDIsImV4cCI6MTYyNjQ3MDc0MiwiY2lkIjoiMG9hNWpzbGdxbFZ0V3U0VUQ1ZDYiLCJzY3AiOlsiY3VzdG9tX3Njb3BlIl0sInN1YiI6IjBvYTVqc2xncWxWdFd1NFVENWQ2In0.kzWKjisH4EpFxL7p_bjvtm3yvoTGAAqS3KYWHyg_lbAEzpbBHGx8IgQyVvJHsXE2-tCU1D_2G5LhqYHh1vlzAN15iY3jcRkMvzGiZzmVvJZxTbhA9ofDjFzwNaDnifk3DnFfpKV5PiAbrwNOoPTzrjBOUvWdrjsluAgNuRbmk8-f5Ed0oRe2vxC6ft0gNeoyBUgxFL2qKx0TnLjIouHiRs3PZEWjPlxh-70DGo7pmqvc3gC991Yq3o2Ypm3zWenbZqtijzbZOIDCXYSZo7xwa_wl1lvgachd-U-tJbHEFYSKu8hNnGbeJQFtD-n25iurPOF36Q6U4J7e0ZxBTwvN6A';
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