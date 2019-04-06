import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default class CreateProfile extends React.Component {

    constructor(props) {
        super(props);

        this.a_id = this.props.navigation.getParam('accountId', 'NO-ID');

        this.state = {
            name: '',
            bio: '',
            phone: ''
        };
    }

    createP() {

        let userdata = [];

        fetch('http://blue.cs.sonoma.edu:8142/createprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                a_id: this.a_id,
                name: this.state.name,
                bio: this.state.bio,
                phone: this.state.phone
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
                this.props.navigation.push('ProfileView', {
                    profileId: response.insertId
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
                <Text>Create Profile</Text>
                <Text>Name</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                />
                <Text>Bio</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({bio: text})}
                    value={this.state.bio}
                />
                <Text>Phone Number</Text>
                <TextInput
                    style={{height: 20, width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({phone: text})}
                    value={this.state.phone}
                />
                <Button
                    title="Create"
                    onPress={ () => this.createP() }
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

AppRegistry.registerComponent('CreateProfile', () => CreateProfile);