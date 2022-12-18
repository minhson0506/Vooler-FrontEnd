import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppBarBackButton } from '../components/AppBar';
import {
  dayTarget,
  rankTarget,
  weekFirstTarget,
  weekSecondTarget,
  weekThirdTarget,
} from '../utils/data';
import { colorSet, useStyles, safeAreaStyle } from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import CardView from '../components/CardView';
import { MainContext } from '../contexts/MainContext';
import { changeArrayBagde } from '../utils/getData';

const BadgesDetail = ({ route, navigation }) => {
  const { badgeRank, badgeStepDay, badgeStepWeek, loading } =
    useContext(MainContext);

  const onPress = () => {
    navigation.goBack();
  };
  const { id, name } = route.params;
  const [array, setArray] = useState(dayTarget);

  const switchId = (index) => {
    switch (index) {
      case 2:
        setArray(changeArrayBagde(rankTarget, index, badgeRank, badgeStepDay, badgeStepWeek));
        break;
      case 3:
        setArray(changeArrayBagde(weekFirstTarget, index, badgeRank, badgeStepDay, badgeStepWeek));
        break;
      case 4:
        setArray(changeArrayBagde(weekSecondTarget, index, badgeRank, badgeStepDay, badgeStepWeek));
        break;
      case 5:
        setArray(changeArrayBagde(weekThirdTarget, index, badgeRank, badgeStepDay, badgeStepWeek));
        break;
      default:
        setArray(changeArrayBagde(dayTarget, index, badgeRank, badgeStepDay, badgeStepWeek));
        break;
    }
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
        <Text style={[fontStyle.Title, { marginStart: 20, marginTop: 10 }]}>
          Level {id}: {name.toString()}
        </Text>
        <CardView array={array}></CardView>
      </View>
    );
};

BadgesDetail.propTypes = { navigation: PropTypes.object };

export default BadgesDetail;
