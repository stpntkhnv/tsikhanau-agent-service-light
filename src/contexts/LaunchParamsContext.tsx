import { createContext, useContext, useState, useEffect, FC, ReactNode } from 'react';
import bridge from '@vkontakte/vk-bridge';

interface LaunchParams {
    vk_access_token_settings: string;
    vk_app_id: number;
    vk_are_notifications_enabled: number;
    vk_is_app_user: number;
    vk_is_favorite: number;
    vk_language: string;
    vk_platform: string;
    vk_ref: string;
    vk_ts: number;
    vk_user_id: number;
    sign: string;
    vk_viewer_group_role: string;
    vk_group_id: number;
}

interface LaunchParamsProviderProps {
    children: ReactNode;
}

const LaunchParamsContext = createContext<LaunchParams | undefined>(undefined);

export const useLaunchParams = () => {
    const context = useContext(LaunchParamsContext);
    if (!context) {
        throw new Error('useLaunchParams must be used within a LaunchParamsProvider');
    }
    return context;
};

export const LaunchParamsProvider: FC<LaunchParamsProviderProps> = ({ children }) => {
    const [launchParams, setLaunchParams] = useState<LaunchParams | undefined>(undefined);

    useEffect(() => {
        bridge.send('VKWebAppGetLaunchParams').then(params => {
            setLaunchParams(params as LaunchParams);
        })
            .catch(x => {});
    }, []);

    return (
        <LaunchParamsContext.Provider value={launchParams}>
            {launchParams ? children : <div>Loading...</div>}
        </LaunchParamsContext.Provider>
    );
};
