let timer;

const startFocusTimer = function (
  timerHTMLElement,
  timerDurationInSecs,
  uniqueIDName
) {
  window.runningTimerClass = uniqueIDName;

  const tick = function () {
    if (uniqueIDName !== window.runningTimerClass) {
      clearInterval(timer);
      return;
    }

    timerHTMLElement.textContent = humanReadableTime(time);

    if (time < 0) {
      clearInterval(timer);
      timerHTMLElement.textContent = "Time's up!";
      setTimeout(
        () =>
          (timerHTMLElement.textContent =
            humanReadableTime(timerDurationInSecs)),
        2000
      );
    }
    // Decrease 1 second
    time--;
  };
  // set time to 5 minutes
  let time = timerDurationInSecs;
  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

if (timer) clearInterval(timer);

const humanReadableTime = function (seconds) {
  const min = String(Math.trunc(seconds / 60)).padStart(2, 0);
  const sec = String(seconds % 60).padStart(2, 0);
  return `${min}:${sec}`;
};

const initialiseTimer = function (className, timeDurationInSecs) {
  const timerElement = document.querySelector(`.` + className);
  timerElement.addEventListener("click", function () {
    startFocusTimer(
      timerElement,
      timeDurationInSecs,
      (uniqueIDName = className + Math.random())
    );
  });
  timerElement.textContent = humanReadableTime(timeDurationInSecs);
};

initialiseTimer("short-break", 5 * 60);
initialiseTimer("long-break", 30 * 60);
initialiseTimer("focus-clock", 25 * 60);
