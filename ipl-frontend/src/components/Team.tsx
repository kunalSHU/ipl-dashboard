import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getTeamInfo } from '../apis/apiService';
import history from '../history';
import Matches from './Matches';

interface ITeam {
    teamName: string
}

interface ITeamInfo {
    id: number
    teamName: string
    totalMatches: number
    totalWins: number
}

const Team = () => {

    const team : ITeam = useParams();
    const [teamInfo, setTeamInfo] = useState<ITeamInfo>();

    useEffect(() => {
        getTeamInfo(decodeURI(team.teamName)).then(res => {
            setTeamInfo(res.data);
        })

        return () => {
            history.go(0)
        }
    }, [])

    return (
        <>
            <div id="teamInfo">
                <h1>{teamInfo?.teamName}</h1>
                <p>Total Wins: {teamInfo?.totalWins}</p>
                <p>Total Matches: {teamInfo?.totalMatches}</p>
            </div>
            <Matches teamName={teamInfo?.teamName}/>
        </>
    )
}

export default Team
