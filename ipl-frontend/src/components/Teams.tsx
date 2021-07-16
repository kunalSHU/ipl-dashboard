import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { getTeams } from '../apis/apiService';
import { resolveModuleNameFromCache } from 'typescript';
import history from '../history';
import Grid from '@material-ui/core/Grid';

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
  const [teamObj, setTeamObj] = useState<any[]>([]);
  const [sessionExpired, setSessionExpired] = useState(false); 

  useEffect(() => {
    console.log("in teams component")
    getTeams().then(res => {
      setTeams(res.data);
    }).catch(err => {
      console.log("this is the error " + err)
      setSessionExpired(true);
    });
    return () => {
    }
  }, [])

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
            {teams.map((team) => (
              <ButtonBase
                focusRipple
                key={team}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: '25%',
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(/Users/kunalshukla/ipl-dashboard/ipl-frontend/src/CSK.jpg)`,
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
                    {team}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            ))}
          </div>
        </Grid>
      </Grid>
      {sessionExpired &&  <div>Session Expired. Please use new token</div>}
    </>
  )
}

export default Teams
