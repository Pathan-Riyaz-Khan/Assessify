import { createI18n, type I18n } from "vue-i18n";

import messages from '@/lang';

const initI18n = (): I18n => {
    return createI18n({
        locale: "en",
        legacy: false,
        messages: messages,
    });
};

export default initI18n;
