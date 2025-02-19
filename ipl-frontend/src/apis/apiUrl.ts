import { IPL_BACKEND_SERVICE_HOST, LOCALHOST } from "../enum/EnumDeclare";
export const teamsEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST : IPL_BACKEND_SERVICE_HOST}:8081/teams`;
export const teamInfoEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST : IPL_BACKEND_SERVICE_HOST}:8081/team/`;
export const teamMatchesEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST : IPL_BACKEND_SERVICE_HOST}:8081/matches/`;
export const oktaUrlEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST : IPL_BACKEND_SERVICE_HOST}:8081/oauth2/token`;
