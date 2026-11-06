import { UserProgressState, AssessmentAttempt } from '../types';

const STORAGE_KEY = 'UNPHISH_V1_STATE';
const CURRENT_VERSION = 1;

export const defaultState: UserProgressState = {
  version: CURRENT_VERSION,
  completedModuleIds: [],
  completedLessonIds: [],
  completedPracticeIds: [],
  assessmentAttempts: [],
  theme: 'dark',
  urlInspectionsCount: 0,
  updatedAt: new Date().toISOString(),
};

/**
 * Validates whether parsed object conforms to UserProgressState schema
 */
function isValidState(data: any): data is UserProgressState {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.version === 'number' &&
    Array.isArray(data.completedModuleIds) &&
    Array.isArray(data.completedLessonIds) &&
    Array.isArray(data.completedPracticeIds) &&
    Array.isArray(data.assessmentAttempts) &&
    (data.theme === 'dark' || data.theme === 'light' || data.theme === 'system')
  );
}

/**
 * Safely retrieves user progress from localStorage
 */
export function getStoredProgress(): UserProgressState {
  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;

    const parsed = JSON.parse(raw);
    if (isValidState(parsed)) {
      return parsed;
    }
    // If schema version mismatched or corrupted, safely merge with defaults
    const validTheme =
      parsed?.theme === 'light' || parsed?.theme === 'dark' || parsed?.theme === 'system'
        ? parsed.theme
        : 'dark';

    return {
      ...defaultState,
      completedModuleIds: Array.isArray(parsed?.completedModuleIds) ? parsed.completedModuleIds : [],
      completedLessonIds: Array.isArray(parsed?.completedLessonIds) ? parsed.completedLessonIds : [],
      completedPracticeIds: Array.isArray(parsed?.completedPracticeIds) ? parsed.completedPracticeIds : [],
      assessmentAttempts: Array.isArray(parsed?.assessmentAttempts) ? parsed.assessmentAttempts : [],
      theme: validTheme,
      urlInspectionsCount: typeof parsed?.urlInspectionsCount === 'number' ? parsed.urlInspectionsCount : 0,
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn('UnPhish: Unable to read local progress storage; using in-memory defaults.', err);
    return defaultState;
  }
}

/**
 * Persists user progress state to localStorage
 */
export function saveProgress(state: UserProgressState): void {
  if (typeof window === 'undefined') return;

  try {
    const payload: UserProgressState = {
      ...state,
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('UnPhish: Unable to write to localStorage. Storage quota may be full or disabled.', err);
  }
}

/**
 * Marks a module as completed (or toggles)
 */
export function toggleModuleCompleted(moduleId: string): UserProgressState {
  const current = getStoredProgress();
  const exists = current.completedModuleIds.includes(moduleId);
  const updatedIds = exists
    ? current.completedModuleIds.filter((id) => id !== moduleId)
    : [...current.completedModuleIds, moduleId];

  const updated: UserProgressState = {
    ...current,
    completedModuleIds: updatedIds,
  };
  saveProgress(updated);
  return updated;
}

/**
 * Marks a practice scenario as completed
 */
export function markPracticeCompleted(scenarioId: string): UserProgressState {
  const current = getStoredProgress();
  if (current.completedPracticeIds.includes(scenarioId)) return current;

  const updated: UserProgressState = {
    ...current,
    completedPracticeIds: [...current.completedPracticeIds, scenarioId],
  };
  saveProgress(updated);
  return updated;
}

/**
 * Saves a new final assessment attempt
 */
export function recordAssessmentAttempt(attempt: AssessmentAttempt): UserProgressState {
  const current = getStoredProgress();
  const updated: UserProgressState = {
    ...current,
    assessmentAttempts: [attempt, ...current.assessmentAttempts],
  };
  saveProgress(updated);
  return updated;
}

/**
 * Increments URL inspections counter
 */
export function incrementUrlInspectionCount(): void {
  const current = getStoredProgress();
  const updated: UserProgressState = {
    ...current,
    urlInspectionsCount: (current.urlInspectionsCount || 0) + 1,
  };
  saveProgress(updated);
}

/**
 * Sets theme preference ('dark' | 'light' | 'system')
 */
export function setStoredTheme(theme: 'dark' | 'light' | 'system'): void {
  const current = getStoredProgress();
  saveProgress({ ...current, theme });
}

/**
 * Sets whether the user has completed or skipped the onboarding tour
 */
export function setOnboardingSeen(hasSeen: boolean): void {
  const current = getStoredProgress();
  saveProgress({ ...current, hasSeenOnboarding: hasSeen });
}

/**
 * Tracks the most recently visited curriculum module
 */
export function setLastVisitedModule(moduleId: string): void {
  const current = getStoredProgress();
  saveProgress({ ...current, lastVisitedModuleId: moduleId });
}

/**
 * Generates formatted JSON string of user progress for backup
 */
export function exportProgressJson(): string {
  const current = getStoredProgress();
  return JSON.stringify(current, null, 2);
}

/**
 * Safely imports and validates a JSON string into localStorage
 */
export function importProgressJson(jsonString: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, message: 'Invalid JSON file format.' };
    }
    if (!Array.isArray(parsed.completedModuleIds) || !Array.isArray(parsed.completedPracticeIds)) {
      return { success: false, message: 'JSON does not conform to UnPhish progress schema.' };
    }
    const validatedState: UserProgressState = {
      version: typeof parsed.version === 'number' ? parsed.version : CURRENT_VERSION,
      completedModuleIds: parsed.completedModuleIds.filter((id: any) => typeof id === 'string'),
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
      completedPracticeIds: parsed.completedPracticeIds.filter((id: any) => typeof id === 'string'),
      assessmentAttempts: Array.isArray(parsed.assessmentAttempts) ? parsed.assessmentAttempts : [],
      theme: parsed.theme === 'light' || parsed.theme === 'dark' || parsed.theme === 'system' ? parsed.theme : 'dark',
      urlInspectionsCount: typeof parsed.urlInspectionsCount === 'number' ? parsed.urlInspectionsCount : 0,
      hasSeenOnboarding: Boolean(parsed.hasSeenOnboarding),
      lastVisitedModuleId: typeof parsed.lastVisitedModuleId === 'string' ? parsed.lastVisitedModuleId : undefined,
      updatedAt: new Date().toISOString(),
    };
    saveProgress(validatedState);
    return { success: true, message: 'Progress data successfully restored.' };
  } catch (e: any) {
    return { success: false, message: `Failed to parse file: ${e?.message || 'Unknown error'}` };
  }
}

/**
 * Returns raw storage details for privacy audit
 */
export function getStorageAuditInfo(): { key: string; bytesUsed: number; lastUpdated: string } {
  if (typeof window === 'undefined') return { key: STORAGE_KEY, bytesUsed: 0, lastUpdated: 'N/A' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '';
    const state = getStoredProgress();
    return {
      key: STORAGE_KEY,
      bytesUsed: new Blob([raw]).size,
      lastUpdated: state.updatedAt || new Date().toISOString(),
    };
  } catch {
    return { key: STORAGE_KEY, bytesUsed: 0, lastUpdated: 'N/A' };
  }
}

/**
 * Resets all stored progress to pristine state
 */
export function resetStoredProgress(): UserProgressState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('UnPhish: Could not reset localStorage', e);
    }
  }
  return defaultState;
}
