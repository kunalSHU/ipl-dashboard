import React from 'react';
import Teams from '../components/Teams'

const TeamPage: React.FC = () => {
    return (
        <>
            <div className="TeamPage">
                <h1>Team Dashboard</h1>
                <Teams/>
            </div>
        </>
    )
}

export default TeamPage;
