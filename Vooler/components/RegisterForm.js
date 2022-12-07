import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Alert} from 'react-native';
import {Input, Text, Button} from '@rneui/base';
import {IconButton} from '@react-native-material/core';
import {useForm, Controller} from 'react-hook-form';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {colorSet, useStyles} from '../utils/GlobalStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import PropTypes from 'prop-types';
import {teamArray} from '../utils/data';
import {MainContext} from '../contexts/MainContext';
import {useAuth, useTeam} from '../hooks/ApiHooks';
import {generateHash} from '../utils/hash';
import {useUser} from '../hooks/ApiHooks';
import Toast from 'react-native-toast-message';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const {setIsLoggedIn, setToken, setUser, setUid, setTeam, salt} =
    useContext(MainContext);
  const {getUserByToken} = useUser();
  const {postUser, postLogin} = useAuth();
  const {getAllTeams} = useTeam();

  const getTeams = async () => {
    try {
      const array = await getAllTeams();
      const teamArray = array.map((element) => {
        return {label: element.team_name, value: element.team_id};
      });
      setTeamItem(teamArray);
    } catch (error) {
      console.error('get team error', error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  // Picker open states
  const [openTeam, setOpenTeam] = useState(false);
  // Picker value states
  const [teamValue, setTeamValue] = useState();
  // Picker items
  const [teamItem, setTeamItem] = useState([]);

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
    const hashedData = await generateHash(data.username, data.password, salt);
    try {
      const user = {
        userId: hashedData.userId,
        password: hashedData.password,
        teamId: teamValue,
      };
      const userData = await postUser(user);
      if (userData) {
        Toast.show({type: 'success', text1: 'User created successfully!'});
        //auto login for user after register
        const userLogin = {
          userId: hashedData.userId,
          password: hashedData.password,
        };
        const loginData = await postLogin(userLogin);
        console.log('login', loginData);

        if (loginData) {
          setToken(loginData.token);
          const response = await getUserByToken(loginData.token);
          if (response) {
            setUid(response.uid);
          }
          setTeam(loginData.user.team_id);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      Alert.alert('Register failed!', 'Username is taken!');
      console.log(error);
    }
  };

  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
      <View style={{height: '100%', justifyContent: 'space-evenly'}}>
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
          <View style={{zIndex: 2}}>
            <Text style={[fontStyle.Title, styles.text]}>Join your team</Text>
            <DropDownPicker
              open={openTeam}
              value={teamValue}
              items={teamItem}
              setOpen={setOpenTeam}
              setValue={setTeamValue}
              setItems={setTeamItem}
              placeholder="Choose"
              style={styles.pickerContainer}
              containerStyle={styles.picker}
              textStyle={styles.textPicker}
              selectedItemLabelStyle={{color: '#EB6833'}}
              labelStyle={{color: '#EB6833'}}
            />
          </View>
          <View style={{zIndex: 1}}>
            <Text style={[fontStyle.Title, styles.text]}>Enter password</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 3,
                  message: 'Password has to be at least 3 characters.',
                },
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
        <Button
          title="SIGN UP"
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
      </View>
    );
};

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get('window').height * 0.6,
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
  picker: {
    height: 50,
    width: '75%',
    alignSelf: 'center',
  },
  pickerContainer: {
    borderWidth: 4,
    height: 50,
    borderColor: colorSet.primary,
    borderRadius: 15,
  },
  textPicker: {
    paddingStart: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
  },
});

RegisterForm.propTypes = {onPress: PropTypes.func};

export default RegisterForm;
