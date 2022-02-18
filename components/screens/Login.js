import React, {useState} from 'react'
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {
  Button,
  Input
 } from 'react-native-elements'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LeafIcon from '../elements/LeafMenuIcon';

import Styles from '../elements/Styles';

import { login, getUserEmail } from '../services/UserServices';

import { saveToken, saveUserId } from '../database/DB';

import jwtDecode from 'jwt-decode';


const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [idUser, setIdUser] = useState('')

    const validate = () => {

      if( email.trim().length === 0){
          Alert.alert('Erro', 'Informe um Email!')
          return false
      }

      if( password.length === 0){
          Alert.alert('Erro', 'Informe a senha!') 
          return false
      }

      return true
    }

    const redirect = () => {
      props.navigation.reset({
          index : 0,
          routes : [{
              name: 'principal'
          }]
      })
    }

    const getIdUser = (token) => {
      const payload = jwtDecode(token)
      getUserEmail(payload.email)
        .then((response) => {
          saveToken(token)
          saveUserId(response.data.id)
          redirect()
        })
        .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
    }

    const loginUser = () => {
      if (validate()) {
          login(email, password)
            .then( (response) => { 
              getIdUser(response.data.token)      
      })
          .catch(() => Alert.alert('Erro', 'Email/senha inválidos!') )
      }
    }

    return (

      <ScrollView style={Styles.loginContainer}>
        
        <SafeAreaView>
          
          <View style={Styles.loginIcon}>
            <LeafIcon/>
          </View>
          
          <Input 
            inputStyle={Styles.loginInput}
            label="Email" 
            labelStyle={Styles.loginLabel} 
            onChangeText={(txt) => setEmail(txt)}
            value={email}
          />

          <View>
            <Input
              containerStyle={Styles.loginInputPass}
              inputStyle={Styles.loginInput}
              label="Senha" 
              labelStyle={Styles.loginLabel} 
              secureTextEntry={true}
              onChangeText={(txt) => setPassword(txt)}
              value={password} 
            />

            
          </View>

          <Button 
            buttonStyle={Styles.loginButton} 
            onPress={() => loginUser()}
            title="Login" 
            titleStyle={Styles.loginButtonTitle} 
            type="outline" 
          />

          

        </SafeAreaView>
      
      </ScrollView>     
    )
  }

export default Login