import React, {useEffect, useState} from 'react';
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
  cityArray,
  saunaArray,
  mushroomArray,
  berryArray,
  pastryArray,
} from '../utils/data';
import {colorSet, useStyles, safeAreaStyle} from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import CardView from '../components/CardView';

const BadgesDetail = ({route, navigation}) => {
  const onPress = () => {
    navigation.goBack();
  };
  const {id, name} = route.params;
  const [array, setArray] = useState(cityArray);

  const switchId = () => {
    switch (id) {
      case 2:
        setArray(mushroomArray);
        break;
      case 3:
        setArray(saunaArray);
        break;
      case 4:
        setArray(berryArray);
        break;
      case 5:
        setArray(pastryArray);
        break;
      default:
        setArray(cityArray);
        break;
    }
  };

  useEffect(() => {
    switchId();
  }, []);

  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View style={safeAreaStyle.AndroidSafeArea}>
        <AppBarBackButton title={'Badge'} onPress={onPress}></AppBarBackButton>
        <Text style={[fontStyle.Title, {marginStart: 20, marginTop: 10}]}>
          Level {id}: {name}
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
