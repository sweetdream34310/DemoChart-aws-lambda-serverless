/**
 * @param date the date as string
 * @returns the day and time of the date as string
 */
export default function getMonthDay(date:string):string {
    const inputDate = new Date(date);
    var month = inputDate.toLocaleString('default', { month: 'short' });
    var day = inputDate.getDate();
    var hours = inputDate.getUTCHours();
    var minutes = inputDate.getUTCMinutes()
    return `${month} ${day}, ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}