import React from 'react';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {z} from 'zod';
import {Button, View} from '@/ui';
import ReceiptCard from "@/components/receipt-card";
import TransactionCompleted from "@/components/transaction-completed";

const schema = z.object({
    amount: z.string(),
});
export default function Amount() {


    return (
            <View className="flex-1">
                <TransactionCompleted/>
                <View className={'flex-1 justify-between p-4 pt-8'}>

                    <ReceiptCard />
                    <Animated.View entering={SlideInDown.duration(500)} >
                        <Button
                            label="Done"
                            onPress={()=>{}}
                            testID="add-post-button"
                            variant={"secondary"}
                            fullWidth
                            size={"lg"}
                        />
                    </Animated.View>
                </View>
            </View>
    );
}
