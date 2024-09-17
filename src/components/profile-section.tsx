import React from 'react';

import Avatar from "@/components/avatar";
import {maskPhoneNumber} from "@/core";
import {useAccount} from "@/core/account";
import {Text, View} from "@/ui";

const ProfileSection = () => {
    const {name,phone}=useAccount.use
    return (
        <View className={'flex-row items-center justify-center gap-1'}>
            <Avatar/>
            <View className={'gap-1'}>
                <Text className={'font-ubuntuMedium text-base font-medium text-black'}>{name()}</Text>
                <Text className={'font-ubuntu text-sm font-normal text-neutral-700'}>{maskPhoneNumber(phone())}</Text>
            </View>
        </View>
    );
};

export default ProfileSection;
