import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    letter: {
        padding: '5px 10px',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        userSelect: 'none',
        margin: '0 5px',
        width: 20
    }
}));

const Letter = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.letter}>
            {children}
        </div>
    );
};

Letter.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Letter;
