import React from 'react'
import useState from 'react-hook-use-state';
import { useEffect,useRef} from 'react'
import menu from "../../assets/menu.png"
import { View, StyleSheet, TextInput, TextInputComponent, Text, Image, Button, TouchableOpacity, Alert } from 'react-native'
import api from '../api'
//Imports Mapa
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
//Pesquisa de localização
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function Principal() {

    const [location, setLocation] = useState(null);
    const [Denuncia, setDenuncia] = useState([])
    const [address, setAddress] = useState(null);
    const navigation = useNavigation();
    // Barra de pesquisa
    const [latitude, setLatitude] = useState(-23.595506);
    const [longitude, setLongitude] = useState(-46.6684607);
    const [newLatitude , setNewLatitude] = useState();
    const [newLongitude , setNewLongitude] = useState();

     useEffect(() => {

      async function getD() {
        const {data} = await api.get('/getD')
        setDenuncia(data)
      }
      

    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');// Aqui ele está apontando que se o usuário negar o uso do localizção ele apresentará essa mensagem de erro
        return;
      }

      let location = await Location.getCurrentPositionAsync({});//Aqui pega a posição atual do usuário
      setLocation(location);
    })();
    getD()
  }, [Denuncia]);

  useEffect(() => {
    console.log(address ? address : "Pegando geolocalização");
    updateRegion()
  }, [latitude, longitude]);


  const [initialRegion, setInitialRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 1.0922,
    longitudeDelta: 1.0421,
  });

  const mapRef = useRef(null); // Referência para o componente MapView

  // Função para atualizar a latitude e longitude
  const updateRegion = async() => {
    if (address?.length > 0) {
      const loc = await Location.geocodeAsync(address);
      setNewLatitude(loc[0].latitude);
      setNewLongitude(loc[0].longitude);
    }

    
      setLatitude(newLatitude);
      setLongitude(newLongitude);


      const newRegion = {
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    
      setInitialRegion(newRegion);
    
    mapRef.current.animateToRegion(newRegion, 1000);

  };

  return (

      <View style={styles.tela}>
        <View style={styles.header}>
          {/* Barra de pesquisa */}
        {/*} <GooglePlacesAutocomplete
          placeholder='Local de denúncia'
          onPress={(data, details = null) => {
            //Pegar Latitude e longitude
            setDestination({
              latitude : details.geometry.location.lat,
              longitude :  location.coords.location.lng,
              latitudeDelta : 0.0922,
              longitudeDelta: 0.0421
            })
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyAZlX4e1MClvjd60gFz78S4J8qN1NWoNm0',
            language: 'pt-br',
          }}
          fetchDetails= {true}
          style = {styles.pesquisa}
          // styles={{listView:{height:100}}}
        />*/}

            <TextInput placeholder='Local de denúncia'
              value={address} 
              ref={mapRef}
              onChangeText={setAddress}
              onBlur={updateRegion}
              style = {styles.pesquisa}
            />

          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Image source={menu} style={styles.menu}></Image>
          </TouchableOpacity>{/**Botão que irá abrir o menu */}
          {/* <TextInput style={styles.pesquisa} placeholder="Pesquise alguma localização"></TextInput>*Barra de pesquisa de localização */}
        </View>

        <MapView 
        onPress={updateRegion}
        style={styles.map}
        region={initialRegion}
        showsUserLocation  /**Aqui nessa configuração ele mostra onde o usuário está */
        loadingEnabled
        >

        {Denuncia.length > 0 && (
         Denuncia.map((m) => {
           return (

              <Marker 
              key={m.id_denuncia}
              coordinate = {m} 
              title={m.tipo_problema}
              description={m.desc_problema}
              pinColor="blue" 
              //onPress={()=>{navigation.navigate("PerfilDenuncia")}}
              />

           )
          }) 
          )}

        </MapView>

        <View style={styles.formDenuncia}>
          <TouchableOpacity onPress={()=>{navigation.navigate("Denuncia")}}><Text style={styles.relatar}>Relatar Problema</Text></TouchableOpacity>{/**Aqui é botão de fazer denuncia */}
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    tela:{
      justifyContent: 'center',
      alignItems: 'center',
      flex : 1,
    },
    map:{
        width : "100%",
        height : "77%",
    },
    formDenuncia:{
      width: "100%",
      height: "10%",
      justifyContent: 'center',
      backgroundColor: '#659ee4',
      alignItems : 'center',
    },
    relatar:{
      backgroundColor : "#5271ff",
        fontSize : 25,
        width : 250,
        height : 50,
        textAlign : 'center',
        borderColor : '#5e5e5e',
        borderWidth : 2,
        borderRadius : 7,
        color : 'white',
        paddingTop : 7,
    },
    header:{
      width: "100%",
      height: '13%',
      // justifyContent: 'center',
      backgroundColor: '#659ee4',
      alignItems : 'center',
      flexDirection : "row",
      paddingLeft : 6,
    },
    pesquisa:{
      width : "80%",
      height : "40%",
      backgroundColor : "white",
      marginTop : 45,
      borderRadius : 3,
      paddingLeft : 20,
      marginBottom:10,
      marginRight:10
    },
    menu : {
      width : 55,
      height : 47,
      marginTop : 36,
      marginRight : 15
    }

})

export default Principal
