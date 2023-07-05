import React from 'react'
import { ScrollView,Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import back from "../../assets/Fundo.png"

import api from '../api.js'
import useState from 'react-hook-use-state'
import { useNavigation } from '@react-navigation/native'

import Toast from 'react-native-toast-message';


function AlterarSenha() {

  function showToastErro(){
    Toast.show({
      type: "error",
      text1: "Código invalido",
      text2: "Verifique o código e tente novamente.",
      visibilityTime: 6000
    })
  }

  function showToastSucesso(){
    Toast.show({
      type: "success",
      text1: "Senha alterada.",
      text2: "Troca de senha realizada. Faça login.",
      visibilityTime: 6000
    });
  }

  const navigation = useNavigation() 

  const [email,setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [senha, setSenha] = useState('');

  async function updateCodigo(event){
    try{ 
      showToastSucesso()

      const data = {
        email, senha, codigo
      };
      const response = await api.post('/update', data)

      navigation.navigate("Login")


      setEmail("")
      setCodigo("")
      setSenha("")
    } catch(error){
      showToastErro()
      console.log(`>>> ${error}`)
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

      <Text style={styles.title}>Trocar Senha</Text>
      
      <KeyboardAvoidingView
          contentContainerStyle={styles.form}
          behavior = "padding"
          keyboardVerticalOffset = {105}
          >
            <ScrollView
            // style = {styles.form}
            width = '100%'
            >

        {/* inputs que pegam os dados */}
        
        <TextInput 
          style={styles.inputCódigo} 
          placeholder="Coloque seu email"
          value={email}
          onChangeText={event => setEmail(event)}
        />

        <TextInput 
          style={styles.inputCódigo} 
          placeholder="Coloque o código"
          value={codigo}
          onChangeText={event => setCodigo(event)}
        />

        <TextInput 
          style={styles.inputNovaSenha} 
          placeholder="Digite sua nova senha"
          value={senha}
          onChangeText={event => setSenha(event)}
        />

        {/* botão para acionar a function para Alterar senha */}
        
        <TouchableOpacity onPress={updateCodigo}>
          <Text style={styles.entrar}> Alterar senha</Text>
        </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
        </TouchableWithoutFeedback>
    </ImageBackground>
      </TouchableWithoutFeedback>
    <Toast/>
  </React.Fragment>
  )
}

const styles = StyleSheet.create({
  image:{
    flex : 1,
    width : "100%",
  },
  container: {
    width : "85%",
    height : "60%",
    backgroundColor : "#659ee4",
    borderRadius : 15,
    borderWidth : 2,
    borderColor : '#5e5e5e',
    marginTop: "35%",
    marginLeft: "8%"
  },
  title:{
    backgroundColor : "#5271ff",
    fontSize : 30,
    width : 250,
    textAlign : 'center',
    color : 'white',
    borderColor : '#5e5e5e',
    borderWidth : 2,
    borderRadius : 5,
    marginTop: "5%",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputCódigo:{
    backgroundColor : 'white',
    height : 35,
    borderWidth : 1,
    borderColor : "#5e5e5e",
    borderRadius : 8,
    fontSize: 15,
    padding: 5,
    width : '80%',
    marginTop: "15%",
    marginLeft: "10%",
    // textAlign: 'justify'
  },
  inputNovaSenha:{
    backgroundColor : 'white',
    height : 35,
    borderWidth : 1,
    borderColor : "#5e5e5e",
    borderRadius : 8,
    fontSize: 15,
    padding: 5,
    width : '80%',
    marginTop: "15%",
    marginLeft: "10%",
  },
  entrar:{
    backgroundColor : "#5271ff",
    fontSize : 30,
    width : 250,
    // height : 40,
    textAlign : 'center',
    borderColor : '#5e5e5e',
    borderWidth : 2,
    borderRadius : 30,
    color : 'white',
    marginTop : "15%",
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

export default AlterarSenha