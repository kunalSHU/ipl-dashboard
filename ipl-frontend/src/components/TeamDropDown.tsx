import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      chip: {
        margin: 2
      },
      noLabel: {
        marginTop: theme.spacing(3)
      }
}));

const TeamDropDown = () => {
    const classes = useStyles();
    const [teams, setTeams] = useState<string[]>([]);
    
    useEffect(() => {
        console.log("Team drop down component loaded");
        axios.get<Array<string>>("http://localhost:8080/teams")
        .then((res) => {
            console.log(res.data);
            setTeams(res.data);
        })
        return () => {
        }
    }, [])
    
    const handleChange = (event : any) => {
        console.log(event.target.value);
    }
    
    return (
    <>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          onChange={handleChange}
        >
          {teams.map(team => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
    )
}

export default TeamDropDown
