import {zodResolver} from "@hookform/resolvers/zod";
import React from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";

import type { OptionType } from '@/ui';
import {ControlledInput, Input, NumberPlaceholder, Select, View} from '@/ui';
import { Checkbox, Radio, Switch } from '@/ui';

import { Title } from './title';
import {KeyboardAvoidingView} from "react-native-keyboard-controller";
import {Currency} from "@/ui/icons";

const options: OptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const schema = z.object({
  amount: z.string().optional(),

});
export type FormType = z.infer<typeof schema>;
export const Inputs = () => {
  const [value, setValue] = React.useState<string | number | undefined>();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <>
      <Title text="Form" />
         <View
        >
        <ControlledInput  control={control} label="Amount"  name={"amount"} forceRTL={true}  placeHolderComponent={<NumberPlaceholder/>}
        rightAccessory={(size)=><Currency width={size} height={size}/>}
                          keyboardType={'number-pad'}
        />
        <Input label="Error" error="This is a message error" />
        <Input label="Focused" />
        <Select
          label="Select"
          options={options}
          value={value}
          onSelect={(option) => setValue(option)}
        />
        <CheckboxExample />
        <RadioExample />
        <SwitchExample />
         </View>
    </>
  );
};

const CheckboxExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox.Root
      checked={checked}
      onChange={setChecked}
      accessibilityLabel="accept terms of condition"
      className="pb-2"
    >
      <Checkbox.Icon checked={checked} />
      <Checkbox.Label text="checkbox" />
    </Checkbox.Root>
  );
};

const RadioExample = () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Radio.Root
      checked={selected}
      onChange={setSelected}
      accessibilityLabel="radio button"
      className="pb-2"
    >
      <Radio.Icon checked={selected} />
      <Radio.Label text="radio button" />
    </Radio.Root>
  );
};

const SwitchExample = () => {
  const [active, setActive] = React.useState(false);
  return (
    <Switch.Root
      checked={active}
      onChange={setActive}
      accessibilityLabel="switch"
      className="pb-2"
    >
      <Switch.Icon checked={active} />
      <Switch.Label text="switch" />
    </Switch.Root>
  );
};
