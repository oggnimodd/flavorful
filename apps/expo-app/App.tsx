import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  RecipeDetailScreen,
  WelcomeScreen,
  RootStackParamList,
} from "@/screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="RecipeDetailScreen"
              component={RecipeDetailScreen}
            />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
