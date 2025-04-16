import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login' ,  headerShown: false}} />
      <Stack.Screen name="signUp" options={{ title: 'SignUp' ,  headerShown: false}} />
      <Stack.Screen name="forgetPassword" options={{ title: 'ForgetPasword' ,  headerShown: false}} />
    </Stack>
  );
}
