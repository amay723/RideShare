/**
 * Created by amay on 4/6/19.
 */
/**
 * Created by amay on 4/5/19.
 */
import React from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, TextInput, Alert, DatePickerIOS } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class ViewProfile extends React.Component {

    constructor(props) {
        super(props);

        this.p_id = this.props.navigation.getParam('profileId', 'NO-ID');

        //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        this.state = {
            startdate: new Date(),
            enddate: new Date(),
            pickup: '',
            destination: '',
            recurring: false,
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false

        };

        this.setstartDate = this.setstartDate.bind(this);
        this.setendDate = this.setendDate.bind(this);
    }


    setstartDate(newDate) {
        this.setState({startdate: newDate});
    }
    setendDate(newDate) {
        this.setState({enddate: newDate});
    }

    componentDidMount() {

    }

    submit() {

        let days = '';
        if( this.state.recurring ) {

            if (this.state.sunday) {
                days += '1';
            }
            if (this.state.monday) {
                days += '2';
            }
            if (this.state.tuesday) {
                days += '3';
            }
            if (this.state.wednesday) {
                days += '4';
            }
            if (this.state.thursday) {
                days += '5';
            }
            if (this.state.friday) {
                days += '6';
            }
            if (this.state.saturday) {
                days += '7';
            }
        }

        fetch('http://blue.cs.sonoma.edu:8142/createrequest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                p_id: this.p_id,
                startdate: this.state.startdate,
                enddate: this.state.enddate,
                recurring: this.state.recurring,
                days: days,
                pickup: this.state.pickup,
                destination: this.state.destination
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                Alert.alert(
                    'success',
                    'success',
                    [
                        {text: 'OK', onPress: () => console.log('click') }
                    ]
                )
            })
            .then( () => {
                console.log('profile data');
                console.log(this.state.data);
                this.props.navigation.push('CurrentRequests');
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
                <Text>Create Requests</Text>
                <Text>Pickup Location</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({pickup: text})}
                    value={this.state.pickup}
                />
                <Text>Destination Location</Text>
                <TextInput
                    style={{height: 20,width: 100, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({destination: text})}
                    value={this.state.destination}
                />
                <Text>Time</Text>
                <DatePickerIOS
                    date={this.state.startdate}
                    onDateChange={this.setDate}
                />
                <CheckBox
                    title='Recurring'
                    checked={this.state.recurring}
                    onPress={() => this.setState({recurring: !this.state.recurring})}
                />
                { this.state.recurring ?
                    <View>
                        <CheckBox
                            title='Sunday'
                            checked={this.state.sunday}
                            onPress={() => this.setState({sunday: !this.state.sunday})}
                            size={15}
                        />
                        <CheckBox
                            title='Monday'
                            checked={this.state.monday}
                            onPress={() => this.setState({monday: !this.state.monday})}
                            size={15}
                        />
                        <CheckBox
                            title='Tuesday'
                            checked={this.state.tuesday}
                            onPress={() => this.setState({tuesday: !this.state.tuesday})}
                            size={15}
                        />
                        <CheckBox
                            title='Wednesday'
                            checked={this.state.wednesday}
                            onPress={() => this.setState({wednesday: !this.state.wednesday})}
                            size={15}
                        />
                        <CheckBox
                            title='Thursday'
                            checked={this.state.thursday}
                            onPress={() => this.setState({thursday: !this.state.thursday})}
                            size={15}
                        />
                        <CheckBox
                            title='Friday'
                            checked={this.state.friday}
                            onPress={() => this.setState({friday: !this.state.friday})}
                            size={15}
                        />
                        <CheckBox
                            title='Saturday'
                            checked={this.state.saturday}
                            onPress={() => this.setState({saturday: !this.state.saturday})}
                            size={15}
                        />
                        <Text>End Date</Text>
                        <DatePickerIOS
                            date={this.state.enddate}
                            onDateChange={this.setendDate}
                        />
                    </View> :
                    <Text></Text>

                }
                <Button
                    title="Submit"
                    onPress={ () => this.submit() }

                    //onPress={ () => this.props.navigation.push('ProfileView'
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

AppRegistry.registerComponent('CreateRequests', () => CreateRequests);/**
 * Created by amay on 4/5/19.
 */

