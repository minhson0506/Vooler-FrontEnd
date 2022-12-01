import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {AppBarBackButton} from '../components/AppBar';
import {
  dayTarget,
  rankTarget,
  weekFirstTarget,
  weekSecondTarget,
  weekThirdTarget,
} from '../utils/data';
import {colorSet, useStyles, safeAreaStyle} from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import CardView from '../components/CardView';
import {MainContext} from '../contexts/MainContext';

const BadgesDetail = ({route, navigation}) => {
  const {badgeRank, badgeStepDay, badgeStepWeek, loading, setLoading} =
    useContext(MainContext);

  const onPress = () => {
    navigation.goBack();
  };
  const {id, name} = route.params;
  const [array, setArray] = useState(dayTarget);

  const changeArray = (data, index) => {
    if (index == 1) {
      const array = [...data];
      for (let i = 0; i < 6; i++) {
        if (i < badgeStepDay) array[i].state = 3;
        else if (array[i].state == 3) array[i].state = 1;
      }
      console.log('array to change', array);
      return array;
    } else if (index == 2) {
      const array = [...data];
      for (let i = 0; i < 6; i++) {
        if (i < badgeRank) array[i].state = 3;
        else if (array[i].state == 3) array[i].state = 1;
      }
      return array;
    } else if (index == 3) {
      const array = [...data];
      if (badgeStepWeek / 6 < 1) {
        for (let i = 0; i < 6; i++) {
          if (i < badgeStepWeek) array[i].state = 3;
          else if (array[i].state == 3) array[i].state = 1;
        }
        return array;
      } else {
        for (let i = 0; i < 6; i++) {
          array[i].state = 3;
        }
        return array;
      }
    } else if (index == 4) {
      const array = [...data];
      if (badgeStepWeek / 6 < 1) {
        return array;
      } else if (badgeStepWeek / 6 < 2) {
        for (let i = 0; i < 6; i++) {
          if (i < badgeStepWeek - 6) array[i].state = 3;
          else if (array[i].state == 3) array[i].state = 1;
        }
        return array;
      } else {
        for (let i = 0; i < 6; i++) {
          array[i].state = 3;
        }
        return array;
      }
    } else {
      const array = [...data];
      if (badgeStepWeek / 6 < 2) {
        return array;
      } else if (badgeStepWeek / 6 < 3) {
        for (let i = 0; i < 6; i++) {
          if (i < badgeStepWeek - 12) array[i].state = 3;
          else if (array[i].state == 3) array[i].state = 1;
        }
        return array;
      } else {
        for (let i = 0; i < 6; i++) {
          array[i].state = 3;
        }
        return array;
      }
    }
  };
  const switchId = (index) => {
    switch (index) {
      case 2:
        setArray(changeArray(rankTarget, index));
        break;
      case 3:
        setArray(changeArray(weekFirstTarget, index));
        break;
      case 4:
        setArray(changeArray(weekSecondTarget, index));
        break;
      case 5:
        setArray(changeArray(weekThirdTarget, index));
        break;
      default:
        setArray(changeArray(dayTarget, id));
        break;
    }
    // setLoading(!loading);
  };

  useEffect(() => {
    switchId(id);
  }, [loading]);

  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Badge'} onPress={onPress}></AppBarBackButton>
        <Text style={[fontStyle.Title, {marginStart: 20, marginTop: 10}]}>
          Level {id}: {name.toString()}
        </Text>
        <CardView array={array}></CardView>
      </View>
    );
};

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: colorSet.lightGray,
    justifyContent: 'center',
    borderRadius: 15,
    height: 200,
  },
  itemName: {
    textAlign: 'center',
  },
});

BadgesDetail.propTypes = {navigation: PropTypes.object};

export default BadgesDetail;
