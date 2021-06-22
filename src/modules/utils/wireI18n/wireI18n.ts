import bundledI18n from '../../../messages/en.json';
import { createI18nStore, createWireI18n } from '@oneappexchange/lwc-wired-i18n';

export const i18nStore = createI18nStore({
    bundledI18n,
    defaultLanguage: 'en',  
    i18nModuleLoaders: {
        // Add additional languages here
        en: () => import('../../../messages/en.json'),
        es: () => import('../../../messages/es.json')
    },
    developmentMode: process.env.NODE_ENV !== 'production'
});

export const WireI18n = createWireI18n(i18nStore);