import {FC, useEffect, useState} from 'react';
import {Panel, PanelHeader, Group, Div, Button, NavIdProps, CardGrid, Card, Header, Text} from '@vkontakte/vkui';
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {fetchPurchases, PurchaseDto} from "../api/purchaseApi.ts";
import styles from './styles/Purchases.module.css';

export const Purchases: FC<NavIdProps> = ({ id }) => {
    const router = useRouteNavigator();
    const [purchases, setPurchases] = useState<PurchaseDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPurchases()
            .then(data => {
                setPurchases(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching purchases:', error);
                setLoading(false);
            });
    }, []);

    function navigateToPurchase(id: string) {
        router.push('/purchases/' + id)
    }

    return (
        <Panel id={id}>
            <PanelHeader>Закупки</PanelHeader>
            <Group>
                <Div>
                    <Button size="l" stretched onClick={() => { router.push('/create_purchase') }}>
                        Создать новую закупку
                    </Button>
                </Div>
                {loading ? (
                    <Div>Загрузка...</Div>
                ) : (
                    <CardGrid size="l">
                        {purchases.map(purchase => (
                            <Card key={purchase.id} mode="shadow" style={{ marginBottom: 16, cursor: 'pointer' }} onClick={() => navigateToPurchase(purchase.id)}>
                                <Div className={styles.purchaseCard}>
                                    <Header>{purchase.name}</Header>
                                    <Text weight="2" style={{ marginBottom: 8 }}>{purchase.description}</Text>
                                    <Text weight="2">Дата начала: {new Date(purchase.startDate).toLocaleDateString()}</Text>
                                    <Text weight="2">Дата окончания: {new Date(purchase.endDate).toLocaleDateString()}</Text>
                                </Div>
                            </Card>
                        ))}
                    </CardGrid>
                )}
            </Group>
        </Panel>
    );
};