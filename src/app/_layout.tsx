// Import  global CSS file
import '../../global.css';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ThemeProvider} from '@react-navigation/native';
import {SplashScreen, Stack} from 'expo-router';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';

import {APIProvider} from '@/api';
import {loadSelectedTheme} from '@/core';
import {useThemeConfig} from '@/core/use-theme-config';
import {hydrateAccount} from "@/core/account";
import CustomFlashMessage from "@/components/toast-message";

export {ErrorBoundary} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'onboarding',
};

hydrateAccount();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const hideSplash = useCallback(async () => {
        await SplashScreen.hideAsync();
    }, []);
    useEffect(() => {
            setTimeout(() => {
                hideSplash();
            }, 1000);

    }, [hideSplash]);
    return (
        <Providers>
            <Stack initialRouteName={'onboarding'} screenOptions={{animation: 'slide_from_right',}}>
                <Stack.Screen name="onboarding" options={{headerShown: false}}/>
                <Stack.Screen name="send-money" options={{
                    title: 'Send money',

                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Ubuntu-Medium', fontSize: 16, fontWeight: '500'

                    },
                    headerBackImageSource:require('../../assets/images/header/left-caret.png')
                }}/>
                <Stack.Screen name="transaction-receipt/[amount]" options={{
                    title: '',
                    headerBackImageSource:require('../../assets/images/header/left-caret.png')
                }}/>
            </Stack>
        </Providers>
    );
}

function Providers({children}: {
    children: React.ReactNode
}) {
    const theme = useThemeConfig();
    return (
        <GestureHandlerRootView
            style={styles.container}
            className={theme.dark ? `dark` : undefined}
        >
            <KeyboardProvider>
                <ThemeProvider value={theme}>
                    <APIProvider>
                        <BottomSheetModalProvider>
                            {children}
                            <FlashMessage position="top" MessageComponent={CustomFlashMessage}/>
                        </BottomSheetModalProvider>
                    </APIProvider>
                </ThemeProvider>
            </KeyboardProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
