import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Button, ImageBackground} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import api from '../api.js';
import jwtDecode from 'jwt-decode';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Auth,db,storage } from '../Firebase/Firebase.js';
import { getApps,initializeApp } from 'firebase/app';
import { uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";

import fundo from '../../assets/Fundo.png'

function PerfilDenuncia() {
  const [imageUri, setImageUri] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    // Load user information from AsyncStorage
    AsyncStorage.getItem('nome_usuario').then((value) => setNome(value));
    AsyncStorage.getItem('email').then((value) => setEmail(value));
    AsyncStorage.getItem('imgPerfil').then((value) => setImageUri(value));
  }, []);

  const galeriaImage = async() => {
    const result = await ImagePicker.launchImageLibraryAsync()

    if(!result.canceled){
      setImageUri(result.assets[0].uri)

      let uri = result.assets[0].uri
 
    }
  }

  const envData = async() => {
    try{
      console.log('entro env data')
      console.log('uri perfilUp >> ' , imageUri)
      if(imageUri)
      {
          let imageRef;
          const storageUrl = `Usuario/${Date.now()}/${Math.random().toString()}`;
          const response =  await fetch(imageUri);
          const bytes =  await response.blob(); 
          imageRef = ref(storage, storageUrl);

          uploadBytes(imageRef, bytes)
          .then(() => {
          getDownloadURL(imageRef)
              .then(async (url) => {
                  const data ={
                      url,nome,email
                  };
    
                  console.log('url email >>> ', email)

                  AsyncStorage.setItem('imgPerfil', url);
                  AsyncStorage.setItem('nome_usuario', nome)
                  AsyncStorage.setItem('email', email)

                  const response = api.put('/imgPerfil',data)

                  console.log('dados do usu>>', )
          
              })
              .catch((err) => {
              console.log(err.message);
              });
          })
          .catch((err) => {
          console.log(err.message);
          });
      }

      else{
        try{
          const data ={
            imageUri,nome,email
          };
  
          console.log('url fire >>> ', url)
  
          const response = api.put('/imgPerfil',data)

        } catch(erro){console.log(erro)}
      }
        
     

      }catch(error){
          console.log(`>>> ${error}`)
      }
  }

  const navigation = useNavigation();

  return (
    <React.Fragment>

      <View style={styles.container}>

      <ImageBackground source={fundo} resizeMode="cover" style={styles.image}>

        <TouchableOpacity onPress={galeriaImage}>
              
              <View style={styles.divFoto}>
                {!imageUri && <Text style={styles.text}>Alterar foto</Text>}
                {imageUri && <Image source={{uri: imageUri}} style={styles.imagemPerfil}/> }
              </View>
            
            </TouchableOpacity>

        <Text style={styles.title}>Atualize</Text>

        <View style={styles.form}>

        <Text style={styles.text}>Nome de usuario</Text>
              <TextInput 
              placeholder='Nome'style={styles.input}
              value={nome}
              onChangeText={event => setNome(event)}
              ></TextInput>

        <Text style={styles.text}>E-mail </Text>
              <TextInput 
              placeholder='Email'style={styles.input}
              inputMode='email'
              value={email}
              onChangeText={event => setEmail(event)}
              ></TextInput>

      
        <TouchableOpacity onPress={() => {
          envData() 
        }}><Text style={styles.entrar}>Finalizar</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => 
          navigation.navigate('PerfilUpdate') 
        }><Text >Tetse</Text></TouchableOpacity>

        </View>

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
      justifyContent: 'center'
  },
  image :{
    flex : 1,
    justifyContent : 'center',
    width : "100%",
    alignItems : 'center',
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
form:{
    width : "85%",
    height : "45%",
    backgroundColor : "#659ee4",
    borderRadius : 15,
    alignItems : 'center',
    justifyContent : 'center',
    borderWidth : 2,
    borderColor : '#5e5e5e',
},
infos:{
  backgroundColor : "#5271ff",
  fontSize : 23,
  width : 215,
  textAlign : 'center',
  marginBottom : 30,
  color : 'white',
  borderRadius: 5,
  borderColor : '#5e5e5e',
  borderWidth : 2,

},
title:{
  backgroundColor : "#5271ff",
  fontSize : 30,
  width : 190,
  textAlign : 'center',
  marginBottom : 30,
  color : 'white',
  borderRadius: 5,
  borderColor : '#5e5e5e',
  borderWidth : 2,
},
text: {
  fontSize: 16,
  margin: 5,
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
},
input:{
    margin : 10,
    backgroundColor : 'white',
    width : '90%',
    height : 35,
    borderWidth : 1,
    borderColor : "#5e5e5e",
    borderRadius : 8,
    fontSize: 15,
    padding: 10,
    // paddingLeft: 'auto',
    // paddingRight: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'justify',
  },
    
    entrar:{
      backgroundColor : "#5271ff",
        fontSize : 25,
        width : 200,
        height : 40,
        textAlign : 'center',
        borderColor : '#5e5e5e',
        borderWidth : 2,
        borderRadius : 30,
        color : 'white',
        marginTop : 5,
        
        // alignItems : 'center'
    },
    imagemPerfil: {
      height: 150,
      width: 150,
      borderRadius : 180,
    }
})

export default PerfilDenuncia