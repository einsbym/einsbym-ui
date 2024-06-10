export const formatDate = (dateString: string): string => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Define month names
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Get month, day, year, and time components
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Convert 24-hour time to 12-hour time
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes with leading zero if necessary
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    // Return the formatted date string
    return `${month} ${day}, ${year} - ${hours}h${minutesFormatted} ${ampm}`;
};
