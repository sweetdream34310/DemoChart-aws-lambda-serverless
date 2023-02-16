/**
 * 
 * @param {string} dueDate the date as string, the order is due
 * @returns {string} the difference between the two in the format DD d, HH hrs
 */
export default function getTimeLeft(dueDate:string):string {
    const dueDateMs = new Date(dueDate).getTime(),
          currentDateMs = new Date().getTime(),
          diffInMilliseconds = Math.abs(dueDateMs - currentDateMs),
          diffInDays = Math.floor(diffInMilliseconds / 1000 / 60 / 60 / 24),
          diffInHours = Math.floor(diffInMilliseconds / 1000 / 60 / 60) % 24;

    return `${diffInDays} d ${diffInHours} hrs`
}