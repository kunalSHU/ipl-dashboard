import React from 'react'

interface ITeamName {
    teamName: string | undefined
}

const Matches: React.FC<ITeamName> = ({teamName}) => {
    return (
        <>
           <h1>Matches for {teamName} be listed here</h1> 
        </>
    )
}

export default Matches
