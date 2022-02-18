import React, {useEffect} from 'react'

import {
  SafeAreaView, 
  Text, 
  View
} from 'react-native'

import {
  Button
} from 'react-native-elements'

import LeafIcon from '../elements/LeafMenuIcon'
import Styles from '../elements/Styles'
import { getToken } from '../database/DB'


const Home = (props) => {

  const redirect = () => {
    props.navigation.reset({
        index : 0,
        routes : [{
            name: 'principal'
        }]
    })
  }
  
  useEffect( () => {
    getToken( (error, token) => {
        if(!error && token?.trim().length > 0) {
          redirect()
        }
    } )
  } )

  return(
    <SafeAreaView style={Styles.homeContainter}>

      <View style={Styles.homeUpView} > 

        <LeafIcon/>

        <Text style={Styles.homeWelcome}>
          Olá, Seja Bem vindo!!
        </Text>

        <Text style={Styles.homeDescription}>
          Seu aplicativo Healthy Garden para manter sua horta saudável e bem cuidada. 
        </Text>

      </View>

      <View style={Styles.homeDownView}>
        <Button 
          buttonStyle={Styles.homeButtonRegister}   
          onPress={() => props.navigation.navigate('register') } 
          title='Cadastrar' 
          titleStyle={Styles.homeButtonTitle} 
          type="outline"  
        />

        <Button 
          buttonStyle={Styles.homeButtonLogin} 
          onPress={() => props.navigation.navigate('login') } 
          title='Login'
          titleStyle={Styles.homeButtonTitle}  
          type="outline" 
        />
      </View>

      <Text style={Styles.homeCopyright}>
        {'\u00A9'} 2020-2021 OrionSolutions, Inc.
      </Text>
    
    </SafeAreaView>
  )
}

export default Home