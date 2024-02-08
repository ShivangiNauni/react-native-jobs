import { Stack } from "expo-router";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
export default function RootLayout() {

  const queryClient = new QueryClient();
  return (
<QueryClientProvider client={queryClient} >
    <Stack>
      <Stack.Screen name="index" options={{ title: "Exercises" }} />
    </Stack>
    </QueryClientProvider>
  );
}
