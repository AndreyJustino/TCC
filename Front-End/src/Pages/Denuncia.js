import React,{useState,useEffect} from 'react'
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, TextInputComponent, Text, Image, Button, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView,ScrollView } from 'react-native'
import api from '../api.js'
import back from "../../assets/Fundo.png"
import * as Location from "expo-location";
import {FontAwesome} from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import { Auth,db,storage } from '../Firebase/Firebase.js';
import { getApps,initializeApp } from 'firebase/app';
import { uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";
import Toast from 'react-native-toast-message';

function Denuncia() {

    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState();
    const [problema, setProblema] = useState(['Elétrico(fio desencapado, poste caido)', 'Hidraúlico(vazão de água, cano exposto)', 'Infra(semaforo quebrado, calçada quebrada)']);
    const [tipo_problema, setTipo_problema] = useState();
    const [desc_problema,setDesc_Problema] = useState();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [street , setStreet] = useState()
    const [city , setCity] = useState()
    const [municipio, setMunicipio] = useState()
    const [cep, setCep] = useState()

    function showToastSucesso(){
        Toast.show({
          type: "success",
          text1: "Denuncia realizada!",
          text2: "Bom trabalho.",
          visibilityTime: 6000
        });
      }

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
        geocode();
      }, []);
    
useEffect(() => {
    console.log(address ? address : "Pegando geolocalização");
    console.log(" ")
    console.log("longitude: ",longitude);
    console.log("latitude: ",latitude);
    console.log("rua: ",street);
    console.log("cidade: ",city);
    console.log("municipio: ",municipio);
    console.log("CEP: ",cep);

    axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=ef172e5aac494f98ad94e03ba0d41fb8`)
    .then(async(response)=>{
      await setStreet(response.data["features"][0]["properties"]["street"])
      await setCity(response.data["features"][0]["properties"]["city"])
      await setMunicipio(response.data["features"][0]["properties"]["municipality"])
      await setCep(response.data["features"][0]["properties"]["postcode"])
    })
  }, [latitude, longitude,cep]);
    
      useEffect(() => {
        if (location?.coords) {
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        }
      }, [location]);
    
      async function geocode() {
        if (address?.length > 0) {
          const loc = await Location.geocodeAsync(address);
          setLatitude(loc[0].latitude);
          setLongitude(loc[0].longitude);
        }
      }

    const obterPermissao = async () => {

        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted){
            Alert.alert('Voce precisa dar permissao')
        }    
    }

    async function  envImg(){

    }

    const obterImage = async() => {
        const result = await ImagePicker.launchCameraAsync()
        if(!result.canceled){
            setImageUri(result.assets[0].uri)
        }
        await geocode()
        envImg
    }
    const galeriaImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync()
        
        if(!result.canceled){
            setImageUri(result.assets[0].uri)
        }
        await geocode()
        envImg
    }
    

    const envData = async() =>{
        if(imageUri===""){
            alert("É necessario anexar uma imagem para fazer a denuncia")
        }else{
        //navigation.navigate("Principal")
        geocode()
        try{
            if(imageUri)
            {
                let imageRef;
                const storageUrl = `Denuncia/${Date.now()}/${Math.random().toString()}`;
                const response =  await fetch(imageUri);
                const bytes =  await response.blob(); 
                imageRef = ref(storage, storageUrl);
    
                uploadBytes(imageRef, bytes)
                .then(() => {
                getDownloadURL(imageRef)
                    .then(async (url) => {
                        const data ={
                            url,tipo_problema,longitude,latitude,desc_problema
                        };
            
                        if(data.tipo_problema === ''){
                            alert('Selecione um tipo de problema')
                        } else{
                            const response = await api.post('/denuncia', data)
                            showToastSucesso()
                            console.log(response)
                            setImageUri('');
                            setAddress('');
                            setTipo_problema('');
                            setDesc_Problema('');
                        }
                    setUrlF(url)
                    })
                    .catch((err) => {
                    console.log(err.message);
                    });
                })
                .catch((err) => {
                console.log(err.message);
                });
            }else{
                imageRef = null;
                setImageUri(null)  
                return;
            }
           

            }catch(error){
                Alert.alert(`${error}`)
                console.log(`>>> ${error}`)
            }
        }
    }

    React.useEffect(() => {
        obterPermissao()
    }, [])

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
            <KeyboardAvoidingView
            contentContainerStyle={styles.form}
            behavior = "height"
            keyboardVerticalOffset = {35}
            >
              <ScrollView
              // style = {styles.form}
              width = '100%'
              >

            <Text style={styles.title}>Relatar Problema</Text>

                <TextInput 
                    value={address} 
                    onChangeText={setAddress}
                    style={styles.input}
                    placeholder="Endereço"
                ></TextInput>

                <Picker
                    selectedValue={tipo_problema}
                    style={styles.select}
                    onValueChange={(itemValue) => 
                    setTipo_problema(itemValue)
                    }>
                    <Picker.Item label={'Tipo de problema'} value={"Nulo"} />
                    {
                        problema.map(cr => {
                            return <Picker.Item label={cr} value={cr} />
                        })
                    }
                    
                </Picker>

                <View style={styles.imagem}>
                {imageUri && <Image source={{uri: imageUri}} style={styles.img}/> }
                </View>

                {/* ()=>{navigation.navigate("Camera")} */}
                <View style={styles.button}>
                <TouchableOpacity onPress={obterImage} style={styles.alinhamento}>
                <FontAwesome name='camera' size={60} color="#5271ff"></FontAwesome>
                </TouchableOpacity> 
                <TouchableOpacity onPress={galeriaImage} style={styles.alinhamento}>
                <FontAwesome name='image' size={60} color="#5271ff"></FontAwesome>
                </TouchableOpacity>
                </View>

                <TextInput 
                    value={desc_problema} 
                    onChangeText={setDesc_Problema}
                    style={styles.inputDesc}
                    placeholder="Descrição"
                    multiline={true}
                ></TextInput>

                <TouchableOpacity
                    onPress={envData}><Text style={styles.relatar}>Enviar Relato</Text></TouchableOpacity>
                
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            </TouchableWithoutFeedback>
            </ImageBackground>
            </TouchableWithoutFeedback>
        </React.Fragment>
        )
    }


    const styles = StyleSheet.create({
        form:{
            position: 'absolute',
            // bottom: 0,
            // left: 0,
            // flexDirection: 'row',
            width : "85%",
            height : "80%",
            backgroundColor : "#659ee4",
            borderRadius : 15,
            alignItems : 'center',
            justifyContent : 'center',
            borderWidth : 2,
            borderColor : '#5e5e5e',
            marginTop: 20
        },
        image :{
            flex : 1,
            width : "100%",
            alignItems : 'center',
            flexDirection : 'column',
            paddingTop: "8%",
        },
        title:{
            backgroundColor : "#5271ff",
            fontSize : 30,
            width : 300,
            textAlign : 'center',
            color : 'white',
            // borderColor : '#5e5e5e',
            // borderWidth : 2,
            borderRadius : 5,
            marginTop: "20%"
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
            padding: 10,
            marginTop: "10%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        container:{
            width: "80%",
            justifyContent: 'center',
            alignItems: "center",
            // marginTop: "1%"
        },
        imagem:{
            width: 202,
            height: 102,
            borderRadius:2,
            borderWidth : 0.1,
            marginBottom: '10%',
            marginTop: "5%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        img:{
            width: 200,
            height: 100,
            borderRadius:2,
            borderWidth : 1
        },
        inputDesc:{
            margin : 10,
            backgroundColor : 'white',
            width : '90%',
            height : 50,
            borderWidth : 1,
            borderColor : "#5e5e5e",
            borderRadius : 8,
            fontSize: 15,
            padding: 10,
            alignItems: 'center',
            marginTop: "5%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        relatar:{
            backgroundColor : "#5271ff",
            fontSize : 25,
            width : 200,
            height : 50,
            borderColor : '#5e5e5e',
            borderWidth : 2,
            borderRadius : 30,
            color : 'white',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: 6,
            marginTop: "10%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        container2: {
            backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10
        },
        button: {
            justifyContent: "space-between",
            flexDirection: "row",
            margin: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        alinhamento:{
            marginLeft:10,
            marginRight:10
        },
        select:{
            width: "80%",
            marginTop: "3%",
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    })
    
    export default Denuncia