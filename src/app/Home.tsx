// src/app/Home.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { getTasks, addTask, toggleTaskDone, randomizeTasks } from '../../Api';
import TaskItem from '../components/TaskItem'; 
import AddTaskButton from '../components/Button';

const sortTasks = (tasks: Task[]) => tasks.sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const sortedTasks = useMemo(() => sortTasks(tasks), [tasks]);

  useEffect(() => {
    getTasks()
    .then(response => {
      setTasks(response.data);
    });
  }, []);

  const addNewTask = useCallback(() => {
    addTask(newTask)
      .then(response => {
        setTasks(prevTasks => [response.data, ...prevTasks]);
        setNewTask('');
      });
  }, [newTask]);

  const toggleTaskDoneStatus = useCallback((taskId: number) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...task, done: !task.done };
      setTasks(updatedTasks);
  
      toggleTaskDone(taskId, !task.done)
      .then(response => {
        if (response.status !== 200) {
          updatedTasks[taskIndex] = task;
          setTasks(updatedTasks);
        }
      })
      .catch(() => {
        updatedTasks[taskIndex] = task;
        setTasks(updatedTasks);
      });
    }
  }, [tasks]);

  const randomizeTaskList = useCallback((count: number) => {
    randomizeTasks(count)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          getTasks()
            .then(response => {
              setTasks(response.data);
            })
            .catch(error => {});
        }
      })
      .catch(error => {});
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-do</Text>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Enter your new task..."
          />
          <AddTaskButton onPress={addNewTask} enabled={!!newTask} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Randomize Tasks" onPress={() => randomizeTaskList(50)} />
        </View>
        <FlatList
          data={sortedTasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
          <TaskItem task={item} onPress={() => toggleTaskDoneStatus(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
});