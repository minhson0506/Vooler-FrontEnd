import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input, Text, Button} from '@rneui/base';
import {IconButton} from '@react-native-material/core';
import {useForm, Controller} from 'react-hook-form';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {useAuth, useRecord, useUser} from '../hooks/ApiHooks';
import {generateHash} from '../utils/hash';
import Toast from 'react-native-toast-message';

const LoginForm = ({onPress}) => {
  const [showPassword, setShowPassword] = useState(true);
  const {setIsLoggedIn, setUser, setToken, setTeam, setUid} =
    useContext(MainContext);
  const {getUserByToken} = useUser();
  const {postLogin} = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setUser(data.username);
    console.log('data before hash', data);
    const hashedData = await generateHash(data.username, data.password);
    console.log('hashedData', hashedData);
    const userLogin = {
      userId: hashedData.userId,
      password: hashedData.password,
    };
    try {
      const userData = await postLogin(userLogin);

      if (userData) {
        setToken(userData.token);
        const response = await getUserByToken(userData.token);
        if (response) {
          setUid(response.uid);
        }
        setTeam(userData.user.team_id);
        Toast.show({type: 'success', text1: 'Login successfully!'});
        setIsLoggedIn(true);
      }
    } catch (error) {
      Alert.alert('Login failed!', 'Wrong username or password!');
      console.log(error);
    }
  };
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View style={{height: '100%', justifyContent: 'center'}}>
        <View style={styles.card}>
          <View>
            <Text style={[fontStyle.Title, styles.text]}>Enter nickname</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nickname"
                  style={styles.inputBox}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{fontFamily: 'Nunito-Bold'}}
                />
              )}
              name="username"
            />
            {errors.username && <Text>This is required.</Text>}
          </View>

          <View>
            <Text style={[fontStyle.Title, styles.text]}>Enter password</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Password"
                  secureTextEntry={showPassword}
                  style={styles.inputBox}
                  autoCapitalize="none"
                  inputStyle={{fontFamily: 'Nunito-Bold'}}
                  inputContainerStyle={styles.inputContainer}
                  rightIcon={(props) => (
                    <IconButton
                      icon={(props) => <Icon name="eye" {...props} />}
                      {...props}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                />
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            marginTop: 30,
          }}
        >
          <Button
            title="SIGN IN"
            icon={{
              name: 'check-circle',
              type: 'font-awesome',
              size: 25,
              color: 'black',
            }}
            iconContainerStyle={{marginRight: 10}}
            titleStyle={fontStyle.Button}
            buttonStyle={styles.button}
            containerStyle={{
              width: 200,
              height: 68,
              alignSelf: 'center',
            }}
            onPress={handleSubmit(onSubmit)}
          />
          <TouchableOpacity
            onPress={onPress}
            style={{flexDirection: 'row', justifyContent: 'center'}}
          >
            <Text
              style={{
                fontFamily: 'Nunito-Medium',
                fontSize: 20,
                marginEnd: 10,
              }}
            >
              New to Vooler?
            </Text>
            <Text style={[fontStyle.Text]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 15,
    backgroundColor: colorSet.lightGray,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputBox: {
    paddingStart: 20,
    backgroundColor: colorSet.white,
    borderRadius: 15,
  },
  inputContainer: {
    width: '80%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: colorSet.primary,
    borderRadius: 15,
    backgroundColor: colorSet.white,
    borderBottomWidth: 4,
  },
  button: {
    backgroundColor: colorSet.primary,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 15,
    height: 60,
  },
});

LoginForm.propTypes = {onPress: PropTypes.func};

export default LoginForm;
