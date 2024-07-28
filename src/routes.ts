import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  PERSIK: 'persik',
  MENU: 'menu',
  PURCHASES: 'purchases',
  CREATE_PURCHASE: 'create_purchase',
  PURCHASE: 'purchase',
  PHOTO_ORGANIZER: 'photo_organizer',
  TESTS: 'tests',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.PERSIK, `/${DEFAULT_VIEW_PANELS.PERSIK}`, []),
      createPanel(DEFAULT_VIEW_PANELS.MENU, `/${DEFAULT_VIEW_PANELS.MENU}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PURCHASES, `/${DEFAULT_VIEW_PANELS.PURCHASES}`, []),
      createPanel(DEFAULT_VIEW_PANELS.CREATE_PURCHASE, `/${DEFAULT_VIEW_PANELS.CREATE_PURCHASE}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PURCHASE, `/purchases/:purchaseId`, []),
      createPanel(DEFAULT_VIEW_PANELS.PHOTO_ORGANIZER, `/purchases/:purchaseId/photo-organizer`, []),
      createPanel(DEFAULT_VIEW_PANELS.TESTS, `tests`, [])
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
