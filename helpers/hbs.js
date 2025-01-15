import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import calendar from "dayjs/plugin/calendar.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(localizedFormat);

// Helpers
const formatDate = (date) => {
    dayjs(date).format("MMM D, YYYY");
};

const timeAgo = (date) => {
    dayjs(date).fromNow();
};

const calendarTime = (date) => {
    dayjs(date).calendar();
};

export { formatDate, timeAgo, calendarTime };
