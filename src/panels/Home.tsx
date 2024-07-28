import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  NavIdProps, Card,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import styles from "./Menu.module.css";
import {Icon28ShoppingCartOutline} from "@vkontakte/icons";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const router = useRouteNavigator();

  function navigateToPurchases() {
    router.push('purchases')
  }

  function navigateToTests() {
    router.push('tests')
  }

  return (
      <Panel id={id}>
        <PanelHeader>Главное меню</PanelHeader>
        <Group>
          <Div className="text-center">
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
              <Card mode="outline" className={styles.card} onClick={navigateToTests}>
                <div className="w-24 h-24 rounded flex items-center justify-center bg-gray-200">
                  <Icon28ShoppingCartOutline width={60} height={60} />
                </div>
                <span className="mt-2">Тесты</span>
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
