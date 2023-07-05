import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Button, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native'

// import useState from 'react-hook-use-state';

import * as ImagePicker from 'expo-image-picker';
import back from "../../assets/Fundo.png"
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api';

function Perfil() {

  const navigation = useNavigation()
  const [imageUri, setImageUri] = useState('');
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  
  function handleLogout(){
    AsyncStorage.clear()
    navigation.navigate("Login")
  }

  useEffect(() => {
    // Load user information from AsyncStorage
    AsyncStorage.getItem('nome_usuario').then((value) => setNome(value));
    AsyncStorage.getItem('email').then((value) => setEmail(value));
    AsyncStorage.getItem('nascimento').then((value) => setNascimento(value));
    AsyncStorage.getItem('imgPerfil').then((value) => setImageUri(value));
  }, []);


  const obterPermissao = async () => {

    const {granted} = await ImagePicker.requestCameraPermissionsAsync()
    
      if(!granted){
        alert('Voce precisa dar permissao')
      }
  }


  React.useEffect(() => {
    obterPermissao()
  }, [])

  
  return (
    <React.Fragment>
      <View style={styles.container}>
          
          <ImageBackground source={back} resizeMode="cover" style={styles.image}>
          
            
              
              <View style={styles.divFoto}>
                <Image source={imageUri}/>
                {imageUri && <Image source={{uri: imageUri}} style={styles.imagemPerfil}/> }
              </View>
            
            
              
            <View style={styles.form}>
              <Text style={styles.infos}>{nome}</Text>
              <Text style={styles.infos}>{email}</Text>
              <Text style={styles.infos}>{nascimento.slice(0,10).split('-').reverse().join('/')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('PerfilUpdate')}><Text style={styles.atualizar}>Atualizar perfil ?</Text></TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogout} ><Text style={styles.sair}>Sair da conta</Text></TouchableOpacity>
            
          </ImageBackground>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form:{
        width : "85%",
        height : "55%",
        backgroundColor : "#659ee4",
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 2,
        borderColor : '#5e5e5e'
    },
    sair:{
        backgroundColor : "#5271ff",
          fontSize : 25,
          width : 180,
          height : 40,
          textAlign : 'center',
          borderColor : '#5e5e5e',
          borderWidth : 2,
          borderRadius : 30,
          color : 'white',
          marginTop : 50,
      },
      infos:{
        backgroundColor : "#5271ff",
        fontSize : 23,
        width : 190,
        textAlign : 'center',
        marginBottom : 30,
        color : 'white',
        borderRadius: 5,
        borderColor : '#5e5e5e',
        borderWidth : 2,
    
      },
      divFoto:{
        width : 150,
        height : 150,
        backgroundColor : '#5271ff',
        borderRadius : 180,
        marginBottom: 25,
        alignItems : "center",
        justifyContent : "center",
        borderColor : '#5e5e5e',
        borderWidth : 2,
    },
    image :{
      flex : 1,
      justifyContent : 'center',
      width : "100%",
      alignItems : 'center',
    },
    imagemPerfil: {
      height: 150,
      width: 150,
      borderRadius : 180,
    },
    atualizar:{
      backgroundColor : "#5271ff",
        fontSize : 25,
        width : 230,
        height : 40,
        textAlign : 'center',
        borderColor : '#5e5e5e',
        borderWidth : 2,
        borderRadius : 30,
        color : 'white',
        marginTop : 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        
        // alignItems : 'center'
    }

})

export default Perfil