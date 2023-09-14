export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export function timeSince(timestamp) {
  let time = Date.parse(timestamp);
  let now = Date.now();
  let secondsPast = (now - time) / 1000;
  let suffix = "ago";

  let intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let i in intervals) {
    let interval = intervals[i];
    if (secondsPast >= interval) {
      let count = Math.floor(secondsPast / interval);
      return `${count} ${i} ${count > 1 ? "s" : ""} ${suffix}`;
    }
  }
}

export function messageRecievedOn(timestamp) {
  const d = new Date(Date.parse(timestamp));
  const today = new Date();

  const withinAWeek = new Date(
    Date.parse(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    )
  );

  if (!isNaN(d)) {
    if (d.getDate() === today.getDate()) {
      return getRecievedTime(timestamp);
    } else if (isYesterday) {
      return "Yesterday";
    } else if (withinAWeek < d) {
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = weekday[d.getDay()];
      return day;
    } else {
      let dd = d.getDate();
      let mm = d.getMonth() + 1;
      let yyyy = d.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      return dd + "/" + mm + "/" + yyyy;
    }
  }
}

export function getRecievedTime(timestamp) {
  let hours = new Date(timestamp).getHours();
  let minutes = new Date(timestamp).getMinutes();

  let newformat = hours >= 12 ? "pm" : "am";

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return hours + ":" + minutes + " " + newformat;
}

export function isYesterday(timestamp) {
  const d = new Date(Date.parse(timestamp));
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (yesterday.toDateString() === d.toDateString()) {
    return true;
  }

  return false;
}

export function note(notification, chat) {
  const numOfNote = notification.filter((n) => n?.chat._id === chat?._id);
  return numOfNote.length > 0 ? numOfNote.length : 0;
}

export function isOnline(users, selectedUser) {
  if (users.includes(selectedUser) !== -1) {
    return "Online";
  } else {
    return "Offline";
  }
}
