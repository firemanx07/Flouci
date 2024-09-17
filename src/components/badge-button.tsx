import React, {useState} from 'react';
import {type FieldValues, useController} from "react-hook-form";
import Animated, {FadeInUp, FadeOut} from 'react-native-reanimated';

import {formatNumber} from "@/core";
import {Button, type InputControllerType} from "@/ui";

const steps=[10,20,50,100]
type Props<T extends FieldValues> = InputControllerType<T>
const BadgeButton =<T extends FieldValues> ({name,control,rules}:Props<T>) => {
    const { field } = useController({ control, name, rules });
    const [selectedIndex, setSelectedIndex] = useState(-1)
const onPress=(item:number,index:number)=>{
    const formattedAmount=formatNumber(item)
    field.onChange(formattedAmount)
    setSelectedIndex(index)
}
    return (
        <Animated.View className={'flex-row gap-16px self-center'} entering={FadeInUp} exiting={FadeOut}>
            {steps.map((item,index)=>{
                const isFocused=index===selectedIndex
               return <Button key={`${item}-${index}`} isChecked={isFocused} label={item.toString()} variant="badge"  size={"sm"} fullWidth={false}
                              onPress={()=>onPress(item,index)} />
            })}
        </Animated.View>
    );
};

export default BadgeButton;
