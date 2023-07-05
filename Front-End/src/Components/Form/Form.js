import React,{useState} from 'react'
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, TextInputComponent, Text, Image, Button, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import logo from "./icon.png"
import { getHeaderTitle } from '@react-navigation/elements';
import Cadastro from '../../Pages/Cadastro';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import back from "../../../assets/Fundo.png";
import FormCad from '../FormCad/FormCad';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../api.js';
import jwtDecode from 'jwt-decode';

import Toast from "react-native-toast-message"

function Form() {

  function showToastErro(){
    Toast.show({
      type: "error",
      text1: "Login invalido",
      text2: "Tente outro e-mail ou faça cadastro.",
      visibilityTime: 6000
    })
  }

  function showToastSucesso(){
    Toast.show({
      type: "success",
      text1: "Login realizado",
      text2: "Bem-vindo ao sistema(a)",
      visibilityTime: 6000
    });
  }

  const navigation = useNavigation();
  const [email,setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin(event){
    event.preventDefault()
    try{

      showToastSucesso()
      
      const data = {
        email,senha
      };
      const response = await api.post('/login', data)

      let decodedHeader = jwtDecode(response.data.token);

      let nome = decodedHeader.nome_usuario
      let emailUSer = decodedHeader.email
      let nascimento = decodedHeader.nascimento
      let img = decodedHeader.imagemUsuario
      
      console.log(nascimento)

      AsyncStorage.setItem("nome_usuario",nome)
      AsyncStorage.setItem("email",emailUSer)
      AsyncStorage.setItem("nascimento",nascimento)
      AsyncStorage.setItem("imgPerfil",img)

  
      navigation.navigate("Principal")

      setEmail('');
      setSenha('');
    } catch(error){
      showToastErro()
      console.log(error)
    }
  }


  return (
    <React.Fragment>
      
      <TouchableWithoutFeedback
      touchSoundDisable
      onPress={() => Keyboard.dismiss()}
      >
      <ImageBackground source={back} resizeMode="cover" style={styles.image}>
      <TouchableWithoutFeedback
      touchSoundDisable
      onPress={() => Keyboard.dismiss()}
      >
          <View style={styles.container}>
            <Text style={styles.title}>LOGIN</Text>
            <TextInput 
                  placeholder='Email'style={styles.input}
                  value={email}
                  onChangeText={e => setEmail(e)}
                  ></TextInput>

            <TextInput 
                  placeholder='Senha'style={styles.input}
                  secureTextEntry={true}
                  value={senha}
                  onChangeText={e=>setSenha(e)}
              ></TextInput>
            <TouchableOpacity onPress={handleLogin}><Text style={styles.entrar}>Entrar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Recuperação')}><Text style={styles.esqueceu}>Esqueceu sua senha?</Text></TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
          <FormCad></FormCad>
        </ImageBackground>
          </TouchableWithoutFeedback>
        <Toast/>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
    container:{
        width : "85%",
        height : "55%",
        backgroundColor : "#659ee4",
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 2,
        borderColor : '#5e5e5e'
    },
    input:{
      margin : 10,
      backgroundColor : 'white',
      width : '80%',
      height : 35,
      borderWidth : 1,
      borderColor : "#5e5e5e",
      borderRadius : 8,
      fontSize: 15,
      padding: 5
    },
    title:{
      backgroundColor : "#5271ff",
      fontSize : 30,
      width : 130,
      textAlign : 'center',
      marginTop : -80,
      marginBottom : 50,
      color : 'white',
      // borderColor : '#5e5e5e',
      // borderWidth : 2,
      borderRadius : 5,
    },
    entrar:{
      backgroundColor : "#5271ff",
        fontSize : 25,
        width : 140,
        height : 40,
        textAlign : 'center',
        borderColor : '#5e5e5e',
        borderWidth : 2,
        borderRadius : 30,
        color : 'white',
        marginTop : 50,
        
        // alignItems : 'center'
    },
    image :{
      flex : 1,
      justifyContent : 'center',
      width : "100%",
      alignItems : 'center',
    },
    esqueceu:{
      fontSize : 18,
      marginTop : 80,
      marginBottom : -60
    },
    
})

export default Form
