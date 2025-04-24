import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';//Connects to the Zustand store
import TaskItem from '../components/TaskItem';

export default function HomeScreen() {
  const { tasks, loadTasks, addTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    loadTasks();// Load saved tasks when screen open
  }, [loadTasks]);
//Add task to list
  const handleAdd = () => {
    if (title.trim()) {
      addTask(title, body);
      setTitle('');
      setBody('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer1}>
        <View style={styles.subcontainer2}>

          {/* Title Bar */}
          <TextInput
            placeholder="Title..."
            placeholderTextColor="#ccc"
            value={title}
            onChangeText={setTitle}
            style={[styles.input,styles.title]}
          />

          {/* About Bar */}
          <TextInput
            placeholder="About..."
            placeholderTextColor="#ccc"
            value={body}
            onChangeText={setBody}
            style={[styles.input,styles.about]}
          />
        </View>
        <TouchableOpacity style={styles.addbtn} onPress={handleAdd}>
          <Text style={styles.addbtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.noTaskText}>No tasks</Text>//If no tasks, show "No tasks"
      ) : (
        //If tasks exist, show them in a list
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: '#1B1A17',
  },
  subcontainer1: {
    flexDirection: 'row',
    padding: 16,
  },
  subcontainer2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#A35709',
    backgroundColor:'#1F1E1B',
    borderRadius: 5,
    borderWidth: 2,
    padding: 8,
    margintop: 3,
    marginBottom: 3,
    color: '#fff',
  },
  title: {
    fontSize: 19,
  },
  about: {
    fontSize: 15,
  },
  addbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1A17',
    borderWidth:3,
    borderColor: '#FF8303',
    borderRadius: 7,
    paddingBottom: 5,
    marginLeft: 8,
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  addbtnText: {
    color: '#FF8303',
    fontSize: 50,
    fontWeight: 'light',
  },
  noTaskText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
    fontSize: 30,
  },
});
