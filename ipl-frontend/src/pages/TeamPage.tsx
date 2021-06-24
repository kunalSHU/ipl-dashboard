import React from 'react';
import TeamDropDown from '../components/TeamDropDown'

const TeamPage: React.FC = () => {
    return (
        <>
            <div className="TeamPage">
                <h1>Team Dashboard</h1>
                <TeamDropDown/>
            </div>
        </>
    )
}

export default TeamPage;
