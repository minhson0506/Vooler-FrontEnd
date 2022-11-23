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
    console.log('error status code', err.status);
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
    console.log('body', options.body);
    try {
      const response = await fetch(baseUrl + 'auth/register', options);
      console.log('response', JSON.stringify(response));
      if (response.status != 400) {
        return response.status;
      } else {
        const message = response.error
          ? `${response.message}: ${response.error}`
          : response.message;

        throw new Error(message || response.statusText);
      }
    } catch (err) {
      throw new Error(err.message);
    }
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
    return await doFetch(baseUrl + 'user', options);
  };

  const getUserById = async (userId, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'user/' + userId, options);
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

  const getAllRecordsByUserId = async (userId, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'user/record' + userId, options);
  };

  const getUserRecord = async (userId, startDate, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'user/record' + userId + startDate, options);
  };

  return {
    getAllUsers,
    putUser,
    getUserById,
    getAllRecordsByUserId,
    getUserRecord,
  };
};

const useTeam = () => {
  const getAllTeams = async () => {
    const options = {
      method: 'GET',
    };
    return await doFetch(baseUrl + 'team', options);
  };
  const getTeamInfoByTeamId = async (teamId, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'team' + teamId, options);
  };

  const getTeamRecordByDate = async (teamId, startDate, token) => {
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    return await doFetch(baseUrl + 'team' + teamId + startDate, options);
  };

  return {getTeamInfoByTeamId, getTeamRecordByDate, getAllTeams};
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
