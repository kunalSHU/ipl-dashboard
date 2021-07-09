import { Divider, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import React, { useEffect } from 'react'
import { ITeamMatch } from './Matches';

interface IProps {
    teamMatch: ITeamMatch
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '150%',
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
                    vs {teamMatch.team2}
                    <SportsCricketIcon/>
                </ListItemText>
            </ListItem>
            <Divider />
        </List>
        </>
    )
}

export default Match;
