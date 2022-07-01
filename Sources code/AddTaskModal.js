import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Colors from './Colors';
// import tempData from './tempData';
import Fire from "./Fire";

export default class AddTaskModal extends Component {
  state = {
    name: "",
    listData: [],
    user: {},
    loading: true
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("loi loi loi");
      }

      firebase.getList(listData => {
        this.setState({listData, user}, () => {
          this.setState({loading: false});
        })
      })

      this.setState({user});
      console.log(this.state.user.uid);
    });
  }


  listBGColor = ["#FAEBD7","#7FFFD4","#DEB887","#8A2BE2","#7FFF00","#D2691E","#FF7F50","#B8860B","#BDB76B","#A9A9A9","#8B008B","#556B2F","#8FBC8F","#E9967A","#FFD700","#ADFF2F"]
  addTaskToDoList = () => {
    const name = this.state['name']
    const date = new Date().toDateString()+", "+new Date().toLocaleTimeString()
    const listTask = []
    const color = this.listBGColor[Math.floor(Math.random() * this.listBGColor.length)]

    const newData = {name, date, listTask, color}
    this.props.addTask(newData)

    this.props.onCloseModal()
  }
  render() {
    return (
     <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.heading}>CREATE NEW TASK</Text>
        <TextInput placeholder='Task name'  style={styles.input}  onChangeText={text => this.setState({name: text})}/>

        <View style={{width: "94%", flexDirection: 'row', justifyContent: "flex-end", marginTop: 10}}>
          <Text style={styles.button} onPress={this.addTaskToDoList}>Create</Text>
          <Text style={styles.close} onPress={this.props.onCloseModal}>Close</Text>
        </View>
     </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginVertical: "100%",
        borderRadius: 10,
        marginHorizontal: -8,
        minHeight: 220,
    },
    input: {
      borderWidth: 1, 
      borderColor: Colors.lightBlue, 
      borderRadius: 5, fontSize: 20, 
      width: "98%", 
      paddingHorizontal: 12, 
      paddingVertical: 6,
      marginBottom: 20
    },
    heading: {
      fontSize: 26,
      marginVertical: 14,
      fontWeight: "bold",
      color: Colors.OliveDrab
    },
    close:{
      fontSize: 22,
      color: Colors.DimGrey,
      paddingVertical: 8,
      width: 100,
      textAlign: "center"
    },
    button: {
      fontSize: 22,
      backgroundColor: Colors.OliveDrab,
      paddingVertical: 8,
      borderRadius: 8,
      width: 106,
      textAlign: "center"
    }
});