import { i18nService } from './I18nService';

describe(i18nService.constructor.name, () => {
    it('should get service singleton', () => {
        expect(i18nService).toBeDefined();
    });

    describe('when locale is set', () => {
        beforeEach(async () => {
            await i18nService.init();
            await i18nService.setLanguage('fr');
        });

        it('should return translation based on key and set locale', () => {
            const translation = i18nService.translate('testKey');
            expect(translation).toEqual('testValueFR');
        });

        it('should return a specific string when translation is not known', () => {
            const translation = i18nService.translate('testKeyUnknown');
            expect(translation).toEqual('testKeyUnknown');
        });

        it('should return translation when key is a path', () => {
            const translation = i18nService.translate('testKeyNested.deepTranslation');
            expect(translation).toEqual('deepTranslationFR');
        });
    });
});
