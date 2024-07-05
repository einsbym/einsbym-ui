export const formatDate = (dateString: string): string => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    // Format parts to combine them into the desired output
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);

    const month = parts.find((part) => part.type === 'month')?.value || 'Unknown Month';
    const day = parts.find((part) => part.type === 'day')?.value || '00';
    const year = parts.find((part) => part.type === 'year')?.value || '0000';
    const hour = parts.find((part) => part.type === 'hour')?.value || '00';
    const minute = parts.find((part) => part.type === 'minute')?.value || '00';

    const formattedDate = `${month} ${day}, ${year} - ${hour}h${minute}`;

    return formattedDate;
};
