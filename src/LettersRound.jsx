import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect, useState } from 'react';
import { shuffle, random } from 'lodash';
import { v4 } from 'uuid';
import words from './dictionary_compact.json';

import Letter from './Letter';

const addLetters = ({ letter, amount, previousLetters = [] }) => {
  let letters = previousLetters;
  for (let i = 0; i < amount; i++) {
    letters = [...letters, letter];
  }
  return letters;
};
const setup = () => {
  let VOWELS = [];
  VOWELS = addLetters({ letter: 'a', amount: 15, previousLetters: VOWELS });
  VOWELS = addLetters({ letter: 'e', amount: 21, previousLetters: VOWELS });
  VOWELS = addLetters({ letter: 'i', amount: 13, previousLetters: VOWELS });
  VOWELS = addLetters({ letter: 'o', amount: 13, previousLetters: VOWELS });
  VOWELS = addLetters({ letter: 'u', amount: 5, previousLetters: VOWELS });
  let CONSONANTS = [];
  CONSONANTS = addLetters({
    letter: 'b',
    amount: 2,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'c',
    amount: 3,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'd',
    amount: 6,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'f',
    amount: 2,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'g',
    amount: 3,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'h',
    amount: 2,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'j',
    amount: 1,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'k',
    amount: 1,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'l',
    amount: 5,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'm',
    amount: 4,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'n',
    amount: 8,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'p',
    amount: 4,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'q',
    amount: 1,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'r',
    amount: 9,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 's',
    amount: 9,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 't',
    amount: 9,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'v',
    amount: 1,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'w',
    amount: 1,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'x',
    amount: 1,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'y',
    amount: 1,
    previousLetters: CONSONANTS
  });
  CONSONANTS = addLetters({
    letter: 'z',
    amount: 1,
    previousLetters: CONSONANTS
  });
  return { VOWELS: shuffle(VOWELS), CONSONANTS: shuffle(CONSONANTS) };
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
  letters: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px 0',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const LettersRound = () => {
  const classes = useStyles();
  const [letters, setLetters] = useState(setup());
  const [roundLetters, setRoundLetters] = useState([]);
  const [time, setTime] = useState(30);
  const [active, activateCountdown] = useState(false);
  const canAddMore = roundLetters.length < 9;
  const addConsonant = () => {
    if (!canAddMore) {
      return;
    }
    const { CONSONANTS: availableConsonant } = letters;
    const randomIndex = random(0, availableConsonant.length - 1);
    const randomConsonant = availableConsonant[randomIndex];
    setRoundLetters([...roundLetters, randomConsonant]);
    const removed = [...letters.CONSONANTS];
    removed.splice(randomIndex, 1);
    setLetters({
      VOWELS: letters.VOWELS,
      CONSONANTS: removed
    });
  };
  const addVowel = () => {
    if (!canAddMore) {
      return;
    }
    const { VOWELS: availableVowels } = letters;
    const randomIndex = random(0, availableVowels.length - 1);
    const randomVowel = availableVowels[randomIndex];
    setRoundLetters([...roundLetters, randomVowel]);
    const removed = [...letters.VOWELS];
    removed.splice(randomIndex, 1);
    setLetters({
      VOWELS: removed,
      CONSONANTS: letters.CONSONANTS
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
    let wordsFound = 0;
    Object.keys(words).forEach(word => {
      if (word.includes(roundLetters[0])) {
        wordsFound = wordsFound + 1;
      }
    });
    console.log(wordsFound);
  };
  const reset = () => {
    setLetters(setup());
    setRoundLetters([]);
    setTime(30);
    activateCountdown(false);
  };
  return (
    <>
      <IconButton aria-label="delete" onClick={reset}>
        <RefreshIcon fontSize="default" />
      </IconButton>
      <Button onClick={addVowel} disabled={!canAddMore}>
        Add Vowel
      </Button>
      <Button onClick={addConsonant} disabled={!canAddMore}>
        Add Consonant
      </Button>
      <div className={classes.letters}>
        {roundLetters.map(letter => (
          <Letter key={`letter-${letter}-${v4()}`}>
            {letter.toUpperCase()}
          </Letter>
        ))}
      </div>
      {!canAddMore && (
        <div className={classes.margin}>
          <Typography variant="h6">{time}</Typography>
          <CircularProgress variant="static" value={normalise(time / 2)} />
          <Button color="primary" onClick={startCountDown} disabled={active}>
            Start countdown
          </Button>
        </div>
      )}
    </>
  );
};

LettersRound.propTypes = {};

export default LettersRound;
