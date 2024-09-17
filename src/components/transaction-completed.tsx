import LottieView from "lottie-react-native";
import React, {useRef} from 'react';

import {Text, View} from '@/ui'

const TransactionCompleted = () => {
    const animation = useRef<LottieView>(null);
    return (
        <View>
            <View className={'items-center'}>
                <LottieView
                    autoPlay
                    loop={false}
                    ref={animation}
                    style={{
                        width: 158,
                        height: 158,
                        backgroundColor: 'transparent',
                    }}
                    source={require('../../assets/lotties/check-animation.json')}
                />
            </View>
            <View className={'items-center'}>
                <Text className={'text-center font-ubuntu text-2xl font-medium text-charcoal-950'}>Transaction completed</Text>
            </View>
        </View>
    );
};

export default TransactionCompleted;
