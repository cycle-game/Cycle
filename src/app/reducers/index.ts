import { combineReducers } from 'redux';
import { languageReducer } from './language.reducer';

export * from './language.action';
export { LanguageState } from './language.reducer';

export const reducers = combineReducers({
    language: languageReducer,
});
