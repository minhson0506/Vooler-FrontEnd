import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {baseUrl} from '../utils/variables';

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;

      throw new Error(message || response.statusText);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const useAuth = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + 'auth/login', options);
  };

  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'auth/register', options);
  };

  const getSalt = async () => {
    return await doFetch(baseUrl + 'auth/salt');
  };

  return {postLogin, postUser, getSalt};
};

const useUser = () => {
  const getAllUsers = async (token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'user/all', options);
  };

  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'user/info', options);
  };

  const putUser = async (userId, data, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'user' + userId, options);
  };

  const getAllRecordsByUser = async (token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'user/records', options);
  };

  const getUserRecordwithDate = async (date, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'user/records' + date, options);
  };

  return {
    getAllUsers,
    putUser,
    getUserByToken,
    getAllRecordsByUser,
    getUserRecordwithDate,
  };
};

const useTeam = () => {
  const getAllTeams = async () => {
    return await doFetch(baseUrl + 'team/all');
  };
  const getTeamInfoByTeamId = async (teamId, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'team' + teamId, options);
  };

  const getTeamRecordByDate = async (teamId, endDate, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(
      baseUrl + 'team?endDate=' + endDate + '&teamId=' + teamId,
      options
    );
  };

  const getAllTeamRecords = async (endDate, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'team?endDate=' + endDate, options);
  };

  return {
    getTeamInfoByTeamId,
    getTeamRecordByDate,
    getAllTeams,
    getAllTeamRecords,
  };
};

const useRecord = () => {
  const postRecord = async (record, token) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(record),
    };
    return await doFetch(baseUrl + 'record', options);
  };

  return {postRecord};
};

export {useAuth, useUser, useTeam, useRecord};
