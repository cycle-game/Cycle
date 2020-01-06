import { difficultyService, DifficultyService } from './DifficultyService';
import { easy, hard, normal } from '../../app/models';

describe(DifficultyService.prototype.constructor.name, () => {
    it('has default value set to easy', () => {
        expect(difficultyService.selectedDifficulty()).toEqual(easy);
    });

    it('store current difficulty', () => {
        difficultyService.selectDifficulty(normal);
        difficultyService.selectDifficulty(hard);
        expect(difficultyService.selectedDifficulty()).toEqual(hard);
    });
});
