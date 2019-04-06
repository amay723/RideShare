/**
 * Created by amay on 4/5/19.
 */
import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default class ViewProfile extends React.Component {

    constructor(props) {
        super(props);

        this.p_id = this.props.navigation.getParam('profileId', 'NO-ID');

        //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            data: [],
            name: ''
        }
    }

    componentDidMount() {

        this.fetchData();

    }

    fetchData() {

        fetch('http://blue.cs.sonoma.edu:8142/accprofiles', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                a_id: this.a_id
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                let newdata = [...response];
                this.setState({
                    data: newdata, //this.state.data.cloneWithRows(response)
                    name: newdata[0].name
                });
                console.log(this.state.data);
            })
            .then( () => {
                console.log('profile data');
                console.log(this.state.data);
            })
            .catch((error) => {
                Alert.alert(
                    'Database Connection Error',
                    'profile request failed',
                    [
                        {text: 'OK', onPress: () => console.log('click') }
                    ]
                )
            });
    }

    render() {
        return (
            <View>
                <Text>In ProfileView, PID: {this.p_id}</Text>
                <Text>Hello {this.state.name}!</Text>
                <Button
                    title="Create a ride request"
                    //onPress={ () => console.log('add profile') }
                    style={{alignItems: 'left'}}
                    onPress={ () => this.props.navigation.push('CreateRequest', {
                        profileId: this.p_id
                    })}
                />

                <Button
                    title="View ride requests"
                    //onPress={ () => console.log('add profile') }
                    style={{alignItems: 'left'}}
                    onPress={ () => this.props.navigation.push('CurrentRequests', {
                    })}
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
    profile: {
        flex: 1,
        backgroundColor: '#0000ff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    list: {
        flex: 1,
        margin: 10,
        backgroundColor: '#00FCFF'
    }

});

AppRegistry.registerComponent('ViewRequests', () => ViewRequests);/**
 * Created by amay on 4/5/19.
 */
