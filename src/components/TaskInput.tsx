import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useTaskStore } from '../store/useTaskStore';

export default function TaskInput(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const addTask = useTaskStore(state => state.addTask);
  const toggleTaskCompletion = useTaskStore(state => state.toggleTaskCompletion); // Not used here, but imported

  const handleAdd = () => {
    if (title.trim()) {
      addTask(title, body);
      setTitle('');
      setBody('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title..."
        value={title}
        onChangeText={setTitle}
        style={styles.inputTitle}
      />
      <TextInput
        placeholder="About..."
        value={body}
        onChangeText={setBody}
        style={styles.inputBody}
      />
      <Button title="+" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputTitle: {
    borderWidth: 1,
    marginBottom: 5,
    padding: 8,
  },
  inputBody: {
    borderWidth: 1,
    marginBottom: 5,
    padding: 8,
  },
});
