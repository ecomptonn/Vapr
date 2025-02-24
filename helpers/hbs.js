import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import calendar from "dayjs/plugin/calendar.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(localizedFormat);

// Time/Date Helpers
const formatDate = (date) => {
    return dayjs(date).format("MMM D, YYYY");
};

const formatLastPlayed = (date) => {
    return dayjs(date).fromNow();
};

const calendarTime = (date) => {
    return dayjs(date).calendar();
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

// Recent games Helper
const recentGames = (games) => {
    if (!games || !Array.isArray(games)) {
        return [];
    }

    // Sort games by lastPlayed date, most recent first
    return games
        .sort(
            (a, b) =>
                dayjs(b.lastPlayed).valueOf() - dayjs(a.lastPlayed).valueOf()
        )
        .slice(0, 8);
};

// Comparison Helpers
const eq = (a, b) => {
    return a === b;
};

const gt = (a, b) => {
    return a > b;
};

const lt = (a, b) => {
    return a < b;
};

const gte = (a, b) => {
    return a >= b;
};

const lte = (a, b) => {
    return a <= b;
};

export {
    formatDate,
    formatLastPlayed,
    calendarTime,
    sortFriendStatus,
    recentGames,
    eq,
    gt,
    lt,
    gte,
    lte,
};
