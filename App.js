import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from './app/Login/Login'
import ProfileSelectScreen from './app/Profile/ProfileSelect'
import ProfileViewScreen from './app/Profile/ProfileView'
import CreateAccountScreen from './app/Profile/CreateAccount'
import CreateProfileScreen from './app/Profile/CreateProfile'
import ViewRequests from './app/Requests/ViewRequests'
import CurrentRequests from './app/Requests/CurrentRequests'
import CreateRequest from './app/Requests/CreateRequest'


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Image
              style={{resizeMode: 'contain'}}
              source={require('./app/images/logo.png')}
          />
          <Button
              title="Login"
              onPress={ () => this.props.navigation.push('Login') }
          />
          <Button
              title="Sign Up"
              onPress={ () => this.props.navigation.push('CreateAccount') }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Login: LoginScreen,
        ProfileSelect: ProfileSelectScreen,
        ProfileView: ProfileViewScreen,
        CreateAccount: CreateAccountScreen,
        CreateProfile: CreateProfileScreen,
        ViewRequests: ViewRequests,
        CurrentRequests: CurrentRequests,
        CreateRequest: CreateRequest,
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}