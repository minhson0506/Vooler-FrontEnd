import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Input, Text, Button} from '@rneui/base';
import {IconButton} from '@react-native-material/core';
import {useForm, Controller} from 'react-hook-form';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {colorSet, useStyles} from '../utils/GlobalStyle';

const LoginForm = () => {
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

  const onSubmit = () => {};
  const fontStyle = useStyles();
  if (fontStyle == undefined) return undefined;
  else
    return (
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
                style={styles.inputBox}
                inputContainerStyle={styles.inputContainer}
                inputStyle={fontStyle.Button}
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
                secureTextEntry={true}
                style={styles.inputBox}
                trailing={(props) => (
                  <IconButton
                    icon={(props) => <Icon name="eye" {...props} />}
                    {...props}
                  />
                )}
                inputContainerStyle={styles.inputContainer}
                inputStyle={fontStyle.Button}
              />
            )}
            name="password"
          />
          {errors.password && <Text>This is required.</Text>}
        </View>
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
            alignSelf: 'center',
          }}
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
    borderWidth: 4,
    height: 50,
    borderColor: colorSet.primary,
    borderRadius: 15,
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    borderBottomWidth: 0,
  },
  button: {
    backgroundColor: colorSet.primary,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 15,
  },
});

export default LoginForm;
