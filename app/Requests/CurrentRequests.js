/**
 * Created by amay on 4/6/19.
 */
import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, TextInput, Alert, ListView, TouchableOpacity } from 'react-native';

export default class ViewProfile extends React.Component {

    constructor(props) {
        super(props);

        this.p_id = this.props.navigation.getParam('profileId', 'NO-ID');
        //his.props.navigation.goBack(ViewRequests);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            data: ds,
            name: ''
        }
    }

    componentDidMount() {

        this.fetchData();

    }

    fetchData() {

        fetch('http://blue.cs.sonoma.edu:8142/getallrequests')
            .then((response) => response.json())
            .then((response) => {
                console.log('response:');
                console.log(response);
                this.setState({
                    data: this.state.data.cloneWithRows(response),
                    // i think right here
                });
            })
            .catch((error) => {
                Alert.alert(
                    'Database Connection Error',
                    'fetch request failed',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.pop() }
                    ]
                )
            });
    }

    renderRow(item, sectionId, rowId, highlightRow) {

        const { p_id, pickup, dest, starttime, endtime, days} = item;

        if(p_id !== this.p_id) {
            return (
                <TouchableOpacity>
                    <View style={styles.list}>
                        <Text>Pickup: {pickup}</Text>
                        <Text>Destination: {dest}</Text>
                        <Text>Pickup Time: {starttime}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <View></View>
            );
        }
    }

    render() {
        return (
            <View>
                <Text>All Requests</Text>
                <ListView
                    dataSource={this.state.data}
                    renderRow={this.renderRow.bind(this)}

                />
            </View>

        );
    }
}

//this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'ProfileView',
//action: NavigationActions.navigate({routeName: 'ViewRequests'})}));

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

AppRegistry.registerComponent('CurrentRequests', () => CurrentRequests);