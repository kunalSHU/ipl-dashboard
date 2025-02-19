import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { getOktaToken, getTeams } from '../apis/apiService';
import { resolveModuleNameFromCache } from 'typescript';
import history from '../history';
import Grid from '@material-ui/core/Grid';
import {cskImage, miImage, pwImage,srhImage,rcbImage,rrImage,kkrImage,glImage,rpsImage,ktkImage,dcImage,kxipImage,dchImage} from './image';

interface IFullTeam {
  teamName: string
  teamUrl: string
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const Teams = () => {

  const classes = useStyles();
  const [teams, setTeams] = useState<string[]>([]);
  const [fullTeams, setFullTeams] = useState<IFullTeam[]>([]);
  const [teamObj, setTeamObj] = useState<any[]>([]);
  const [unexpectedError, setUnexpectedError] = useState(false);
  let fTeams : IFullTeam[] = []; 

  useEffect(() => {
    console.log(window.location.hostname)
    getTokenAndDisplayTeams();
  }, [])

  const getTokenAndDisplayTeams = async () => {
    try {
      let oktaResponse = await getOktaToken();
      sessionStorage.setItem("token", oktaResponse.data.access_token)

      // Get the teams
      let teamsResponse = await getTeams();
      setTeams(teamsResponse.data);
      appendPics(teamsResponse.data);
    } catch (err) {
      console.log(err);
      setUnexpectedError(true)
    }
  }

  const appendPics = (teamData: string[]) => {
    console.log("in append pics function")
    console.log(teamData);
    //fullTeam.push(1);
    teamData.map(team => {
      if (team === "Chennai Super Kings") {
        fTeams = [...fTeams, {teamName: team, teamUrl: cskImage}]
        setFullTeams(fTeams);
      } else if (team === "Mumbai Indians") {

        fTeams = [...fTeams, {teamName: team, teamUrl: miImage}]
        setFullTeams(fTeams);

      } else if (team === "Pune Warriors") {

        fTeams = [...fTeams, {teamName: team, teamUrl: pwImage}]
        setFullTeams(fTeams);

      } else if (team === "Sunrisers Hyderabad") {

        fTeams = [...fTeams, {teamName: team, teamUrl: srhImage}]
        setFullTeams(fTeams);
      } else if (team === "Rajasthan Royals") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: rrImage}]
        setFullTeams(fTeams);
      } else if (team === "Royal Challengers Bangalore") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: rcbImage}]
        setFullTeams(fTeams);
      } else if (team === "Kolkata Knight Riders") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: kkrImage}]
        setFullTeams(fTeams);
      } else if (team === "Gujarat Lions") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: glImage}]
        setFullTeams(fTeams);
      } else if (team === "Rising Pune Supergiant") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: rpsImage}]
        setFullTeams(fTeams);
      } else if (team === "Kochi Tuskers Kerala") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: ktkImage}]
        setFullTeams(fTeams);
      } else if (team === "Delhi Capitals") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: dcImage}]
        setFullTeams(fTeams);
      } else if (team === "Kings XI Punjab") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: kxipImage}]
        setFullTeams(fTeams);
      } else if (team === "Deccan Chargers") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: dchImage}]
        setFullTeams(fullTeams);
      } else if (team === "Rising Pune Supergiants") {
        
        fTeams = [...fTeams, {teamName: team, teamUrl: rpsImage}]
        setFullTeams(fTeams);
      }
    })
  }

  const handleChange = (event: any) => {
    console.log(event.target.innerText);

    // switch route to Team component
    history.push(`/teams/${event.target.innerText}`)
    history.go(0) // render the component automatically
  }

  return (
    <>
      <Grid container direction='row' justify="flex-start">
        <Grid key='0' item xs={12}>
          <div className={classes.root}>
            {fullTeams.map((team) => (
              <ButtonBase
                focusRipple
                key={team.teamName}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: '25%',
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${team.teamUrl})`,
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                    onClick={handleChange}
                  >
                    {team.teamName}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            ))}
          </div>
        </Grid>
      </Grid>
      {unexpectedError &&  <div>Unexpected error occurred. Please try again later.</div>}
      {/* {JSON.stringify(fullTeams)} */}
    </>
  )
}

export default Teams
