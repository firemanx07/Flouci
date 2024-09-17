import React from 'react';
import Animated, { SlideInDown } from 'react-native-reanimated';

import ReceiptCard from '@/components/receipt-card';
import TransactionCompleted from '@/components/transaction-completed';
import { Button, View } from '@/ui';
import {useRouter} from "expo-router";
import {useHardwareBackPress} from "@/core";

export default function Amount() {
    const router=useRouter()
    useHardwareBackPress(() => {
        router.dismissAll()
        return true;
    });
  return (
    <View className="flex-1 justify-between px-4 pb-4 pt-10">
      <TransactionCompleted />

        <ReceiptCard />
        <Animated.View entering={SlideInDown.duration(500)}>
          <Button
            label="Done"
            onPress={() => {
                router.dismissAll()
            }}
            testID="add-post-button"
            variant={'secondary'}
            fullWidth
            size={'lg'}
          />
        </Animated.View>
    </View>
  );
}
