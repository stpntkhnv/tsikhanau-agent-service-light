import React, { FC, useState, useEffect } from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    FormItem,
    Input,
    Textarea,
    Select,
    Button,
    Div,
    Spinner,
    Snackbar,
    NavIdProps, DateInput,
} from '@vkontakte/vkui';
import { Icon16Done, Icon16ErrorCircle } from '@vkontakte/icons';
import { useLaunchParams } from '../contexts/LaunchParamsContext';
import { createPurchase } from '../api/purchaseApi';
import bridge from "@vkontakte/vk-bridge";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

export const CreatePurchase: FC<NavIdProps> = ({ id }) => {
    const launchParams = useLaunchParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [album, setAlbum] = useState('');
    const [albums, setAlbums] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState<React.ReactNode | null>(null);

    const router = useRouteNavigator()

    useEffect(() => {
        async function fetchAlbumsData() {
            try {
                const accessToken = localStorage.getItem('vk_access_token');
                if (!accessToken || !launchParams.vk_group_id) {
                    throw new Error('No access token or group ID found');
                }
                const response = await bridge.send('VKWebAppCallAPIMethod', {
                    method: 'photos.getAlbums',
                    request_id: 'albums',
                    params: {
                        v: '5.131',
                        owner_id: -launchParams.vk_group_id, // Для группы ID должен быть отрицательным
                        access_token: accessToken,
                    },
                });
                setAlbums(response.response.items)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching albums:', error);
                setLoading(false);
            }
        }

        fetchAlbumsData();
    }, [launchParams]);

    function navigateToPurchase(purchaseId: string) {
        router.push('/purchases/' + purchaseId);
    }

    const handleSubmit = async () => {
        const data = {
            name,
            description,
            albumId: album,
            startDate,
            endDate,
            agentId: launchParams.vk_user_id,
            communityId: launchParams.vk_group_id
        };

        console.log('create request data', data)

        try {
            const response = await createPurchase(data);
            navigateToPurchase(response.purchaseId);
            setSnackbar(
                <Snackbar onClose={() => setSnackbar(null)} before={<Icon16Done fill="var(--vkui--color_icon_positive)" />}>
                    Закупка успешно создана
                </Snackbar>
            );


        } catch (error) {
            setSnackbar(
                <Snackbar onClose={() => setSnackbar(null)} before={<Icon16ErrorCircle fill="var(--vkui--color_icon_negative)" />}>
                    Ошибка при создании закупки
                </Snackbar>
            );
        }
    };

    return (
        <Panel id={id}>
            <PanelHeader>Создание закупки</PanelHeader>
            <Group>
                <FormItem top="Имя закупки">
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </FormItem>
                <FormItem top="Описание закупки">
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </FormItem>
                <FormItem top="Выбор фотоальбома">
                    {loading ? (
                        <Spinner size="large" />
                    ) : (
                        <Select
    value={album}
    placeholder="Не выбран"
    onChange={(e) => setAlbum(e.target.value)}
    options={albums.map(x => ({label: x.title, value: x.id}))} />
                    )}
                </FormItem>
                <FormItem top="Дата начала">
                    <DateInput
                        value={startDate}
                        onChange={setStartDate}
                        enableTime={false}
                    />
                </FormItem>
                <FormItem top="Дата окончания">
                    <DateInput
                        value={endDate}
                        onChange={setEndDate}
                        enableTime={false}
                    />
                </FormItem>
                <Div>
                    <Button size="l" stretched onClick={handleSubmit}>
                        Создать закупку
                    </Button>
                </Div>
            </Group>
            {snackbar}
        </Panel>
    );
};