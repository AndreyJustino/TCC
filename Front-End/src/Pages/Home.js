import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import Form from '../Components/Form/Form';
import FormCad from '../Components/FormCad/FormCad';
import React from 'react';
import back from "../../assets/Inicio.png"



//Importando os itens que vão ser usados no react navigator stack que é o que uma tela se sobrepõe a outra
import { getHeaderTitle } from '@react-navigation/elements';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Home() {
  const navigation = useNavigation();//Essa variavel é usada para usar o metodo navigate que indica a qual tela a tag vai levar

  return (
    <React.Fragment>
      <View style={styles.container}>
        <ImageBackground source={back} resizeMode="cover" style={styles.image}>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}><Text style={styles.entrar1}>Cadastrar-se</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} ><Text style={styles.entrar2}>Login</Text></TouchableOpacity>
        </ImageBackground>
      </View>


      
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  entrar1:{
        backgroundColor : "#5271ff",
        fontSize: 25,
        color : "white",
        width : 200,
        height : 50,
        textAlign : 'center',
        borderColor : '#5e5e5e',
        borderWidth : 2,
        borderRadius : 30,
        paddingTop : 5,
        marginTop : 200    
      },
  entrar2:{
    backgroundColor : "#5271ff",
    fontSize: 25,
    color : "white",
    width : 200,
    height : 50,
    textAlign : 'center',
    borderColor : '#5e5e5e',
    borderWidth : 2,
    borderRadius : 30,
    paddingTop : 5,
    marginBottom : -300,
    marginTop : 20     
  },
    image :{
      flex : 1,
      justifyContent : 'center',
      width : "100%",
      alignItems : 'center',
      flexDirection : 'column'
    }

});

export default Home