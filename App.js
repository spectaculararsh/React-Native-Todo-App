/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text,  TextInput, ListView, Keyboard} from 'react-native';
import Header from "./views/Header";
import Footer from "./views/Footer";
import Row from "./views/Row";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      allComplete: false,
      value : "",
      items : [],
      dataSource: ds.cloneWithRows([])
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }
  handleToggleAllComplete(){
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) =>({
      ...item,
      complete
    }))
    console.table(newItems);
    this.setState({
      items: newItems,
      allComplete: complete
    })
  }
  handleAddItem(){
    if(!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setState({
      items:newItems,
      value:""
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Header 
        value = {this.state.value}
        onAddItem = {this.handleAddItem}
        onChange = {(value) => this.setState({value})}
        onToggleAllComplete = {this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView 
            style = {styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({key, ...value}) => {
              return (<Row key = {key}
              {...value}
              />
              )
            }}
            renderSeparator = {(sectionId,  rowId) => {
              return <View key={rowId} style = {stylesd.separator}/>
            }}
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      android:{paddingTop: 30}
    })
  },
  content:{
    flex: 1
  },
  list:{
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  }
})