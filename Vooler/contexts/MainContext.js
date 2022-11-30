import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [loadFont, setLoadFont] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [uid, setUid] = useState();
  const [token, setToken] = useState('fetching...');
  const [salt, setSalt] = useState();

  const [team, setTeam] = useState(1);
  const [teamData, setTeamData] = useState([]);
  const [teamRank, setTeamRank] = useState([]);

  const [loading, setLoading] = useState(false);

  const [rank, setRank] = useState(0);
  const [step, setStep] = useState(0);
  const [weekStep, setWeekStep] = useState(0);

  const [badgeStepDay, setBadgeStepDay] = useState(0);
  const [badgeStepWeek, setBadgeStepWeek] = useState(0);
  const [badgeRank, setBadgeRank] = useState(0);

  return (
    <MainContext.Provider
      value={{
        loadFont,
        setLoadFont,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        token,
        setToken,
        salt,
        setSalt,
        team,
        setTeam,
        loading,
        setLoading,
        uid,
        setUid,
        rank,
        setRank,
        teamData,
        setTeamData,
        teamRank,
        setTeamRank,
        badgeStepDay,
        setBadgeStepDay,
        badgeStepWeek,
        setBadgeStepWeek,
        step,
        setStep,
        weekStep,
        setWeekStep,
        badgeRank,
        setBadgeRank,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
