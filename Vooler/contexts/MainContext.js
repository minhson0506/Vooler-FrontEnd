import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [loadFont, setLoadFont] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState('fetching...');
  const [salt, setSalt] = useState();
  const [team, setTeam] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState();
  const [rank, setRank] = useState();
  const [teamData, setTeamData] = useState([]);
  const [teamRank, setTeamRank] = useState([]);
  const [badgeDay, setBadgeDay] = useState(0);
  const [badgeWeek, setBadgeWeek] = useState(0);

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
        badgeDay,
        setBadgeDay,
        badgeWeek,
        setBadgeWeek,
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
