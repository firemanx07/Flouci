import * as React from 'react';
import type {Control, FieldValues, Path, RegisterOptions,} from 'react-hook-form';
import {useController} from 'react-hook-form';
import type {NativeSyntheticEvent, TextInputFocusEventData, TextInputProps} from 'react-native';
import {I18nManager, StyleSheet, TextInput as NTextInput, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {tv} from 'tailwind-variants';

import {formatNumber, reverseNumberFormat} from "@/core";
import {type TextInputAccessoryProps} from "@/types";

import colors from './colors';
import {Text} from './text';

const inputTv = tv({
    slots: {
        container: 'mb-2',
        input_container: 'flex-row items-center',
        accessory_container: 'absolute right-0 mr-4 h-12 w-12 items-center justify-center',
        label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
        input:
            'mt-0 flex-1 rounded-lg border-2 border-neutral-100 bg-white p-4 font-ubuntuMedium text-3xl  dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
    },

    variants: {
        focused: {
            true: {
                input: 'border-secondary-400 dark:border-secondary-300',
            },
        },
        error: {
            true: {
                input: 'border-danger-600',
                label: 'text-danger-600 dark:text-danger-600',
            },
        },
        disabled: {
            true: {
                input: 'bg-neutral-200',
            },
        },
        forceRTL: {
            true: {
                accessory_container: 'left-0 ml-4 ',
            },
        },
    },
    defaultVariants: {
        focused: false,
        error: false,
        disabled: false,
        forceRTL: false
    },
});

export interface NInputProps extends TextInputProps, TextInputAccessoryProps {
    label?: string;
    disabled?: boolean;
    error?: string;
    forceRTL?: boolean
    placeHolderComponent?: React.ReactNode;
}

type TRule<T extends FieldValues> =
    | Omit<
    RegisterOptions<T>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>
    | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues>
    extends NInputProps,
        InputControllerType<T> {
}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
    const {label, error, rightAccessory, forceRTL, testID, placeHolderComponent, onBlur, onFocus, ...inputProps} = props;
    const [isFocussed, setIsFocussed] = React.useState(false);
    const handleOnBlur = React.useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocussed(false)
        onBlur && onBlur(e)
    }, [onBlur]);
    const handleOnFocus = React.useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocussed(true)
        onFocus && onFocus(e)
    }, [onFocus]);
    const styles = React.useMemo(
        () =>
            inputTv({
                error: Boolean(error),
                focused: isFocussed,
                disabled: Boolean(props.disabled),
                forceRTL: Boolean(props.forceRTL)
            }),
        [error, isFocussed, props.disabled, props.forceRTL]
    );
    return (
        <View className={styles.container()}>
            {label && (
                <Text
                    testID={testID ? `${testID}-label` : undefined}
                    className={styles.label()}
                >
                    {label}
                </Text>
            )}
            <View className={styles.input_container()}>
                <NTextInput
                    testID={testID}
                    ref={ref}
                    placeholderTextColor={colors.neutral[200]}
                    className={styles.input()}
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}

                    {...inputProps}
                    style={StyleSheet.flatten([
                        {writingDirection: forceRTL || I18nManager.isRTL ? 'rtl' : 'ltr'},
                        {textAlign: forceRTL || I18nManager.isRTL ? 'right' : 'left'},
                        inputProps.style,
                    ])}
                />
                {!inputProps.value && !isFocussed && placeHolderComponent && (
                    <View
                        className={`absolute ${props.forceRTL ? 'right-3' : 'left-4'} inset-y-0 z-10 items-center justify-center`}
                        pointerEvents={'none'}>
                        {placeHolderComponent}
                    </View>
                )}
                <View className={styles.accessory_container()}>{rightAccessory &&
                    rightAccessory(24, colors.neutral[200])}
                </View>
            </View>
            {error && (
                <Text
                    testID={testID ? `${testID}-error` : undefined}
                    className="text-sm text-danger-400 dark:text-danger-600"
                >
                    {error}
                </Text>
            )}
        </View>
    );
});

export const NumberPlaceholder = () => (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut} className="flex-row items-baseline justify-center">
        <Text className="font-ubuntuBold text-4xl text-neutral-200">0</Text>
        <Text className=" font-ubuntu text-3xl text-neutral-200">.000</Text>
    </Animated.View>
);

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
    props: ControlledInputProps<T>
) {
    const {name, control, rules, ...inputProps} = props;

    const {field, fieldState} = useController({control, name, rules});
    return (
        <Input
            ref={field.ref}
            autoCapitalize="none"
            onChangeText={field.onChange}
            value={(field.value as string) || ''}
            {...inputProps}
            error={fieldState.error?.message}
        />
    );
}

export function ControlledNumberInput<T extends FieldValues>(props: ControlledInputProps<T> & {
    maxValue?: number;
    onMaxValueReached?: (value: number) => void;
}) {
    const {name, control, rules, maxValue, onMaxValueReached, ...inputProps} = props;

    const {field, fieldState} = useController({control, name, rules});

    const handleFocus = () => {
        const rawValue = field.value?.replace(/,/g, '') || ''; // Remove commas
        field.onChange(rawValue);
    };

    const handleBlur = () => {
        const parsedAmount=reverseNumberFormat(field.value)
        if (parsedAmount === 0) {
            field.onChange('')
            return
        }
        const formattedValue = formatNumber(parsedAmount);
        field.onChange(formattedValue);
    };

    const handleChangeText = (text: string) => {
        if (!maxValue) {
            field.onChange(text)
            return;
        }
        let numericValue = reverseNumberFormat(text);

        if (numericValue > maxValue) {
            if (onMaxValueReached && reverseNumberFormat(field.value) !== maxValue) onMaxValueReached(maxValue);
            const formattedValue = formatNumber(maxValue);
            field.onChange(formattedValue);
            return;
        }

        field.onChange(text)
    };
    return (
        <Input
            ref={field.ref}
            autoCapitalize="none"
            onChangeText={handleChangeText}
            value={field.value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...inputProps}
            error={fieldState.error?.message}
        />
    );
}
