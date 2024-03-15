import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TaskItem = ({ task, onPress }: TaskItemProps) => (
  <TouchableOpacity style={task.done ? styles.doneTask : styles.task} onPress={onPress}>
    <View style={styles.taskContainer}>
      <FontAwesome name={task.done ? 'check-circle' : 'circle-thin'} size={30} color={task.done ? '#32CD32' : '#D3D3D3'} style={styles.icon} />
      <Text style={task.done ? [styles.done, styles.taskText] : styles.taskText}>{task.content}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  done: {
    color: 'gray',
  },
  doneTask: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#E8E8E8',
  },
  task: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  taskText: {
    fontSize: 16,
    lineHeight: 30,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default TaskItem;
