import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getTeamInfo } from '../apis/apiService';
import history from '../history';
import Matches from './Matches';
import './Team.scss';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface ITeam {
  teamName: string
}

interface ITeamInfo {
  id: number
  teamName: string
  totalMatches: number
  totalWins: number
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Team = () => {

  const team: ITeam = useParams();
  const classes = useStyles();
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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              {teamInfo?.teamName}
            </Typography>
            {/* <Grid container spacing={1} justifyContent="flex-end">
                <Grid item xs={1} > */}
            {/* </Grid>
                </Grid> */}
          </Toolbar>
        </AppBar>
      </div>

      {/* <div id="teamInfo">
                <p id="wins">Total Wins: {teamInfo?.totalWins}</p>
                <p>Total Matches: {teamInfo?.totalMatches}</p>
            </div> */}
      <Button id="link" variant="outlined" href="/teams" color="primary">
        Back to teams page
      </Button>

      {/* <Grid item xs={1}> */}
      <div>
        Total Wins: {teamInfo?.totalWins} <br />
        Total Matches: {teamInfo?.totalMatches}
      </div>

      <div className="teamMatches">
        <Matches teamName={teamInfo?.teamName} />
      </div>
    </>
  )
}

export default Team
