import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TodoListTask from './todoListTask';

export default class Items extends React.Component {
    state = {
        listVisible: false,
    };
    
    setModalVisible(vis) {
        this.setState({listVisible: vis});
        // console.log(vis + "fsgs");
    }
    removeItem(item) {
        console.log(item)
      }
  render() {
    const item = this.props.list;
    // console.log(item)
    return (
        <View>
            <Modal animationType='slide' visible={this.state.listVisible}>
                <View>
                    <TodoListTask
                        item = {item} 
                        color = {item.color}
                        name = {item.name}
                        tasks = {item.listTask}
                        closeModal = {() => this.setModalVisible(false)}
                        onDelete = {() => this.removeItem(item.listTask)}
                    />
                </View>
            </Modal>
            <TouchableOpacity style={[styles.itemsCon, {backgroundColor: item.color}]}  onPress={() => this.setModalVisible(!this.state.listVisible)}>
                <View style={styles.itemsTi} numberOfLines={1}>
                    <Text style={{fontSize: 20, fontWeight: "700",}}>{item.name}</Text>
                    <TouchableOpacity style={{position:"absolute", right: -8, top: 20}} onPress={this.props.onDelete}>
                        <AntDesign name='close' size={22} color={colors.MediumBlue}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.itemsDate} numberOfLines={1}>Created Date: {item.date}</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    itemsCon: {
        justifyContent: "center",
        paddingHorizontal: 16,
        borderRadius: 10,
        height: 80,
        marginVertical: 12,
        marginHorizontal: 12
    },
    itemsTi: {
        flexDirection:'row',
        justifyContent: "space-between",
        paddingVertical : 10,
    },
    itemsDate: {
        textAlign: 'right',
        fontSize: 12,
        fontStyle:"italic",
        marginEnd: 24
    },
    
});