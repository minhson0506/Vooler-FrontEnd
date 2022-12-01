import {Icon} from '@rneui/base';
import * as React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import {PropTypes} from 'prop-types';

const AppBarBackButton = ({onPress, title, icon, team}) => {
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Ionicons
            name="arrow-back"
            size={30}
            style={{marginStart: 20}}
            onPress={onPress}
          />
        </View>
        <Text style={[fontStyle.Headline, {color: colorSet.primary}]}>
          {title}
        </Text>
        {icon == true ? (
          <TouchableOpacity
            onPress={team}
            style={{width: 50, justifyContent: 'center', paddingEnd: 20}}
          >
            <Icon
              name="people"
              type="ionicon"
              size={30}
              color={colorSet.black}
            ></Icon>
          </TouchableOpacity>
        ) : (
          <View style={{width: 50}}></View>
        )}
      </View>
    );
};

const AppBarIcon = () => (
  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
    <Image
      source={require('../assets/app_icon.png')}
      style={{
        width: 120,
        height: 40,
      }}
    />
  </View>
);

AppBarBackButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export {AppBarIcon, AppBarBackButton};
