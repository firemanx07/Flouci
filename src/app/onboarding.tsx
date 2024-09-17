import { useRouter } from 'expo-router';
import React, {useEffect} from 'react';

import { Cover } from '@/components/cover';
import { Button, FocusAwareStatusBar, SafeAreaView, Text, View } from '@/ui';
import {useAccount} from "@/core/account";
export default function Onboarding() {
    const resetBalance=useAccount().reset
    useEffect(() => {
        __DEV__ && resetBalance()
    }, []);
  const router = useRouter();
  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
        <View className="justify-end ">
            <Text className="my-3 text-center font-ubuntuBold text-5xl font-bold">
                Flouci
            </Text>
            <Text className="mb-2 px-3 text-center font-ubuntu text-lg text-gray-600">
                The secure way to transfer your money, anytime, anywhere
            </Text>

            <Text className="my-1 pt-6 text-left font-ubuntu text-lg">
                🚀 Fast and reliable transactions
            </Text>
            <Text className="my-1 text-left font-ubuntu text-lg">
                🛡️ Built for safety and peace of mind
            </Text>
            <Text className="my-1 text-left font-ubuntu text-lg">
                🧩 Simple and easy-to-use interface
            </Text>
            <Text className="my-1 text-left font-ubuntu text-lg">
                🌍 Send money globally with minimal fees
            </Text>
        </View>

      <SafeAreaView className="mt-6">
        <Button
            variant={"secondary"}
          label="Let's Get Started "
          onPress={() => {
            router.push('/send-money');
          }}
        />
      </SafeAreaView>
    </View>
  );
}
