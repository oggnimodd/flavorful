import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { useTaskStore } from "@/stores";
import tw from "twrnc";
import { Button } from "@/components";
import { Keyboard } from "react-native";

const TodoInput = () => {
  const inputRef = React.useRef<TextInput>(null);
  const [title, setTitle] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = () => {
    Keyboard.dismiss();

    if (title !== "") {
      addTask({ id: Date.now().toString(), title, done: false });
      setTitle("");
    }
  };

  return (
    <View style={tw`p-4 bg-white`}>
      <TextInput
        ref={inputRef}
        style={tw`border-2 border-gray-300 rounded-md p-2`}
        value={title}
        onChangeText={setTitle}
        placeholder="Add a new task"
      />
      <Button
        title="Add"
        onPress={handleAddTask}
        tailwind="bg-blue-500 text-white rounded-md p-2 mt-2"
      />
    </View>
  );
};

export default TodoInput;
