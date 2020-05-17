import { StageDefinition } from './stages/StageDefinition';

export const BASE_SIZE = 600;

export const BLUE = '040c4b';
export const YELLOW = 0xfbf3b4;

// -- \\

export const pi180 = Math.PI / 180;

type EditableStageDefinition = StageDefinition & { edited: boolean };
export let edited_lvl: EditableStageDefinition = { edited: false, platforms: [], stars: [], traps: [] };

// -- \\

// platform size
export const platformSizeInPx = 20;
