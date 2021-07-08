import React, { useEffect } from 'react'
import { ITeamMatch } from './Matches';

interface IProps {
    teamMatch: ITeamMatch
}

const Match: React.FC<IProps> = ({teamMatch}) => {

    useEffect(() => {
        console.log(teamMatch);
        return () => {
            
        }
    }, [])

    return (
        <>
            <p>{teamMatch.city}</p>
        </>
    )
}

export default Match;
