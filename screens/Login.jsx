import React, { useState } from 'react'
import { Button, Dimensions, TextInput, View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { addUser } from '../reducers/currentUserSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const saveUser = (user) => {
    const { email, uid, displayName } = user;
    dispatch(addUser({ email, uid, displayName, role: 'admin' }));
  }

  const createUserInFirebaseDatabase = (user) => {
    const { email, uid, displayName } = user;
    let userToSave = { email, uid, displayName, role: 'admin' };
    firebase.app().database('https://task-b455e-default-rtdb.firebaseio.com/')
      .ref(`/users/${uid}`)
      .set(userToSave).then(() => {
        console.log('User added!');
        navigator.navigate('Auth');
      }).catch((error) => {
        console.log(error);
      });
  };

  const loginUser = (email, password) => {
    setIsLoading(true);
    auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        saveUser(userCredential.user);
        setIsLoading(false);
        setError('');
        navigator.navigate('Auth');
      })
      .catch((error) => {
        console.log("login falhou:  " + error);
        auth().createUserWithEmailAndPassword(email,password)
          .then((userCredential) => {
            saveUser(userCredential.user);
            setIsLoading(false);
            setError('');
            createUserInFirebaseDatabase(userCredential.user);
          })
          .catch(error => {
            setIsLoading(false);
            setError(error.message);
          });
      });
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        label='Email Address'
        placeholder='example@gmail.com'
        value={email}
        onChangeText={email => setEmail(email)}
        autoCapitalize={'none'}
      />

      <TextInput
        label='Password'
        placeholder='enter password'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />
      {
        isLoading ?
          <ActivityIndicator
            size='large'
            color='#0F5340'
            style={{marginBottom: 80}}
          /> :
          <Button
            onPress={() => loginUser(email, password)}
            title={'Sign In'}
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
            onPress={() => navigator.navigate('Register')}
            title={'Register'}
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

export default Login;
