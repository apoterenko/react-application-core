/**
 * @stable [02.03.2019]
 * @param {number} hour
 * @param {string} pm
 * @param {string} am
 * @returns {string}
 */
export const asUSATime = (hour: number,
                          pm = ' PM',
                          am = ' AM'): string =>
  hour > 12 ? `${hour - 12}${pm}` : (hour === 12 ? `12${pm}` : `${hour}${am}`);

/**
 * @stable [19.08.2018]
 * @param {string} time
 * @returns {string}
 */
export const normalizeTime = (time: string): string => `${time.length > 1 ? time : ['0', time].join('')}`;

/**
 * @stable [19.08.2018]
 * @param {number} time
 * @returns {string}
 */
export const fromTimeAtMinutesToTimeAtString = (time: number): string => {
  const minutesAtString = String(Math.floor(time / 60));
  const secondsAtString = String(time % 60);
  return `${normalizeTime(minutesAtString)}:${normalizeTime(secondsAtString)}`;
};

/**
 * @stable [19.08.2018]
 * @param {string} time1
 * @param {string} time2
 * @returns {number}
 */
export const getDiffAtSecondsBetween = (time1: string, time2: string): number => {
  const d1 = new Date(`01/01/2018 ${time1}`);
  const d2 = new Date(`01/01/2018 ${time2}`);
  return (d2.getTime() - d1.getTime()) / 1000;
};

/**
 * @stable [19.08.2018]
 * @param {string} time1
 * @param {string} time2
 * @returns {number}
 */
export const getDiffAtMinutesBetween = (time1: string, time2: string): number =>
  getDiffAtSecondsBetween(time1, time2) / 60;

/**
 * @stable [19.08.2018]
 * @param {string} time1
 * @returns {number}
 */
export const getDiffAtMinutes = (time1: string): number => getDiffAtMinutesBetween('00:00', time1);
