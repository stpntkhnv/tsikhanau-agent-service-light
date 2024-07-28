import {Button, FormItem, Group, Input, NavIdProps, Panel, PanelHeader} from "@vkontakte/vkui";
import React, {FC, useState} from "react";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {useLaunchParams} from "../contexts/LaunchParamsContext.tsx";
import {copyPhotos} from "../api/purchaseApi.ts";
import {LaunchParams} from "@vkontakte/vk-bridge/dist/types/src/parseURLSearchParamsForGetLaunchParams";

export const Tests: FC<NavIdProps> = ({id}) => {
    const router = useRouteNavigator();
    const launchParams : LaunchParams = useLaunchParams()

    const [donorGroupId, setDonorGroupId] = useState<number | string>('');
    const [donorAlbumId, setDonorAlbumId] = useState<number | string>('');
    const [testGroupId, setTestGroupId] = useState<number | string>('');
    const [testAlbumId, setTestAlbumId] = useState<number | string>('');
    const [numberOfPhotos, setNumberOfPhotos] = useState<number | string>('');

    const handleCopyPhotos = async () => {
        try {
            await copyPhotos(
                Number(donorAlbumId),
                Number(donorGroupId),
                Number(testAlbumId),
                Number(testGroupId),
                Number(numberOfPhotos),
                launchParams
            );
            alert('Photos copied successfully');
        } catch (error) {
            console.error('Error copying photos:', error);
            alert('Failed to copy photos');
        }
    };

    return (
        <Panel id={id}>
            <PanelHeader>Тесты</PanelHeader>
            <Group>
                <FormItem top="Donor Group ID">
                    <Input
                        type="number"
                        value={donorGroupId}
                        onChange={(e) => setDonorGroupId(e.currentTarget.value)}
                        placeholder="Введите ID группы донора"
                    />
                </FormItem>
                <FormItem top="Donor Album ID">
                    <Input
                        type="number"
                        value={donorAlbumId}
                        onChange={(e) => setDonorAlbumId(e.currentTarget.value)}
                        placeholder="Введите ID альбома донора"
                    />
                </FormItem>
                <FormItem top="Test Group ID">
                    <Input
                        type="number"
                        value={testGroupId}
                        onChange={(e) => setTestGroupId(e.currentTarget.value)}
                        placeholder="Введите ID тестовой группы"
                    />
                </FormItem>
                <FormItem top="Test Album ID">
                    <Input
                        type="number"
                        value={testAlbumId}
                        onChange={(e) => setTestAlbumId(e.currentTarget.value)}
                        placeholder="Введите ID тестового альбома"
                    />
                </FormItem>
                <FormItem top="Number of Photos">
                    <Input
                        type="number"
                        value={numberOfPhotos}
                        onChange={(e) => setNumberOfPhotos(e.currentTarget.value)}
                        placeholder="Введите количество фотографий"
                    />
                </FormItem>
                <Button size="l" stretched onClick={handleCopyPhotos}>
                    Копировать фотографии
                </Button>
            </Group>
        </Panel>
    );
};