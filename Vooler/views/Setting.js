import React from 'react';
import {colorSet, safeAreaStyle} from '../utils/GlobalStyle';
import {AppBarIcon} from '../components/AppBar';
import RegisterForm from '../components/RegisterForm';
import PropTypes from 'prop-types';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import EditForm from '../components/EditForm';

const Settings = ({navigation}) => {
  const onPress = () => {};
  return (
    <View style={safeAreaStyle.AndroidSafeArea}>
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={styles.container}
        >
          <AppBarIcon></AppBarIcon>
          <EditForm onPress={onPress}></EditForm>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

Settings.propTypes = {navigation: PropTypes.object};

export default Settings;
