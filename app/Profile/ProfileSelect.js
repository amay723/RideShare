import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, ListView, Alert, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'

export default class SelectProfile extends React.Component {

    constructor(props) {
        super(props);

        this.a_id = this.props.navigation.getParam('accountId', 'NO-ID');

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            data: []
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
                this.setState({
                    data: [...response] //this.state.data.cloneWithRows(response)
                });
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
/*
    renderRow(item, sectionId, rowId, highlightRow) {

        const { name } = item;

        return (
            <TouchableOpacity>
                <View style={styles.list}>
                    <Text>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    */

    render() {
        return (
            <View>
                <Button
                    title="Add Profile +"
                    onPress={ () => this.props.navigation.push('CreateProfile', {
                        accountId: this.a_id
                    })}
                    style={{alignItems: 'left'}}
                />
                <Text>Select a Profile</Text>
                {
                    this.state.data.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: 'https://media.asicdn.com/images/jpgo/25390000/25391162.jpg' } }}
                            title={l.name}
                            subtitle={l.phoneNum}
                            onPress={ () => this.props.navigation.push('ProfileView', {
                                profileId: l.p_id,
                                accountId: this.a_id
                            })}
                        />
                    ))
                }
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

AppRegistry.registerComponent('SelectProfile', () => SelectProfile);