type DifficultyTranslationKey = 'easy' | 'normal' | 'hard' | 'nightmare';

export interface Difficulty {
    translationKey: DifficultyTranslationKey;
    level: number;
}

export const easy: Difficulty = {
    translationKey: 'easy',
    level: 1,
};

export const normal: Difficulty = {
    translationKey: 'normal',
    level: 2,
};

export const hard: Difficulty = {
    translationKey: 'hard',
    level: 3,
};

export const nightmare: Difficulty = {
    translationKey: 'nightmare',
    level: 4,
};

export const difficulties = [easy, normal, hard, nightmare];
