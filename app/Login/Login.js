import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            username: '',
            password: '',
            data: {}
        };
    }

    tryLogin() {

        let userdata = [];

        fetch('http://blue.cs.sonoma.edu:8142/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                userdata = response;
                this.setState({
                    data: response[0] //this.state.data.cloneWithRows(response)
                });
            })
            .then( () => {
                if( this.state.password !== userdata[0].password) {
                    Alert.alert(
                        'Bad password',
                        'login failed',
                        [
                            {text: 'OK', onPress: () => console.log('click') }
                        ]
                    )
                }
                else {
                    this.props.navigation.push('ProfileSelect', {
                        accountId: userdata[0].a_id
                    });
                }
            })
            .catch((error) => {
                Alert.alert(
                    'Database Connection Error',
                    'login request failed',
                    [
                        {text: 'OK', onPress: () => console.log('click') }
                    ]
                )
            });


    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login Page</Text>
                <Text>Username/Email</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({username: text})}
                    value={this.state.username}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 20, width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
                    onPress={ () => this.tryLogin() }
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

AppRegistry.registerComponent('Login', () => Login);