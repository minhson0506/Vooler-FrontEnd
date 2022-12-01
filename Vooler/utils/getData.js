import {useTeam, useUser} from '../hooks/ApiHooks';
import {nameArray} from '../utils/data';
import {
  dayTarget,
  weekFirstTarget,
  weekSecondTarget,
  weekThirdTarget,
} from '../utils/data';

const {getTeamRecordByDate, getAllTeamRecords} = useTeam();
const {getAllRecordsByUser, getUserRecordwithDate} = useUser();

const getTeamData = async (day, context) => {
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
      } else {
        setRank(0);
      }
    }
  } catch (error) {
    console.log('No data in this day', error);
    setTeamData([]);
  }
};

const getTeamDataYesterday = async (day, context) => {
  const {team, token, user, uid, setTeamDataYesterday} = context;
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
      setTeamDataYesterday(newArray);
    }
  } catch (error) {
    console.log('No data in this day', error);
    setTeamDataYesterday([]);
  }
};

const fetchStep = async (day, context) => {
  const {token, setStep} = context;
  try {
    const userData = await getAllRecordsByUser(token);
    if (userData) {
      const array = userData.records;
      for (const element in array) {
        if (array[element].record_date == day) {
          setStep(array[element].step_count_for_date);
        }
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const getTodayStep = async (context) => {
  const {token, setCurrentStep, setCurrentWeekStep, loading, setLoading} =
    context;
  try {
    const date = getToday();
    const response = await getUserRecordwithDate(date, token);
    if (response) {
      const array = response.records;
      for (const element in array) {
        if (array[element].record_date == getToday()) {
          setCurrentStep(array[element].step_count_for_date);
        }
      }
      setCurrentWeekStep(response.total_steps_accumulated);
    }
    setLoading(!loading);
  } catch (error) {
    console.log('error', error);
  }
};

const getTeamDataToday = async (context) => {
  const {team, token, user, uid, setRank} = context;
  try {
    const response = await getTeamRecordByDate(team, getToday(), token);

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
      const userStatus = newArray.filter((element) => element[1] == user);
      if (userStatus.length > 0) {
        setRank(userStatus[0][0]);
      } else {
        setRank(0);
      }
    }
  } catch (error) {
    console.log('No data in this day', error);
  }
};

const getWeekBadge = (array, context, index) => {
  const {currentWeekStep, setBadgeStepWeek} = context;
  if (currentWeekStep < array[0].name) setBadgeStepWeek(0 + index);
  else if (currentWeekStep < array[1].name) setBadgeStepWeek(1 + index);
  else if (currentWeekStep < array[2].name) setBadgeStepWeek(2 + index);
  else if (currentWeekStep < array[3].name) setBadgeStepWeek(3 + index);
  else if (currentWeekStep < array[4].name) setBadgeStepWeek(4 + index);
  else if (currentWeekStep < array[5].name) setBadgeStepWeek(5 + index);
  else setBadgeStepWeek(6 + index);
};

const getBadge = (context) => {
  const {currentStep, currentWeekStep, rank, setBadgeRank, setBadgeStepDay} =
    context;
  if (currentStep < dayTarget[0].name) setBadgeStepDay(0);
  else if (currentStep < dayTarget[1].name) setBadgeStepDay(1);
  else if (currentStep < dayTarget[2].name) setBadgeStepDay(2);
  else if (currentStep < dayTarget[3].name) setBadgeStepDay(3);
  else if (currentStep < dayTarget[4].name) setBadgeStepDay(4);
  else if (currentStep < dayTarget[5].name) setBadgeStepDay(5);
  else setBadgeStepDay(6);

  if (currentWeekStep < weekSecondTarget[0].name) {
    getWeekBadge(weekFirstTarget, context, 0);
  } else if (currentWeekStep < weekThirdTarget[0].name) {
    getWeekBadge(weekSecondTarget, context, 6);
  } else {
    getWeekBadge(weekThirdTarget, context, 12);
  }

  switch (rank) {
    case 1:
      setBadgeRank(6);
      break;
    case 2:
      setBadgeRank(5);
      break;
    case 3:
      setBadgeRank(4);
      break;
    case 4:
      setBadgeRank(3);
      break;
    case 5:
      setBadgeRank(2);
      break;
    case 6:
      setBadgeRank(1);
      break;
    default:
      setBadgeRank(0);
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

const getToday = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  let today = year + '-' + month + '-' + date;
  if (month < 10) {
    if (date < 10) {
      today = year + '-0' + month + '-0' + date;
    } else today = year + '-0' + month + '-' + date;
  } else {
    if (date < 10) {
      today = year + '-' + month + '-0' + date;
    } else today = year + '-' + month + '-' + date;
  }
  return today;
};

export {
  getTeamData,
  getTeamDataYesterday,
  getAllTeams,
  getToday,
  fetchStep,
  getBadge,
  getTodayStep,
  getTeamDataToday,
};
