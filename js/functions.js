//Функция приводит строчку времени в число минут

const optimizeTime = (elements) => {
  elements = elements.split(":");
  for (let i = 0; i < 2; i++) {
    elements[i] = parseInt(elements[i], 10);
  }
  elements[0] = elements[0] * 60;
  return elements[0] + elements[1];
};

//Функция расчитывает возможность встречи

const isMeetingPossible = (start, end, startMeeting, meetingTime) => {
  start = optimizeTime(start);
  end = optimizeTime(end);
  startMeeting = optimizeTime(startMeeting);
  const endMeeting = startMeeting + meetingTime;
  if (startMeeting >= start && startMeeting < end && endMeeting <= end) {
    return true;
  }
  return false;
};

// console.log(isMeetingPossible("14:00", "17:30", "09:00", 90));
