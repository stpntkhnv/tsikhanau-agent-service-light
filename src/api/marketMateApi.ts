import {useLaunchParams} from "../contexts/LaunchParamsContext.tsx";

export const fetchWithHeaders = async (url, options = {}) => {
    const launchParams = useLaunchParams()
    // Устанавливаем заголовки по умолчанию
    const defaultHeaders = {
        'x-mm-user-id': launchParams.vk_user_id,
        'x-mm-community-id': launchParams.vk_group_id
    };

    const headers = { ...defaultHeaders, ...options.headers };

    const newOptions = { ...options, headers };

    const response = await fetch(url, newOptions);
    return response;
};