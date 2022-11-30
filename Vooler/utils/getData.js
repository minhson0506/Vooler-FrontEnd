import {useTeam, useUser} from '../hooks/ApiHooks';
import {nameArray} from '../utils/data';
import {
  dayTarget,
  quoteArray,
  weekFirstTarget,
  weekSecondTarget,
  weekThirdTarget,
} from '../utils/data';

const {getTeamRecordByDate, getAllTeamRecords} = useTeam();
const {getAllRecordsByUser, getUserRecordwithDate} = useUser();

const getTeamData = async (day, context) => {
  console.log('start to get team data');
  const {team, token, user, uid, setRank, setTeamData, rank} = context;
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

const fetchStep = async (day, context) => {
  console.log('start fetch step', day);
  const {
    token,
    setStep,
    setWeekStep,
    step,
    currentWeekStep,
    setCurrentStep,
    setCurrentWeekStep,
    loading,
    setLoading,
  } = context;
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
  const {
    token,
    setStep,
    setWeekStep,
    step,
    currentWeekStep,
    setCurrentStep,
    setCurrentWeekStep,
    loading,
    setLoading,
  } = context;
  try {
    const userData = await getAllRecordsByUser(token);
    if (userData) {
      const array = userData.records;
      for (const element in array) {
        if (array[element].record_date == getDate()) {
          setCurrentStep(array[element].step_count_for_date);
          setLoading(!loading);
        }
      }
      const response = await getUserRecordwithDate(getDate(), token);
      if (response) {
        setCurrentWeekStep(response.total_steps_accumulated);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

const getWeekBadge = (array, context) => {
  const {currentWeekStep, badgeStepWeek, setBadgeStepWeek} = context;
  if (currentWeekStep < array[0].name) setBadgeStepWeek(0 + badgeStepWeek);
  else if (currentWeekStep < array[1].name) setBadgeStepWeek(1 + badgeStepWeek);
  else if (currentWeekStep < array[2].name) setBadgeStepWeek(2 + badgeStepWeek);
  else if (currentWeekStep < array[3].name) setBadgeStepWeek(3 + badgeStepWeek);
  else if (currentWeekStep < array[4].name) setBadgeStepWeek(4 + badgeStepWeek);
  else if (currentWeekStep < array[5].name) setBadgeStepWeek(5 + badgeStepWeek);
  else setBadgeStepWeek(6 + badgeStepWeek);
};

const getBadge = (context) => {
  const {
    currentStep,
    currentWeekStep,
    rank,
    setBadgeRank,
    setBadgeStepDay,
    setBadgeStepWeek,
  } = context;
  console.log(
    `day currentStep: ${currentStep}, currentWeekStep: ${currentWeekStep}, rank: ${rank}`
  );
  if (currentStep < dayTarget[0].name) setBadgeStepDay(0);
  else if (currentStep < dayTarget[1].name) setBadgeStepDay(1);
  else if (currentStep < dayTarget[2].name) setBadgeStepDay(2);
  else if (currentStep < dayTarget[3].name) setBadgeStepDay(3);
  else if (currentStep < dayTarget[4].name) setBadgeStepDay(4);
  else if (currentStep < dayTarget[5].name) setBadgeStepDay(5);
  else setBadgeStepDay(6);

  if (currentWeekStep < weekSecondTarget[0].name) {
    setBadgeStepWeek(0);
    getWeekBadge(weekFirstTarget, context);
  } else if (currentWeekStep < weekThirdTarget[0].name) {
    setBadgeStepWeek(6);
    getWeekBadge(weekSecondTarget, context);
  } else {
    setBadgeStepWeek(12);
    getWeekBadge(weekThirdTarget, context);
  }

  switch (rank) {
    case 0:
      setBadgeRank(0);
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

const getDate = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  return year + '-' + month + '-' + date;
};

export {getTeamData, getAllTeams, getDate, fetchStep, getBadge, getTodayStep};
