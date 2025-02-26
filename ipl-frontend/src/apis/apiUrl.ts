import { IPL_BACKEND_SERVICE_HOST, LOCALHOST, LOCALHOST_URL } from "../enum/EnumDeclare";
export const teamsEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST_URL : IPL_BACKEND_SERVICE_HOST}/api/teams`;
export const teamInfoEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST_URL : IPL_BACKEND_SERVICE_HOST}/api/team/`;
export const teamMatchesEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST_URL : IPL_BACKEND_SERVICE_HOST}/api/matches/`;
export const oktaUrlEndpoint = `http://${window.location.hostname === LOCALHOST ? LOCALHOST_URL : IPL_BACKEND_SERVICE_HOST}/api/oauth2/token`;
