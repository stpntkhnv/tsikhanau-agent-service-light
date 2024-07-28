import { createRoot } from 'react-dom/client';
import { AppConfig } from './AppConfig.tsx';
import {LaunchParamsProvider} from "./contexts/LaunchParamsContext.tsx";
import vkBridge from "@vkontakte/vk-bridge";

vkBridge.send('VKWebAppInit');

vkBridge.send('VKWebAppGetAuthToken', {
    app_id: 51985932,
    scope: 'photos,groups,wall',
}).then(data => {
    if (data.access_token) {
        console.log('Access token received', data.access_token);
        localStorage.setItem('vk_access_token', data.access_token);
    }
}).catch(error => {
    console.error('Error getting auth token', error);
});

createRoot(document.getElementById('root')!).render(
    <LaunchParamsProvider>
      <AppConfig />
    </LaunchParamsProvider>);

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts');
}
