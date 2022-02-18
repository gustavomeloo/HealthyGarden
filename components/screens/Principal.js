import React, {useState, useEffect} from 'react'

import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native'

import {
  Button,
  Header
} from 'react-native-elements'

import DropIcon from '../elements/DropIcon'
import LeafMenuIcon from '../elements/LeafMenuIcon'
import MQTT from 'sp-react-native-mqtt'
import PlantIcon from '../elements/PlantIcon'
import StatusCard from '../elements/StatusCard'
import Styles from '../elements/Styles'
import ThermometerIcon from '../elements/ThermometerIcon'
import { getToken, getUserId } from '../database/DB'
import { getUserEmail } from '../services/UserServices'
import { getGarden, getGardenByIdUser, putGarden } from '../services/GardenServices'
import {getSetting} from '../services/SettingServices'
import jwtDecode from 'jwt-decode'
import { postHistoric } from '../services/HistoricServices'

const client = MQTT.createClient({
  uri: 'ws://ioticos.org:1883',
  clientId: 'client1239845y29qdc',
  auth: true,
  user:'24iFJYlSQfP4y2A',
  pass:'2uQJJ3JTE4BAbYA'
})

const Principal = (props) => {
  

  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [isWatering, setIsWatering] = useState(false)

  const [idGarden, setIdGarden] = useState(0)
  const [idUser, setIdUser] = useState(0)
  const [nameGarden, setNameGarden] = useState('')
  const [dsGarden, setDsGarden] = useState('')
  const [numberTemp, setNumberTemp] = useState(3)
  const [numberHumi, setNumberHumi] = useState(3)
  const [dsTemp, setDsTemp] = useState('')
  const [dsHumi, setDsHumi] = useState('')
  const [minHumi, setMinHumi] = useState(0)
  const [maxHumi, setMaxHumi] = useState(0)
  const [minTemp, setMinTemp] = useState(0)
  const [maxTemp, setMaxTemp] = useState(0)
  const [isAutomatic, setIsAutomatic] = useState(false)
  const [minHumiDay, setMinHumiDay] = useState(100)
  const [maxTempDay, setMaxTempDay] = useState(0)
  const [changeStatus, setChangeStatus] = useState(false)
  const [didMount, setDidMount] = useState(false); 

  //const {idUser} = props.route.params


  const redirect = () => {
    props.navigation.reset({
        index : 0,
        routes : [{
            name: 'createGarden'
        }]
    })
  }

  const getGardenById = (idUser) => {
    getGardenByIdUser(idUser)
      .then((response) => {
        setIdGarden(response.data.id)
        setNameGarden(response.data.name)
        setDsGarden(response.data.description)
        setNumberHumi(response.data.moistureStatus)
        setNumberTemp(response.data.temperatureStatus)
        setDsHumi(response.data.moistureStatusDescription)
        setDsTemp(response.data.temperatureStatusDescription)
        getSetting(response.data.id)
          .then((response) => {
            setMinHumi(response.data.minimumMoisture)
            setMaxHumi(response.data.maximumMoisture)
            setMinTemp(response.data.minimumTemperature)
            setMaxTemp(response.data.maximumTemperature)
            setIsAutomatic(response.data.isAutomatic)
          })
          .catch((error) => {
            Alert.alert("Erro", "Não foi possivel resgatar as configurações")
          })
      })
      .catch(() => redirect())
  }

  const watering = () => {
    setIsWatering(true)
    client.then(function(client){
      client.publish('11FkGoi1g8h6cP8/solenoid/', "0", 0, false)
      console.log("Abri")
    })
    setTimeout(()=>{
      client.then(function(client){
        client.publish('11FkGoi1g8h6cP8/solenoid/', "1", 0, false)
        setIsWatering(false)
        console.log("Fechei")
      })
    }, 2000)
  }

  useEffect(() => {
      setDidMount(true)
      getUserId((error, success) => {
          if( !error && success && success.trim().length > 0 ) {
              const id = JSON.parse(success)
              setIdUser(id)
              getGardenById(id)
          }
      })
      return () => setDidMount(false);
  }, [])

  useEffect(() => {
    if(humidity < minHumi && isAutomatic && !isWatering){
      watering()
    }

    if(humidity < minHumiDay){
      setMinHumiDay(humidity)
    }

    if(humidity < minHumi && numberHumi != 1){
      setNumberHumi(1)
      setDsHumi('Seco')
      setChangeStatus(true) 
    }

    if(humidity > maxHumi && numberHumi != 2){
      setNumberHumi(2)
      setDsHumi('Umido') 
      setChangeStatus(true) 
    }

    if(humidity <= maxHumi && humidity >= minHumi && numberHumi != 3){
      setNumberHumi(3)
      setDsHumi('Neutro')
      setChangeStatus(true)
    }

  }, [humidity])

  useEffect(() => {
    if (temperature > maxTempDay){
      setMaxTempDay(temperature)
    }

    if(temperature < minTemp && numberTemp != 2){
      setNumberTemp(2)
      setDsTemp('Frio')
      setChangeStatus(true)
    }

    if(temperature > maxTemp && numberTemp != 1){
      setNumberTemp(1)
      setDsTemp('Quente')
      setChangeStatus(true)
    }

    if(temperature <= maxTemp && temperature >= minTemp && numberTemp != 3){
      setNumberTemp(3)
      setDsTemp('Neutro')
      setChangeStatus(true)
    }
    
  }, [temperature])

  useEffect(() => {
    const intervalId = setInterval(() => {
      var now = new Date();
      var hour = now.getHours();
      if(hour === 23 ){
        postHistoric(idGarden, now, minHumiDay, maxTempDay)
          .then(() => {
            console.log("Histórico cadastrado com sucesso")          
          })
          .catch((err) => {
            console.log(err)
          }) 
      }
    }, 3600000);
    return () => clearInterval(intervalId);
  }, [idGarden, minHumiDay, maxTempDay])

  useEffect(() => { 
    if(changeStatus){
      console.log(idGarden, idUser, numberHumi, numberTemp, nameGarden,dsGarden)
      putGarden(idGarden, idUser, numberHumi, numberTemp, nameGarden,dsGarden)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      setChangeStatus(false)
    }
  }, [changeStatus])
  
  
  client.then(function(client) {
    client.on('message', function(msg) {
      let obj = JSON.parse(msg.data)
      console.log(obj)

      if(obj[1] == "temp") setTemperature(obj[0])
      if(obj[1] == "humidity") setHumidity(obj[0])

      //setTemperature(obj["temperature"])
      //setHumidity(obj["humidity"])
    });
  
    client.on('connect', function() {
      console.log('connected');
      client.subscribe('11FkGoi1g8h6cP8/temp/', 0);
      client.subscribe('11FkGoi1g8h6cP8/humidity/', 0);
    });
  
    client.connect();
  })

  return(
    <ScrollView style={Styles.principalContainer}>
      <SafeAreaView>
        <Header 
          backgroundColor='#08B662' 
          leftComponent={<LeafMenuIcon/>}
        />
        
        <Text style={Styles.principalTitle}>{nameGarden}</Text>
        
        <StatusCard 
          componentIcon={<PlantIcon/>}
          containerColor='#4A9F2C' 
          statusText={"Sua horta está: " + dsTemp + '/' + dsHumi}  
          textSize = {16} 
        />

        <StatusCard 
          componentIcon={<DropIcon/>}
          containerColor='#2C6F9F' 
          statusText={humidity+"%"}  
          textSize = {24} 
        />
        
        <StatusCard 
          componentIcon={<ThermometerIcon/>}
          containerColor='#9F712C' 
          statusText={temperature} 
          textSize = {24} 
        />
        
        <View style={Styles.principalViewButtons}>

          <Button
            buttonStyle={Styles.principalButton}
            containerStyle={Styles.principalButtonContainer}
            onPress={() => {
              if(!isWatering){
                watering()
              }
            }}
            title='Regar'/>

        </View>
      </SafeAreaView>
    </ScrollView>
    
  )
}

export default Principal