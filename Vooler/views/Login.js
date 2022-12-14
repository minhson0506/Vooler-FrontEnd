import React, { useContext, useEffect } from 'react';
import { safeAreaStyle } from '../utils/GlobalStyle';
import { AppBarIcon } from '../components/AppBar';
import LoginForm from '../components/LoginForm';
import PropTypes from 'prop-types';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../hooks/ApiHooks';
import { MainContext } from '../contexts/MainContext';

const Login = ({ navigation }) => {
  const { getSalt } = useAuth();
  const { setSalt, salt } = useContext(MainContext);

  const onPress = () => {
    navigation.navigate('Register');
  };

  const checkSalt = async () => {
    const response = await getSalt();
    if (response) {
      setSalt(response.salt);
    }
  };

  // load salt for encoding if salt is null
  useEffect(() => {
    if (salt == '') {
      checkSalt();
    }
  }, []);

  return (
    <View style={safeAreaStyle.AndroidSafeArea}>
      <TouchableOpacity
        style={{ flex: 1 }}
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

Login.propTypes = { navigation: PropTypes.object };

export default Login;
