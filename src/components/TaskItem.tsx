import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import type { Task } from '../store/useTaskStore';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps): JSX.Element {
  const deleteTask = useTaskStore(state => state.deleteTask);
  const toggleTaskCompletion = useTaskStore(state => state.toggleTaskCompletion);

  return (
    <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
      <View style={[styles.container, task.completed && styles.completedCard]}>
        <View style={styles.subcontainer1}>
          <View style={styles.subcontainer2}>
            <Text style={[styles.title, task.completed && styles.completedText]}>
              {task.title}
            </Text>
            <Text style={[styles.body, task.completed && styles.completedText]}>
              {task.body}
            </Text>
          </View>

          <TouchableOpacity style={styles.deletebtn} onPress={() => deleteTask(task.id)}>
            <Text style={styles.deletebtnText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#1F1E1B',
    borderWidth: 2,
    borderColor: '#A35709',
    borderRadius: 7,
  },
  completedCard: {
    backgroundColor: '#2C2B28',
    borderColor: 'green',
  },
  subcontainer1: {
    flexDirection: 'row',
  },
  subcontainer2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '300',
    color: '#fff',
    fontSize: 30,
  },
  body: {
    fontSize: 14,
    color: '#fff',
  },
  completedText: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  deletebtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1A17',
    borderWidth: 2,
    borderColor: '#FF8303',
    borderRadius: 7,
    paddingBottom: 5,
    marginLeft: 8,
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  deletebtnText: {
    color: '#FF8303',
    fontSize: 20,
    fontWeight: '300',
  },
});
