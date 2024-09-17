import React from 'react';
import {View, Text} from '@/ui'
import {SuccessCheck} from "@/ui/icons";

const TransactionCompleted = () => {
    return (
        <View>
            <View className={'items-center'}>
                <SuccessCheck/>
            </View>
            <View className={'items-center'}>
                <Text className={'font-ubuntuMedium font-medium text-xl'}>Transaction completed</Text>
            </View>
        </View>
    );
};

export default TransactionCompleted;
