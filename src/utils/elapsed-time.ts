import dayjs from 'dayjs';
import localeEn from 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';
import { convertUTCToBrazilianTime } from './get-current-local-time';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);
dayjs.locale(localeEn);

const getElapsedTime = (date: Date) => {
    let timeAgo;

    // Function to update the time ago message
    const updateTimeAgo = () => {
        const utcDate = new Date(date);
        const localDate = convertUTCToBrazilianTime(utcDate.toUTCString());
        const postDate = dayjs(localDate);

        timeAgo = postDate.fromNow();
    };

    // Call the function to set the initial time ago message
    updateTimeAgo();

    return timeAgo;
};

export default getElapsedTime;
