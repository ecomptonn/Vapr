import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import calendar from "dayjs/plugin/calendar.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(localizedFormat);

// Date Helpers
const formatDate = (date) => {
    dayjs(date).format("MMM D, YYYY");
};

const timeAgo = (date) => {
    dayjs(date).fromNow();
};

const calendarTime = (date) => {
    dayjs(date).calendar();
};

// Status Prio Helper
const sortFriendStatus = (friends) => {
    const statusPrio = {
        Online: 1,
        Away: 2,
        Offline: 3,
    };

    return friends.sort((a, b) => {
        if (statusPrio[a.status] !== statusPrio[b.status]) {
            return statusPrio[a.status] - statusPrio[b.status];
        }

        return a.displayName.localeCompare(b.displayName);
    });
};

export { formatDate, timeAgo, calendarTime, sortFriendStatus };
