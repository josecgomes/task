import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image} from 'react-native'
import Home from '../screens/Home'

const TaskList = ({description, date}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Description : {description}</Text>
      <Text>Date: {date}</Text>
      <TouchableOpacity onPress={Apaga}>
        <Image 
        source={require('../images/delete.png')} 
        style={{
          height: 25, 
          width: 25, 
          resizeMode: 'center',
          marginTop:5,
          marginBottom:5
          }} />
      </TouchableOpacity>
    </View>
  )
}

const Apaga = () => {
  Alert.alert("Ainda por fazer");
  console.log(this.description, this.date)
}

TaskList.propTypes = {
  description: PropTypes.string,
  date: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5 
  },
  Image:{
    flex: 1,
    resizeMode: 'center',
    marginTop: 100,
    marginBottom: 100
  }
});

export default TaskList
