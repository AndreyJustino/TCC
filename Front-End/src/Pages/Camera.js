import React, { useState, useRef, useEffect, Component } from 'react';
import { StyleSheet, View, TouchableOpacity ,Text,Image, Modal, Alert,TextInput} from 'react-native';
import { Camera } from 'expo-camera';
import api from '../api.js'
import {FontAwesome} from '@expo/vector-icons';



class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }
}

function CameraApk() {
    const camRef = useRef(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [location , setLocation] = useState(null);
    const [openPhoto , setOpenPhoto] = useState(false);
  
    useEffect(()=>{
        (async()=>{
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[]);

    if(hasPermission === null){
        return <View/>
    }
    if(hasPermission === false){
        return <Text>No access to Camera</Text>
    }

    async function takePicture(){

      //ação para capturar geolocalização

      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     console.log(position);
      //     position = location
      //   },
      //   (error) => {
      //     console.log(error.code, error.message);
      //   },
      //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      // );

      //ação para camera 
        if(camRef){
          try{
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setOpenPhoto(true)
            const img ={
              capturedPhoto
            }
            const response = await api.post('/photo', img)
            console.log(response)
          } 
          catch(error){
            Alert.alert(`${error}`)
            console.log(`>>> ${error}`)
          }
           
        }
    }

  return (
    <View style={styles.container}>
         <TextInput 
            placeholder='Nome'style={styles.input}
            value={location}
            onChangeText={event => setLocation(event)}
          ></TextInput>

        <Camera style={styles.camera}
        type={type}
        ref={camRef}
        >
            <View style={styles.contentButton}>
              
                <TouchableOpacity style={styles.buttonCam} onPress={takePicture}>
                    <FontAwesome name='camera' size={60} color="blue"></FontAwesome>
                </TouchableOpacity>
            </View>
        </Camera>

        {capturedPhoto &&(
          <Modal 
           animationType="slide"
           transparent={true}
           visible={openPhoto}
          >
            <View style={styles.contentModal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={()=>{setOpenPhoto(false)}}
              >
                <FontAwesome name='close' size={60} color="blue"></FontAwesome>
              </TouchableOpacity>
                  <Image style={styles.imgPhoto} source={{uri : capturedPhoto}}/>
            </View>
          </Modal>
        )}
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex:1,
    width:'100%',
    height:'100%',
  },
  contentButton:{
    flex:1,
    justifyContent:'center',
    backgroundColor:"white",
    flexDirection:"row",
    marginTop:600,
    borderRadius:9
  },
  buttonCam:{
    position:"absolute",
    bottom:50,
    alignItems:"center",
  },
  contentModal:{
    flex:1,
    justifyContent:'center',
    alignItems:"flex-end",
    margin:20,
  },
  closeButton:{
    position:"absolute",
    top:10,
    left:2,
    margin:10,
  },
  imgPhoto:{
    width:"100%",
    height:400,
    borderRadius:9,
  },
  input:{
    margin : 45,
    backgroundColor : 'white',
    width : '80%',
    height : 55,
    borderWidth : 1,
    borderColor : "#5e5e5e",
    borderRadius : 8,
    fontSize: 15,
    padding: 10,
  }
});

export default CameraApk;
