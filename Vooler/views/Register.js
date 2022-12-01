import React from 'react';
import {safeAreaStyle} from '../utils/GlobalStyle';
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

const Register = ({navigation}) => {
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
          <RegisterForm onPress={onPress}></RegisterForm>
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

Register.propTypes = {navigation: PropTypes.object};

export default Register;
