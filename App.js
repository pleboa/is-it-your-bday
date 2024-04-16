import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSpring, a } from '@react-spring/web'

const AgeCounter = (style) => {
  const [ages, setAges] = useState([]);
  const birthday = "April, 19, 2002";

  function createData(unit, value) {
    return { unit, value };
  }

  const getTime = () => {
    const time = Date.now() - Date.parse(birthday);
    const today = new Date();
    const year = today.getFullYear();
    let ageYear = year - 2002;

    const ages = [
      createData("years", ageYear),
      createData("months", (ageYear * 12)),
      createData("weeks", Math.ceil(ageYear * 52.1429)),
      createData("days", Math.floor(time / (1000 * 60 * 60 * 24))),
      createData("hours", Math.floor((time / (1000 * 60 * 60)))),
      createData("minutes", Math.floor((time / 1000 / 60))),
      createData("seconds", Math.floor((time / 1000)))
    ];

    setAges(ages);
  };

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="counter">
      <div id="titleSeq">
        <img className="cat" src={require('./assets/' + style.imageLeft)} alt='cat' height='221px'></img>
        <div>
          <h1 id="bdaySign">IT IS YOUR BIRTHDAY.</h1>
        </div>
        <img className="cat" src={require('./assets/' + style.imageRight)} alt='cat' height='221'></img>
      </div>
      <div id="ages" style={{ fontFamily: 'Shadows Into Light' }}>
        <p> You are approximately </p>
        {ages.map((age) => (
          <p align="center">{age.value} {age.unit} old </p>
        ))}
        <span id="play"> Play Me! </span>
        <audio controls loop>
          <source src={require('./assets/lazy-cat-jazz.mp3')} type="audio/mp3"></source>
        </audio>
      </div>


    </div>
  );
};

const OnlyShowOnBDay = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const birthMonth = 4;
  const birthDay = 19;

  const getTime = () => {
    const today = new Date();
    let birthday = `April, 19, ${today.getFullYear()}`;
    let time = Date.parse(birthday) - Date.now();

    if (Date.parse(birthday) < today) {
      birthday = `April, 19, ${today.getFullYear() + 1}`;
      time = Date.parse(birthday) - Date.now();
    }

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  }

  React.useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (month === birthMonth && day === birthDay ? <ValidationField/> :
    <div id="onlyShow">
      <h1> Woah woah slow down there cowgirl, check back in {days} days {hours} hours {minutes} minutes {seconds} seconds </h1>
    </div>)
}

const ValidationField = () => {
  const [passcode, setPasscode] = useState();
  const [wrong, setWrong] = useState(false);
  const [flipped, set] = useState(false)
  const mai = "MAI-THAI";
  const hoa = "HOAWEI";
  const [styleSettings, setStyle] = useState({
    imageLeft: "cat-tail.gif",
    imageRight: "cat-gif.gif"
  });

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const verify = () => {
    if (passcode === mai) {
      setWrong(false);
      set(true);
      document.getElementsByTagName('body')[0].style.backgroundImage = "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)";
    }
    else if (passcode === hoa) {
      setWrong(false);
      set(true);
      document.getElementsByTagName('body')[0].style.backgroundImage = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
      let tempStyle = {};
      tempStyle['imageLeft'] = "miffy.png";
      tempStyle['imageRight'] = "bouqet.png";
      setStyle (tempStyle);
    }
    else {
      setWrong(true);
    }
  }


  return (
    <div>
      <a.div
        className={`c`}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      >
        <AgeCounter id="ageCounter" background={styleSettings.background} imageLeft={styleSettings.imageLeft} imageRight={styleSettings.imageRight}/>
      </a.div>


      <a.div
        className={`c`}
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div id="passcode">
            <TextField
              error={wrong}
              label="Passcode"
              helperText="Please enter the passcode I provided"
              onChange={(event) => {
                setPasscode(event.target.value);
              }}
            />
            <Button variant="contained" onClick={verify}>Submit</Button>
          </div>
        </Box>
      </a.div>
    </div>
  )
}

function App() {
  return (
    <OnlyShowOnBDay/>
  );
}

export default App;
