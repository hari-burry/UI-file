import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import io from 'socket.io-client';

const socket = io('http://192.168.1.6:3000');

export default function StackLayout() {
  useEffect(() => {
    // Connect to the socket server
    socket.on('connect', () => {
      console.log('Connected to the socket server');
    });

    // Listen for global events
    socket.on('notification', (data) => {
      console.log('Global Notification:', data);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="explore"
        options={{ header: (props) => <CustomHeader {...props} /> }}
      />
      <Stack.Screen
        name="Orders"
        options={{ header: (props) => <CustomHeader {...props} /> }}
      />
    </Stack>
  );
}
