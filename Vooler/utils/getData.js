import {useTeam, useUser} from '../hooks/ApiHooks';
import {nameArray} from '../utils/data';

const {getTeamRecordByDate, getAllTeamRecords} = useTeam();
const {getAllRecordsByUser, getUserRecordwithDate} = useUser();

const getTeamData = async (day, context) => {
  console.log('start to get team data');
  const {team, token, user, uid, setRank, setTeamData} = context;
  try {
    const response = await getTeamRecordByDate(team, day, token);

    var userData = [];
    for (const index in response.team_members) {
      if (response.team_members[index].total_steps_accumulated != null) {
        if (uid != response.team_members[index].uid) {
          userData.push({
            uid: response.team_members[index].uid,
            name: nameArray[response.team_members[index].uid],
            step: response.team_members[index].total_steps_accumulated,
          });
        } else {
          userData.push({
            uid: response.team_members[index].uid,
            name: user,
            step: response.team_members[index].total_steps_accumulated,
          });
        }
      }
    }
    const sortedArray = userData.sort((a, b) => b.step - a.step);
    const newArray = sortedArray.map((element, index) => {
      return [index + 1, element.name, element.step];
    });
    if (newArray) {
      setTeamData(newArray);
      const userStatus = newArray.filter((element) => element[1] == user);
      if (userStatus.length > 0) {
        setRank(userStatus[0][0]);
      }
    }
  } catch (error) {
    console.log('No data in this day', error);
    setTeamData([]);
  }
};

const getAllTeams = async (day, context) => {
  const {token, setTeamRank} = context;
  try {
    const response = await getAllTeamRecords(day, token);
    const teamData = response.teams.filter((element) => {
      return element.total_team_steps_accumulated != null;
    });
    const sortedData = teamData.sort(
      (a, b) => b.total_team_steps_accumulated - a.total_team_steps_accumulated
    );
    const newArray = sortedData.map((element, index) => {
      return [
        index + 1,
        element.team_name,
        element.total_team_steps_accumulated,
      ];
    });
    setTeamRank(newArray);
  } catch (error) {
    console.log('No data for this week', error);
    setTeamRank([]);
  }
};

const getDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  return year + '-' + month + '-' + date;
};

const fetchStep = async (day, context) => {
  const {token, setStep, setWeekStep} = context;
  try {
    const userData = await getAllRecordsByUser(token);
    if (userData) {
      const array = userData.records;
      console.log('record', userData.records);
      for (const element in array) {
        if (array[element].record_date == day) {
          setStep(array[element].step_count_for_date);
        }
      }
      const response = await getUserRecordwithDate(day, token);
      if (response) setWeekStep(response.total_steps_accumulated);
    }
  } catch (error) {
    console.log('error', error);
  }
};

export {getTeamData, getAllTeams, getDate, fetchStep};
