import { StageDefinition } from './stages/StageDefinition';

export const BASE_SIZE = 600;

type EditableStageDefinition = StageDefinition & { edited: boolean };
export let edited_lvl: EditableStageDefinition = { edited: false, platforms: [], stars: [], traps: [] };

// platform size
export const platformSizeInPx = 20;
