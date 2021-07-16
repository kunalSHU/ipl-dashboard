import React from 'react';
import Teams from '../components/Teams'
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

const TeamPage: React.FC = () => {

    const classes = useStyles();

    return (
        <>
            <div className="TeamPage">
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Team Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Teams />
            </div>
        </>
    )
}

export default TeamPage;
