import { FC } from 'react';
import {Card, Div, Group, Panel, PanelHeader} from "@vkontakte/vkui";
import {Icon28ShoppingCartOutline} from "@vkontakte/icons";
import styles from './Menu.module.css'; // Импорт стилей

export const Menu: FC<{ id: string }> = ({ id }) => {
    const navigateToPurchases = () => {
    };

    return (
        <Panel id={id}>
            <PanelHeader>Menu</PanelHeader>
            <Group>
                <Div className="text-center">
                    <h1 className="text-2xl font-bold mb-6">Menu</h1>
                    <div className="grid grid-cols-3 gap-4">
                        <Card mode="outline" className={styles.card} onClick={navigateToPurchases} >
                            <div className="w-24 h-24 rounded flex items-center justify-center bg-gray-200">
                                <Icon28ShoppingCartOutline width={60} height={60} />
                            </div>
                            <span className="mt-2">Закупки</span>
                        </Card>
                        <Card mode="outline" className={styles.card}>
                            <div className="w-24 h-24 rounded flex items-center justify-center bg-gray-200">
                                <Icon28ShoppingCartOutline width={60} height={60} />
                            </div>
                            <span className="mt-2">Финансы</span>
                        </Card>
                        {Array.from({ length: 10 }, (_, i) => (
                            <Card key={i} mode="outline" className={styles.card}>
                                <div className="w-24 h-24 rounded flex items-center justify-center bg-gray-200">
                                    <Icon28ShoppingCartOutline width={60} height={60} />
                                </div>
                                <span className="mt-2">Title</span>
                            </Card>
                        ))}
                    </div>
                </Div>
            </Group>
        </Panel>
    );
};