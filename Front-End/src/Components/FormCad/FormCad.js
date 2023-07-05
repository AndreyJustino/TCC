import React from 'react'
import { View, StyleSheet, TextInput, TextInputComponent, Text, Image, Button, TouchableOpacity } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements';
import Cadastro from '../../Pages/Cadastro';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function FormCad() {
  const navigation = useNavigation();

  return (
    <React.Fragment>
        <View style={styles.container}>
        <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Cadastro')}><Text style={styles.cadastre}>Cadastre-se</Text></TouchableOpacity>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
    container:{
        width : "85%",
        height : "15%",
        backgroundColor : "#659ee4",
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 2,
        borderColor : '#5e5e5e',
        marginTop : 15
    },
    cadastre:{
        backgroundColor : "#5271ff",
        fontSize : 25,
        width : 250,
        height : 50,
        textAlign : 'center',
        borderColor : '#5e5e5e',
        borderWidth : 2,
        borderRadius : 7,
        color : 'white',
        paddingTop : 6,
      },
})
export default FormCad