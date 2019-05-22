export function convertISODateToRequiredFormat(date: string): string{
    if (date) {
        const dateObject = new Date(date);
        return `${dateObject.getUTCMonth() + 1}/${dateObject.getUTCDate()}/${dateObject.getUTCFullYear()}`;
    } else {
        return "";
    }
}
