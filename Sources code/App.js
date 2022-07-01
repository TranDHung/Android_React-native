import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, LogBox } from 'react-native';
import Item from './Items';
import colors from './Colors';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import AddTaskModal from './AddTaskModal';
import Modal from "react-native-modal";
import Fire from "./Fire";
import _ from 'lodash';
import SQLite from "react-native-sqlite-storage";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};


export default class App extends React.Component {
  state = {
    listVisible: false,
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
    });


  }



  setModalVisible(vis) {
    this.setState({listVisible: vis});
  }

  renderTask = listItem => {
    return <Item 
              list = {listItem} 
              onDelete = {() => this.showAlert(listItem)}
            />
  }

  handleCheck(val) {
      return this.state.listData.some(item => val.name === item.name);
  }

  addTask = listItem => {
    if(this.handleCheck(listItem)) {
      Alert.alert(listItem.name+" already exists!")
    
    }else if(listItem.name.length != 0){

      firebase.addTask({
        name: listItem.name,
        date: listItem.date,
        listTask: listItem.listTask,
        color: listItem.color
      })
    }
  }
  showAlert = (item) =>
    Alert.alert(
      "Delete Task",
      "You want to delete "+item.name+"?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => this.removeItem(item),
          style: "yes",
        },
      ],
      {
        cancelable: true,
      }
  );
  removeItem(item) {
    firebase.deleteTask(item);
  }
  removeAll() {
    Alert.alert(
      "Delete All",
      "You want to delete all item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => firebase.deleteAll(),
          style: "yes",
        },
      ],
      {
        cancelable: true,
      }
    );
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.listVisible}
          animationIn="slideInDown"
          animationInTiming={400}
          hasBackdrop={true}
          backdropColor={colors.black}
          onBackdropPress={() => this.setModalVisible(false)}
          backdropOpacity={0.7}
          onRequestClose={() => this.setModalVisible(!this.state.listVisible)}
          >
          <AddTaskModal onCloseModal ={() => this.setModalVisible(false)} addTask = {this.addTask}/>
        </Modal>
        
        <View style={{flexDirection: 'row', marginTop: 85}}>
          <View style={styles.titleH}/>
          <Text style={styles.title}>Todo <Text style={{color: colors.OliveDrab, fontWeight: "bold"}}>List</Text></Text>
          <View style={styles.titleH}/>
        </View>

        <View style={{flexDirection: 'row', justifyContent: "space-evenly"}}>

          <View style={{justifyContent: "center"}}>
            <TouchableOpacity style={styles.addItem} onPress={() => this.setModalVisible(!this.state.listVisible)}>
                <AntDesign name='plus' size={20} color={colors.MediumBlue}/>
            </TouchableOpacity>
            <Text style={{fontSize: 16, marginTop: 6, color: colors.MediumBlue, marginBottom: 22, textAlign: "center"}}>Add Items</Text>
          </View>

          <View style={{justifyContent: "center"}} >
            <TouchableOpacity style={styles.removeItems} onPress={() => this.removeAll()}>
                <AntDesign name='delete' size={28} color={colors.red}/>
            </TouchableOpacity>
            <Text style={{fontSize: 16, marginTop: 6, color: colors.red, marginBottom: 22, textAlign: "center"}}>Delete All</Text>
          </View>
          
        </View>
        <View style={styles.body}>
          <FlatList 
            removeClippedSubviews={false}
            data={this.state.listData}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => this.renderTask(item)}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PapayaWhip,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  titleH: {
    backgroundColor: colors.blue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    paddingHorizontal: 30,
  },
  addItem: {
    marginTop: 16,
    borderRadius: 10,
    borderWidth: 2,
    padding: 8,
    borderColor: colors.MediumBlue,
    width: 40,
    alignSelf: "center"
  },
  removeItems: {
    marginTop: 16,
    padding: 6,
    alignSelf: "center"
  },
  body: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    margin: 8
  },
});
