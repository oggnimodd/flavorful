import React from "react";
import { FlatList, View, Text } from "react-native";
import { useTaskStore, Task } from "@/stores";
import { Button } from "@/components";
import tw from "twrnc";

const TodoList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const removeTask = useTaskStore((state) => state.removeTask);

  return (
    <View>
      {tasks.length > 0 &&
        tasks.map((item) => {
          return (
            <View key={item.id} style={tw`p-4 bg-white flex flex-row gap-x-2`}>
              <Text>{item.title}</Text>
              <Button onPress={() => removeTask(item.id)}>x</Button>
            </View>
          );
        })}
    </View>
  );
};

export default TodoList;
