import { Dialog, DialogContent, Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import React, { useEffect, useRef, useState } from 'react'
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
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        console.log(teamMatch);
        return () => {            
        }
    }, [])

    const handleClick = (matchInfo: any) => {
        console.log(matchInfo);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button onClick={() => handleClick(teamMatch)}>
                <ListItemText>
                    vs {teamMatch.team2}
                    <SportsCricketIcon/>
                </ListItemText>
            </ListItem>
            <Divider />
        </List>
        <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        >
            <DialogContent dividers>
                <Typography gutterBottom>
                {teamMatch.date}
                <br/>
                at {teamMatch.venue}
                <br/>
                {teamMatch.matchWinner} won by {teamMatch.resultMargin} {teamMatch.result} 
                </Typography>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default Match;
