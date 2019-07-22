import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { LanguageSelector } from '../../components';
import { selectLanguage } from '../../reducers';
import { i18nService, SupportedLocale } from '../../../i18n/I18nService';

const mapStateToProps = (state: any) => {
    return {
        languages: state.language.availableLanguages,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setActiveLanguage: async (selectedLanguage: SupportedLocale) => {
            await i18nService.setLanguage(selectedLanguage);
            dispatch(selectLanguage(selectedLanguage));
        },
    };
};

export const SelectLanguage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LanguageSelector);
