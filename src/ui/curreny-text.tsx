import React from 'react';
import { View } from 'react-native';
import { Text } from './text';
import { Currency } from '@/ui/icons';
import colors from './colors';
import { formatNumber } from '@/core';
import { tv } from 'tailwind-variants';

interface FormattedAmountProps {
    amount: number;
    variant?: 'L' | 'S';
}


const textVariant = tv({
    base: 'font-ubuntuMedium font-medium text-charcoal-950',
    variants: {
        size: {
            L: 'text-3xl',
            S: 'text-base',
        },
    },
    defaultVariants: {
        size: 'L', // Default to Large if not provided
    },
});

const CurrencyText: React.FC<FormattedAmountProps> = ({ amount, variant = 'L' }) => {
    return (
        <View className="flex-row gap-1 items-center">
            <Text className={textVariant({ size: variant })}>{'-'}</Text>
            <Currency width={variant === 'L' ? 20 : 10} height={variant === 'L' ? 20 : 10} fill={colors.charcoal['950']} />
            <Text className={textVariant({ size: variant })}>
                {formatNumber(amount)}
            </Text>
        </View>
    );
};

export default CurrencyText;
