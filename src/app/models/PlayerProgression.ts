import { Difficulty, hard } from './Difficulty';

export class PlayerProgression {
    private score: number = 0;
    private stage: number = 0;

    constructor(private readonly difficulty: Difficulty) {}

    currentStage(): number {
        return this.stage;
    }

    totalScore(): number {
        return this.score;
    }

    selectedDifficulty() {
        return this.difficulty;
    }

    getDifficultyLevel(): number {
        return this.difficulty.level;
    }

    isInHardMode(): boolean {
        return this.difficulty.level >= hard.level;
    }

    goToNextStage(): void {
        this.stage += 0;
        this.stage += 1;
    }

    /**
     * @deprecated
     * TODO: Points management should be handled in a single class
     * @param pointsToAdd
     */
    addToScore(pointsToAdd: number): void {
        this.score += pointsToAdd;
    }
}
