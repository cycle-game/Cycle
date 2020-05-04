import { i18nService } from '../src/i18n/I18nService';

export const globalArgTypes = {
    locale: {
        name: 'Locale',
        description: 'Internationalization locale',
        defaultValue: 'fr',
        toolbar: {
            icon: 'globe',
            items: [
                { value: 'en', right: '🇺🇸', title: 'English' },
                { value: 'fr', right: '🇫🇷', title: 'Français' },
                { value: 'kr', right: '🇰🇷', title: '한국어' },
            ],
        },
    },
};

const styledComponentsThemeDecorator = (storyFn, { globalArgs: { locale } }) => {
    i18nService.setLanguage(locale);
    return storyFn();
};

export const decorators = [styledComponentsThemeDecorator];
