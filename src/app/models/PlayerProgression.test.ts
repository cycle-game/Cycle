import { easy, hard, normal } from './Difficulty';
import { PlayerProgression } from './PlayerProgression';

describe('PlayerProgression', () => {
    describe('constructor', () => {
        it('should init stage to 0', () => {
            const playerProgression = new PlayerProgression(easy);

            expect(playerProgression.currentStage()).toBe(0);
        });

        it('should init score to 0', () => {
            const playerProgression = new PlayerProgression(easy);

            expect(playerProgression.totalScore()).toBe(0);
        });

        it('should init difficulty with the provided one', () => {
            const playerProgression = new PlayerProgression(hard);

            expect(playerProgression.selectedDifficulty()).toBe(hard);
        });
    });

    describe('goToNextStage', () => {
        it('should increment stage', () => {
            const playerProgression = new PlayerProgression(hard);
            expect(playerProgression.currentStage()).toBe(0);
            playerProgression.goToNextStage();
            expect(playerProgression.currentStage()).toBe(1);
            playerProgression.goToNextStage();
            expect(playerProgression.currentStage()).toBe(2);
        });
    });

    describe('isInHardMode', () => {
        it.each([
            [easy, false],
            [normal, false],
            [hard, true],
            [hard, true],
        ])('when mode %s it returns %s ', (mode, expectedResult) => {
            expect(new PlayerProgression(mode).isInHardMode()).toBe(expectedResult);
        });
    });
});
