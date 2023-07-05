import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Keyboard, TouchableWithoutFeedbackBase, Text, TextInput, View, Image} from 'react-native';
import Form from '../Components/Form/Form';
import FormCad from '../Components/FormCad/FormCad';
import React from 'react';



function Login() {

  return (
    <React.Fragment>
    <View style={styles.container}>
      
        <Form>
        </Form>
    </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login
