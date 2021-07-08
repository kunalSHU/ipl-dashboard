import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { getMatchesForTeam } from '../apis/apiService'
import Match from './Match';

interface ITeamName {
    teamName: string | undefined
}

export interface ITeamMatch {
    city: string
    date: string
    matchWinner: string
    playerOfMatch: string
    result: string
    resultMargin: string
    team1: string
    team2: string
    tossDecision: string
    tossWinner: string
    umpire1: string
    umpire2: string
    venue: string
}

const Matches: React.FC<ITeamName> = ({teamName}) => {

    const [teamMatches, setTeamMatches] = useState<Array<ITeamMatch>>();

    useEffect(() => {
        getMatchesForTeam(teamName).then(res => {
            setTeamMatches(res.data)
        })
        return () => {
        }
    }, [teamName])

    return (
        <>
           <h1>Matches for {teamName} be listed here</h1>
           {teamMatches?.map((teamMatch, i) => {
               console.log(teamMatch);
               return (<Match key={i} teamMatch={teamMatch}/>)
           })} 
        </>
    )
}

export default Matches
