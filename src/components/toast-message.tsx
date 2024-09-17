import React from 'react';
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {Pressable,Text,View} from "@/ui";
import {Close, ErrorCross} from "@/ui/icons";

const ToastMessage = ({message}:any) => {
    const {top}=useSafeAreaInsets()

    return (
        <View style={{marginTop:top}} className="px-6 py-4 ">
        <View className="flex-row items-center justify-between rounded-lg bg-white p-3 shadow-lg shadow-black">

            <View className="flex-row items-center gap-3 ">
                <ErrorCross width={32} height={32}/>
                <Text className="text-charcoal-950 font-ubuntuMedium text-sm font-medium">{message?.message ?? '' }</Text>
            </View>

            <Pressable onPress={()=>{}} className="">
                <Close  width={11} height={11} />
            </Pressable>
        </View>
        </View>
    );
};

export default ToastMessage;
