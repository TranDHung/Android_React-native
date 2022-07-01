import React, { Component, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, FlatList, TextInput, KeyboardAvoidingView, Alert, LogBox } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from './Colors';
import Fire from "./Fire";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default class TodoListTask extends Component {
    state = {
        nameTask: "",
        // listTask: this.props.tasks,
        item: this.props.item,
        // loading: false
    };
    componentDidMount() {
        firebase = new Fire((error) => {
            if (error) {
              return alert("loi loi loi");
            }
      
        });
    }

    removeTask(item){
        console.log(item)
        this.state.item.listTask = this.state.item.listTask.filter(function(task) { 
            return task !== item 
        });
        firebase.updateTask(this.state.item);
    }
    handleCheck(val) {
        return this.state.item.listTask.some(item => val === item);
    }
    addTask(){
        const nameTask = this.state.nameTask;
        if(this.handleCheck(nameTask)) {
            Alert.alert(nameTask+" already exists!")
        
        }else if(nameTask.length != 0){

            this.state.item.listTask = [this.state.nameTask, ...this.state.item.listTask];

            firebase.updateTask(this.state.item);
    
        }
        this.setState({nameTask: ""});

    }
  render() {
    return (
      <KeyboardAvoidingView>
            <View style={styles.taskHeader}>
                <TouchableOpacity style={styles.closeItem} onPress={this.props.closeModal}>
                    <AntDesign name='close' size={24} color={colors.MediumBlue}/>
                </TouchableOpacity>
                <Text style={[styles.modelNameItem, {borderBottomColor:this.props.color, color: this.props.color}]}>{this.props.name}</Text>
            </View>

            <KeyboardAvoidingView style={styles.addTask}>
                <TextInput 
                    style={styles.input} 
                    onChangeText={text => this.setState({nameTask: text})} 
                    value={this.state.nameTask}
                    placeholder="Create new task"></TextInput>
                <AntDesign name='plus' size={36} style={[styles.add,{backgroundColor: this.props.color}]} onPress={()=> this.addTask()}></AntDesign>
            </KeyboardAvoidingView>

            <View style={styles.body}>
                <FlatList
                    removeClippedSubviews={false} 
                    data={this.state.item.listTask}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                        
                        
                        
                        return (
                        
                        <TouchableOpacity onPress={() => this.removeTask(item)}>
                            <View style={styles.task}>
                                <Ionicons name='information-circle' size={22}></Ionicons>
                                <Text style={styles.name}>{item}</Text>
                            </View>    
                        </TouchableOpacity>
                    )}}
                ></FlatList>
            </View>       
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
    closeItem: {
        position: "absolute",
        right: 12,
        top: 20,
    },
    modelNameItem: {
        fontSize: 30,
        position: "absolute",
        top: 10,
        left: 20,
        fontWeight: "700",
        width: "80%",
        borderBottomWidth: 2,
    },
    body: {
        marginTop: 16,
        marginHorizontal: 14,
        
    },
    task: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    name: {
        fontSize: 22, 
        marginLeft: 14,
        marginBottom: 4,
        width: "90%"
    },
    taskHeader: {
        height: 86,
    },
    addTask: {
        paddingHorizontal: 10,
        flexDirection: 'row', 
        justifyContent: "space-between", 
        height: 40,
    },
    input: {
        borderColor: colors.silver,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        width: "86%",
        paddingHorizontal: 10
    },
    add: {
        backgroundColor: colors.OliveDrab,
        width: 40,
        color: colors.white,
        textAlign: "center",
        paddingTop: 2,
        borderRadius: 5
    },
})
