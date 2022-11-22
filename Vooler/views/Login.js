import React from 'react';
import {safeAreaStyle} from '../utils/GlobalStyle';
import {AppBarIcon} from '../components/AppBar';
import LoginForm from '../components/LoginForm';
import PropTypes from 'prop-types';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Login = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Main');
  };
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
          <LoginForm onPress={onPress}></LoginForm>
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

Login.propTypes = {navigation: PropTypes.object};

export default Login;
