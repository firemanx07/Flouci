import { useRouter } from 'expo-router';
import React from 'react';
import {View} from "react-native";

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push('/');
  };
  return (
    <View className="h-full flex-1">
      <LoginForm onSubmit={onSubmit} />
    </View>
  );
}
