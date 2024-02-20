import dayjs from 'dayjs';
import localeEn from 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);
dayjs.locale(localeEn);

const useTimeAgo = (date: Date) => {
    let timeAgo;

    // Function to update the time ago message
    const updateTimeAgo = () => {
        const now = dayjs();
        const postDate = dayjs(date);
        timeAgo = postDate.fromNow();
    };

    // Call the function to set the initial time ago message
    updateTimeAgo();

    return timeAgo;
};

export default useTimeAgo;
