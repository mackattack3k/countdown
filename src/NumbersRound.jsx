import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import SyncIcon from '@material-ui/icons/Sync';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { shuffle, random } from 'lodash';
import { v4 } from 'uuid';
import Letter from './Letter';

const setup = () => {
  let SMALL = [];
  for (let i = 1; i < 11; i++) {
    SMALL = [...SMALL, i, i];
  }
  const BIG = [25, 50, 75, 100];
  return { SMALL: shuffle(SMALL), BIG: shuffle(BIG) };
};
const MIN = 0;
const MAX = 30;
const normalise = value => ((value - MIN) * 100) / (MAX - MIN);
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  numbers: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px 0',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const NumbersRound = () => {
  const classes = useStyles();
  const [numbers, setNumbers] = useState(setup());
  const [selectedNumbers, setSelectedNumber] = useState([]);
  const [time, setTime] = useState(30);
  const [active, activateCountdown] = useState(false);
  const [goalNumber, setGoalNumber] = useState(0);
  const reset = () => {
    setNumbers(setup());
    setSelectedNumber([]);
    setTime(30);
    activateCountdown(false);
    setGoalNumber(0);
  };
  const canAddMore = selectedNumbers.length < 6;
  const canAddMoreBig = numbers.BIG.length > 0;
  const addBigNumber = () => {
    if (!canAddMore || !canAddMoreBig) {
      return;
    }
    const randomBigIndex = random(0, numbers.BIG.length - 1);
    const randomBigNumber = numbers.BIG[randomBigIndex];
    setSelectedNumber([...selectedNumbers, randomBigNumber]);
    const removedBig = [...numbers.BIG];
    removedBig.splice(randomBigIndex, 1);
    setNumbers({
      BIG: removedBig,
      SMALL: numbers.SMALL
    });
  };
  const addSmallNumber = () => {
    if (!canAddMore) {
      return;
    }
    const randomSmallIndex = random(0, numbers.SMALL.length - 1);
    const randomSmallNumber = numbers.SMALL[randomSmallIndex];
    setSelectedNumber([...selectedNumbers, randomSmallNumber]);
    const removedSmall = [...numbers.SMALL];
    removedSmall.splice(randomSmallIndex, 1);
    setNumbers({
      BIG: numbers.BIG,
      SMALL: removedSmall
    });
  };
  useEffect(() => {
    if (!active || time < 1) {
      return;
    }
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, setTime, active]);
  const startCountDown = async () => {
    activateCountdown(true);
  };
  const setGoal = () => {
    setGoalNumber(random(100, 999));
  };
  return (
    <>
      <IconButton aria-label="delete" onClick={reset}>
        <RefreshIcon fontSize="default" />
      </IconButton>
      <Button onClick={addBigNumber} disabled={!canAddMore || !canAddMoreBig}>
        Add big number
      </Button>
      <Button onClick={addSmallNumber} disabled={!canAddMore}>
        Add small number
      </Button>
      <div className={classes.numbers}>
        {selectedNumbers.map(number => (
          <Letter key={`number-${number}-${v4()}`}>{number}</Letter>
        ))}
      </div>
      <div>
        <Typography variant="h5">{goalNumber}</Typography>
        <Button color="primary" onClick={setGoal} disabled={canAddMore || active}>
          <SyncIcon className={classes.extendedIcon} />
          Generate number
        </Button>
      </div>
      {!canAddMore && (
        <div className={classes.margin}>
          <Typography variant="h6">{time}</Typography>
          <CircularProgress variant="static" value={normalise(time / 2)} />
            <Button color="primary" onClick={startCountDown} disabled={active || goalNumber === 0}>
                Start countdown
            </Button>
        </div>
      )}
    </>
  );
};

NumbersRound.propTypes = {};

export default NumbersRound;
