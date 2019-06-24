import React, {Component} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native"
//Header component for header data containing various functionalities
class Header extends Component{
    render(){
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={this.props.onToggleAllComplete}>
                    <Text style= {styles.toogleIcon}>{String.fromCharCode(10003)}</Text>
                </TouchableOpacity>
                <TextInput
                value={this.props.value}
                onChangeText = {this.props.onChange}
                onSubmitEditing={this.props.onAddItem}
                placeholder="What needs to be done?"
                blurOnSubmit={false}
                returnKeyType="done"
                style={styles.input}/>
                <TouchableOpacity onPress={this.props.onAddItem}>
                    <Text style={styles.toogleIcon}>{String.fromCharCode(10003)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header:{
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    toogleIcon:{
        fontSize: 30,
        color: "#CCC"
    },
    input:{
        flex: 1,
        marginLeft: 16,
        height: 50
    }
})

export default Header;