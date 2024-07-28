import {View, SplitLayout, SplitCol, FixedLayout, Button} from '@vkontakte/vkui';
import {useActiveVkuiLocation, useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import {Menu} from "./panels/Menu.tsx";
import {Home, Persik} from "./panels";
import {Purchases} from "./panels/Purchases.tsx";
import {CreatePurchase} from "./panels/CreatePurchase.tsx";
import {Purchase} from "./panels/Purchase.tsx";
import React from "react";
import {PhotoOrganizer} from "./panels/PhotoOrganizer.tsx";
import {Tests} from "./panels/Tests.tsx";

export const App = () => {
  const { panel: activePanel = 'menu' } = useActiveVkuiLocation();
  const router = useRouteNavigator();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <SplitLayout>
      <FixedLayout filled vertical="top">
        <Button size="l" onClick={goToHome} style={{ margin: 16 }}>
          В меню
        </Button>
      </FixedLayout>
      <SplitCol style={{ marginTop: 80 }}>
        <View activePanel={activePanel}>
          <Menu id="menu" />
          <Persik id="persik" />
          <Home id="home" />
          <Purchases id="purchases" />
          <CreatePurchase id="create_purchase" />
          <Purchase id="purchase"/>
          <PhotoOrganizer id="photo_organizer"/>
          <Tests id="tests"/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
