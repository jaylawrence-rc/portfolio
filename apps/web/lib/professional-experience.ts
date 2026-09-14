// Count completed anniversaries from June 1, 2022, using UTC consistently.
const START_YEAR = 2022;
const START_MONTH = 5;

export function getProfessionalExperienceYears(now = new Date()) {
  const anniversaryPending = now.getUTCMonth() < START_MONTH;
  return Math.max(0, now.getUTCFullYear() - START_YEAR - Number(anniversaryPending));
}
