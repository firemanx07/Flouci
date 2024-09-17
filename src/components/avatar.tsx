import {type ImageSource} from "expo-image";
import React from 'react';

import {Image } from "@/ui";


const Avatar = ({source}:{source?: ImageSource }) => {
    return (
        <>
            <Image
                className="h-72px  w-72px overflow-hidden rounded-full "
                contentFit="contain"
                source={source ? source :require('../../assets/images/avatar/zayd.png')}
            />
        </>
    );
};

export default Avatar;
