import React, {useState} from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'

import {
  Button,
  Input
 } from 'react-native-elements'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LeafIcon from '../elements/LeafMenuIcon';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { postUser, getUserEmail } from '../services/UserServices';

import Styles from '../elements/Styles';

const Stack = createNativeStackNavigator()


const Register = (props) => {

    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [repeatPassword, setRepeatPassword] = useState('')

    const validate = () => {
      if(name.trim().length === 0){
        Alert.alert('Erro', 'Nome não informado')
        return false
      }

      const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if(!regEmail.test(email)){
        Alert.alert('Erro', 'Email incorreto')
        return false
      }

      if(password.length == 0){
        Alert.alert('Erro', 'A senha é obrigatória')
        return false
      }

      if(password !== repeatPassword){
        Alert.alert('Erro', 'As senhas precisam ser iguais')
        return false
      }

      return true

    }

    const register = () => {
      if(validate()) {
        getUserEmail(email)
          .then(() => Alert.alert("Erro", "Email já cadastrado"))
          .catch(() => {
            postUser(name,email,password)
              .then(() => {
                Alert.alert("Sucesso", "Usuário cadastrado com sucesso")
                props.navigation.navigate("login")
              })
              .catch((err) => {
                console.log(err)
                Alert.alert("Erro", "Não foi possível cadastrar")
              })
          })   
      }
    }

    return (

      <ScrollView style={Styles.registerContainer}>

        <SafeAreaView>

          <View style={Styles.registerIcon}>
            <LeafIcon />
          </View>

          <Input 
            inputStyle={Styles.registerInput}
            label="Nome" 
            labelStyle={Styles.registerLabel} 
            onChangeText={(value) => setName(value) }
          />

          <Input 
            inputStyle={Styles.registerInput}
            label="Email" 
            labelStyle={Styles.registerLabel} 
            onChangeText={(value) => setEmail(value)}
            />
            
          <Input
            inputStyle={Styles.registerInput}
            label="Senha" 
            labelStyle={Styles.registerLabel} 
            onChangeText={(value) => setPassword(value) }
            secureTextEntry={true}
          />

          <Input 
            inputStyle={Styles.registerInput}
            label="Repetir Senha" 
            labelStyle={Styles.registerLabel} 
            onChangeText={(value) => setRepeatPassword(value) }
            secureTextEntry={true}
          />

          <Button 
            type="outline" 
            title="Cadastrar" 
            titleStyle={Styles.registerButtonTitle} 
            buttonStyle={Styles.registerButton}
            onPress={() => register() }
          />
        </SafeAreaView>
      </ScrollView>     
    )
  }

export default Register