import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen 
          name="login/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen 
          name="register/index"
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen 
          name="index"
          options={{
            headerShown: false,
          }}  
        />

        <Stack.Screen 
          name="step/index"
          options={{
            headerShown: false,
          }}  
        />

        <Stack.Screen 
          name="create/index"
          options={{
            headerShown: false,
          }}  
        />

        <Stack.Screen 
          name="nutrition/index"
          options={{
            headerShown: false,
          }}  
        />

      </Stack>
    </QueryClientProvider>
  );
}
