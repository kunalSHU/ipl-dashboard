import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getTeamInfo } from '../apis/apiService';
import history from '../history';
import Matches from './Matches';
import { PieChart } from 'react-minimal-pie-chart';

import './Team.scss';
import { teamInfoEndpoint } from '../apis/apiUrl';
import { CellWifi } from '@material-ui/icons';
import Grid from "@material-ui/core/Grid";

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
        console.log(window.innerHeight);
        console.log(window.innerWidth);
        getTeamInfo(decodeURI(team.teamName)).then(res => {
            setTeamInfo(res.data);
        })
        .catch(err => {
            console.log("in error")
            return <p>Team not found</p>
        })
        return () => {
            history.go(0)
        }
    }, [team.teamName])

    return (
        <>
            <div id="teamInfo">
                <h1>{teamInfo?.teamName}</h1>
                <p id="wins">Total Wins: {teamInfo?.totalWins}</p>
                <p>Total Matches: {teamInfo?.totalMatches}</p>
            </div>
            <Grid container justify="center">
                    <Grid key='0' item>
                        <PieChart className="pieChart" radius={25} lineWidth={50}
                        data={[
                            { title: 'Wins', value: teamInfo?.totalWins !== undefined ? teamInfo.totalWins : 0, color: '#008000' },
                            { title: 'Losses', value: teamInfo?.totalWins !== undefined ? teamInfo.totalMatches - teamInfo.totalWins : 0, color: '#ff0000' },
                        ]}
                        />
                    </Grid>
                </Grid>
            <div className="teamMatches">
                <Matches teamName={teamInfo?.teamName}/>
            </div>
        </>
    )
}

export default Team
