import React from 'react'
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Text, TextInput, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import back from "../../assets/Fundo.png"
import { StatusBar } from 'expo-status-bar';

import api from '../api.js'
import useState from 'react-hook-use-state'
import { useNavigation } from '@react-navigation/native';

import Toast from "react-native-toast-message"

function Recuperação() {

  function showToastErro(){
    Toast.show({
      type: "error",
      text1: "E-mail invalido",
      text2: "Tente outro e-mail.",
      visibilityTime: 6000
    })
  }

  function showToastSucesso(){
    Toast.show({
      type: "success",
      text1: "Cadastro quase finalizado",
      text2: "Verifique o código enviado no seu e-mail.",
      visibilityTime: 6000
    });
  }

  const [emailF,setEmail] = useState('');
  const navigation = useNavigation();

  async function recuperarUser(event){
    event.preventDefault()
    try{

      showToastSucesso()

      const data = {
        emailF
      }
      const response = await api.post('/reset', data) 

      navigation.navigate("AlterarSenha")

      setEmail('');
    } catch(error){
      showToastErro()
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
                
                <Text style={styles.title}>Recuperação de senha</Text>

                <TextInput 
                style={styles.input} 
                placeholder="Email"
                value={emailF}
                onChangeText={event=>setEmail(event)}
                ></TextInput>
                
                <TouchableOpacity onPress={recuperarUser}>
                  <Text style={styles.entrar}>Enviar</Text>
                </TouchableOpacity>

            </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
        </TouchableWithoutFeedback>
        <Toast/>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  
    container: {
        width : "85%",
        height : "55%",
        backgroundColor : "#659ee4",
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 2,
        borderColor : '#5e5e5e'
    },
      image :{
        flex : 1,
        justifyContent : 'center',
        width : "100%",
        alignItems : 'center',
        flexDirection : 'column'
      },
      title:{
        backgroundColor : "#5271ff",
        fontSize : 30,
        width : 250,
        textAlign : 'center',
        marginTop : -80,
        marginBottom : 80,
        color : 'white',
        borderColor : '#5e5e5e',
        borderWidth : 2,
        borderRadius : 5,
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
        padding: 5,
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
          marginTop : 80,
      },
  
  });
export default Recuperação

