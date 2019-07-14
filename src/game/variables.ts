import { StageDefinition } from './stages/StageDefinition';

export const BASE_SIZE = 600;

export const BLUE = '040c4b';
export const YELLOW = 0xfbf3b4;

// -- \\

export const pi180 = Math.PI / 180;

type EditableStageDefinition = StageDefinition & { edited: boolean };
export let edited_lvl: EditableStageDefinition = { edited: false, platforms: [], stars: [], traps: [] };

// -- \\

// Current level
export const PlayerProgression = { stage: 0, score: 0, difficulty: 1 };
// 4 difficulty levels :
// _ 0 = easy
// _ 1 = normal
// _ 2 = difficult
// _ 3 = insane

// platform size
export const platformSizeInPx = 20;

// -- \\

export const pseudo = '';
