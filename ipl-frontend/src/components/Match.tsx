import { Dialog, DialogContent, Divider, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import SportsCricketIcon from '@material-ui/icons/SportsCricket';
import React, { useEffect, useRef, useState } from 'react'
import { ITeamMatch } from './Matches';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

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

const TabPanel = (props : any) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Match: React.FC<IProps> = ({teamMatch}) => {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(0);

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

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
      };

    return (
        <>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label={teamMatch.team2}/>
                <SportsCricketIcon/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {teamMatch.date} <br/>
                at {teamMatch.venue} <br/>
                {teamMatch.matchWinner} won by {teamMatch.resultMargin} {teamMatch.result} 
            </TabPanel>
        </>
    )
}

export default Match;
