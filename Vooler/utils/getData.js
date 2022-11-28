import {useTeam, useUser} from '../hooks/ApiHooks';
import {nameArray} from '../utils/data';

const {getTeamRecordByDate, getAllTeamRecords} = useTeam();

const getTeamData = async (day, context) => {
  const {team, token, user, uid, setRank, setTeamData} = context;
  const response = await getTeamRecordByDate(team, day, token);

  var userData = [];
  for (const element in response.team_members) {
    if (uid != response.team_members[element].uid) {
      userData.push({
        uid: response.team_members[element].uid,
        name: nameArray[response.team_members[element].uid],
        step: response.team_members[element].total_steps_accumulated,
      });
    } else {
      userData.push({
        uid: response.team_members[element].uid,
        name: user,
        step: response.team_members[element].total_steps_accumulated,
      });
    }
  }
  const sortedArray = userData.sort((a, b) => b.step - a.step);
  const newArray = sortedArray.map((element, index) => {
    return [index + 1, element.name, element.step];
  });
  if (newArray) {
    const userStatus = newArray.filter((element) => element[1] == user);
    setTeamData(newArray);
    setRank(userStatus[0][0]);
  }
};

const getAllTeams = async (day, context) => {
  const {token, setTeamRank} = context;

  const response = await getAllTeamRecords(day, token);
  const teamData = response.teams;
  const sortedData = teamData.sort(
    (a, b) => b.total_team_steps_accumulated - a.total_team_steps_accumulated
  );
  const newArray = sortedData.map((element, index) => {
    return [index + 1, element.team_name, element.total_team_steps_accumulated];
  });
  setTeamRank(newArray);
};

export {getTeamData, getAllTeams};
