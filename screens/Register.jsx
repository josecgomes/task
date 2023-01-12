import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Dimensions, TextInput, View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { addUser } from '../reducers/currentUserSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Admin', value: 'admin'},
    {label: 'User', value: 'user'}
  ]);

  const saveUser = (user) => {
    const { email, uid, displayName } = user;
    dispatch(addUser({ email, name, uid, displayName, role: value }));
  }

  const createUserInFirebaseDatabase = (user) => {
    const {  uid, displayName = name } = user;
    console.log(uid);
    console.log(displayName);
    //const { email, uid, displayName } = user;
    let userToSave = { email, name, uid, displayName, role: value };
    firebase.app().database('https://task-b455e-default-rtdb.firebaseio.com/')
      .ref(`/users/${uid}`)
      .set(userToSave).then(() => {
        console.log('User added!');
        navigator.navigate('Auth');
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.wrapper}>

      <Text>Register</Text>
      <TextInput
        label='Email Address'
        placeholder='example@gmail.com'
        value={email}
        onChangeText={email => setEmail(email)}
        autoCapitalize={'none'}
      />

      <TextInput
        label='Name'
        placeholder='Enter name'
        value={name}
        onChangeText={name => setName(name)}
        autoCapitalize={'none'}
      />
      
      <TextInput
        label='Password'
        placeholder='enter password'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />
      <TextInput
        label='confirm Password'
        placeholder='Confirm password'
        value={confirmpassword}
        onChangeText={confirmpassword => setConfirmPassword(confirmpassword)}
        secureTextEntry
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {
        isLoading ?
          <ActivityIndicator
            size='large'
            color='#0F5340'
            style={{marginBottom: 80}}
          /> :
          <Button
            onPress={() => createUserInFirebaseDatabase(email, name, password, value)}
            title={'Register'}
          />
      }
{
        isLoading ?
          <ActivityIndicator
            size='large'
            color='#0F5340'
            style={{marginBottom: 80}}
          /> :
          <Button
            onPress={() => navigator.navigate('Login')}
            title={'Login'}
          />
      }
      { error && <Text style={styles.error}>{error}</Text> }
    </View>
  )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EFEFEF',
    height: height - 80,
    width: width,
    marginTop: 80,
    paddingVertical: height / 25,
    paddingHorizontal: width / 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  error: {
    color: 'red',
    marginTop: 20
  }
})

export default Register;
