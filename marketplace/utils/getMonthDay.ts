/**
 * @param date the date as string
 * @returns the month and day of the date in a string
 */
 export default function getMonthDay(date:string):string {
    const inputDate = new Date(date);
    var month = inputDate.toLocaleString('default', { month: 'short' });
    var day = inputDate.getDate();
    return `${month}. ${day}`;
}