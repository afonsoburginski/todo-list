import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const AddTaskButton = (props: AddTaskButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress} disabled={!props.enabled}>
    <AntDesign name="plus" size={20} color="#FFFFFF" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddTaskButton;