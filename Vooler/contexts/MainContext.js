import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [loadFont, setLoadFont] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState('fetching...');
  const [salt, setSalt] = useState();
  const [team, setTeam] = useState();

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
