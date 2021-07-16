import axios from 'axios';
import {teamsEndpoint, teamInfoEndpoint, teamMatchesEndpoint} from './apiUrl';

axios.interceptors.request.use(config => {
    console.log("Setting the token in the header before request")
    config.headers.Authorization = 'Bearer eyJraWQiOiJmZzZETkV6OGo4YXJJT2VPa1pCc0pKTjU2bjZaVmlnejZhcThUc1BJMFhjIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnJ5djk4dFRrLWozZGJyTTBZUmpudDZZbmlpUF9aU1JSVVlBeGdNWk5SZHciLCJpc3MiOiJodHRwczovL2Rldi0zMDAwMjc5Mi5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MjY0NTU1NjgsImV4cCI6MTYyNjQ1OTE2OCwiY2lkIjoiMG9hNWpzbGdxbFZ0V3U0VUQ1ZDYiLCJzY3AiOlsiY3VzdG9tX3Njb3BlIl0sInN1YiI6IjBvYTVqc2xncWxWdFd1NFVENWQ2In0.GyOmoHluk1XVUpdQBQzYRcQj5H-gsLyOKbi8JGCB6O_JkHcmesJGxeg1nhxRdXn5RfzJVgC9CbWr6YSOu2HZ2ybFeUl6z7PjV2EuxPYBAjhq82YjX_Gn-kgW1VFY65uALdOq1C5jnZQSETEPniAdVkOUumW6uaxpMyeXNTT_xER_k2hlMoD86PCQHfMxAC7YZ4uo2xW9_zjR6I4SXARP7C-JfJh5I7jOSTmdHhtUHva5Bkfe83TGOLngvw6_37ZGepO1FDOEE_3Q5fs3o8dqSxbipWxK0fQctHPG_PmJxTGlJQ1TreH5OWR2NlKEMBRQGYYJGRjLNAMIMg_YyQ7QFw';
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