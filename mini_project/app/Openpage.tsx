import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import HomeTabs from './(tabs)/index';


// Define the navigation types
type RootStackParamList = {
  Openpage: undefined;
  Login: undefined;
  Registration: undefined;
  HomeTabs: undefined;
};


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function Openpage() {
  const navigation = useNavigation<NavigationProp>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Page</Text>
     
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
       
       
       
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
  },
  buttonSpacing: {
    height: 15,
  },
});

