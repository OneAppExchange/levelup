import bundledI18n from '../../../i18n/messages.en.json';
import { createI18nStore, createWireI18n } from '@oneappexchange/lwc-wired-i18n';

export const i18nStore = createI18nStore({
    bundledI18n,
    defaultLanguage: 'en',  
    i18nModuleLoaders: {
        // Add additional languages here
        en: () => import('../../../i18n/messages.en.json'),
        es: () => import('../../../i18n/messages.es.json')
    },
    storeName: 'TestName',
    developmentMode: process.env.NODE_ENV !== 'production'
});

export const WireI18n = createWireI18n(i18nStore);