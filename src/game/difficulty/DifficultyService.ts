import { Difficulty, easy } from './Difficulty';

export class DifficultyService {
    private currentDifficulty: Difficulty = easy;

    constructor() {}

    selectedDifficulty(): Difficulty {
        return this.currentDifficulty;
    }

    selectDifficulty(difficulty: Difficulty) {
        this.currentDifficulty = difficulty;
    }
}

export const difficultyService = new DifficultyService();
