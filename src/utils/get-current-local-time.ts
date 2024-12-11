export default function getBrazilianDateTime(): Date {
    // Create a date object for the current time
    const date = new Date();

    // Get the Brazilian timezone string
    const brazilTimeZone = 'America/Sao_Paulo';

    // Convert the date to Brazilian time
    return new Date(
        date.toLocaleString('en-US', {
            timeZone: brazilTimeZone,
        }),
    );
}

/**
 * Converts a UTC date string to Brazilian local time (GMT-3)
 * @param utcDate - UTC date string in format "YYYY-MM-DD HH:mm:ss.SSS"
 * @returns Date object in Brazilian local time
 */
export function convertUTCToBrazilianTime(utcDate: string): Date {
    // Create Date object from UTC string
    const utcDateTime = new Date(utcDate);

    // Get the timezone offset for Brazil (America/Sao_Paulo)
    const brazilianDate = new Date(
        utcDateTime.toLocaleString('en-US', {
            timeZone: 'America/Sao_Paulo',
        }),
    );

    // Adjust for timezone offset
    const offset = -3; // Brazil is UTC-3
    brazilianDate.setHours(brazilianDate.getHours() + offset);

    return brazilianDate;
}
