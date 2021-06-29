import axios from 'axios';
import {teamsEndpoint} from './apiUrl';

export const getTeams = async () => {
    return await axios.get<string[]>(teamsEndpoint);
}
