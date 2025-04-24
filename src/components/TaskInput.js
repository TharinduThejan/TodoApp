
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useTaskStore } from '../store/useTaskStore';

export default function TaskInput() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const addTask = useTaskStore(state => state.addTask);
    const toggleTaskCompletion = useTaskStore(state => state.toggleTaskCompletion);

  const handleAdd = () => {
    if (title.trim()) {
      addTask(title, body);
      setTitle('');
      setBody('');
    }
  };
  return (
    
    <View style={{ padding: 10 }}>
      <TextInput placeholder="Title..." value={title} onChangeText={setTitle} style={{ borderWidth: 50, marginBottom: 5 }} />
      <TextInput placeholder="About..." value={body} onChangeText={setBody} style={{ borderWidth: 1, marginBottom: 5 }} />
      <Button title="+" onPress={handleAdd} />
    </View>
  );
}