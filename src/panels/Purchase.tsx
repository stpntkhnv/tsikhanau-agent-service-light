import React, {FC, useEffect, useState} from "react";
import {Button, Div, Group, Header, NavIdProps, Panel, PanelHeader, Text} from "@vkontakte/vkui";
import {useParams, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {fetchPurchaseById, PurchaseDto} from "../api/purchaseApi.ts";

export const Purchase: FC<NavIdProps> = ({ id }) => {
    const router = useRouteNavigator();
    const { purchaseId } = useParams<{ purchaseId: string }>();
    const [purchase, setPurchase] = useState<PurchaseDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (purchaseId) {
            fetchPurchaseById(purchaseId)
                .then(data => {
                    setPurchase(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [purchaseId]);

    const goToAlbums = () => {
        router.push(`/purchases/${purchaseId}/photo-organizer`);
    };

    return (
        <Panel id={id}>
            <PanelHeader>Информация о закупке</PanelHeader>
            <Group>
                {loading ? (
                    <Div>Загрузка...</Div>
                ) : error ? (
                    <Div>Ошибка: {error}</Div>
                ) : purchase ? (
                    <>
                        <Div>
                            <Header>{purchase.name}</Header>
                            <Text weight="3">{purchase.description}</Text>
                            <Text weight="2">Дата начала: {new Date(purchase.startDate).toLocaleDateString()}</Text>
                            <Text weight="2">Дата окончания: {new Date(purchase.endDate).toLocaleDateString()}</Text>
                        </Div>
                        <Div>
                            <Text>Дополнительная информация:</Text>
                            <Text>Community ID: {purchase.communityId}</Text>
                            <Text>Album ID: {purchase.albumId}</Text>
                            <Text>Agent ID: {purchase.agentId}</Text>
                        </Div>
                        <Div>
                            <Button size="l" stretched onClick={goToAlbums}>
                                Разбить фотографии по альбомам
                            </Button>
                        </Div>
                    </>
                ) : (
                    <Div>Закупка не найдена</Div>
                )}
            </Group>
        </Panel>
    );
};