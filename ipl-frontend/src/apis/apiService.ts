import axios from 'axios';
import {teamsEndpoint} from './apiUrl';

export const getTeams = () => {
    return axios.get<string[]>(teamsEndpoint);
}
