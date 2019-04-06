import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default class CreateAccount extends React.Component {

    constructor(props) {
        super(props);

        //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            username: '',
            email: '',
            password: '',
            address: '',
            city: '',
            zip: '',
            state: '',
            data: {}
        };
    }

    createA() {

        let userdata = [];

        fetch('http://blue.cs.sonoma.edu:8142/createaccount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                city: this.state.city,
                zip: this.state.zip,
                state: this.state.state
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                //userdata = response;
                /*
                this.setState({
                    data: response[0] //this.state.data.cloneWithRows(response)
                });
                */
                console.log('in create account');
                console.log(response.insertId);
                this.props.navigation.push('CreateProfile', {
                    accountId: response.insertId
                });
            })
            .catch((error) => {
                Alert.alert(
                    'Account Creation Error',
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
                <Text>Create Account</Text>
                <Text>Username</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({username: text})}
                    value={this.state.username}
                />
                <Text>email</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 20, width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text>Address</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({address: text})}
                    value={this.state.address}
                />
                <Text>City</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({city: text})}
                    value={this.state.city}
                />
                <Text>Zip</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({zip: text})}
                    value={this.state.zip}
                />
                <Text>State</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({state: text})}
                    value={this.state.state}
                />
                <Button
                    title="Create"
                    onPress={ () => this.createA() }
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

AppRegistry.registerComponent('CreateAccount', () => CreateAccount);