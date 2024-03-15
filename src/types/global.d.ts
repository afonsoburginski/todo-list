interface Task {
  id: number;
  content: string;
  done: boolean;
}

interface AddTaskButtonProps {
  onPress: () => void;
  enabled: boolean;
}

interface TaskItemProps {
  task: {
    done: boolean;
    content: string;
  };
  onPress: () => void;
}
