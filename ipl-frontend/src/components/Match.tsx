import { Divider, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { ITeamMatch } from './Matches';

interface IProps {
    teamMatch: ITeamMatch
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        left: '42%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },  
}));

const Match: React.FC<IProps> = ({teamMatch}) => {

    const classes = useStyles();

    useEffect(() => {
        console.log(teamMatch);
        return () => {
            
        }
    }, [])

    return (
        <>
        <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
                <ListItemText>
                    {teamMatch.team1} vs {teamMatch.team2}
                </ListItemText>
            </ListItem>
            <Divider />
        </List>
        </>
    )
}

export default Match;
