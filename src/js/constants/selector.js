const SELECTOR = Object.freeze({
  CAR_NAME_INPUT: '#car-name-input',
  CAR_NAME_BUTTON: '#car-name-button',
  RACE_TIME_INPUT: '#race-time-input',
  RACE_TIME_BUTTON: '#race-time-button',
  RACE_CONTAINER: '#racing-car-container',
  RACE_CAR_STATE: '.racing-car',
  RACE_CAR_NAME_BOX: '.car-name-box',
  RACE_ADVANCE: '.car-advance',
  RESULT_CONTAINER: '#result-container',
  WINNERS: '#winners',
  RETRY_BUTTON: '#retry-button',
});

function replaceSelectorToDomID(origin) {
  const output = new Object();
  Object.entries(origin).forEach(([key, value]) => {
    output[key] = value.replace(/\#|\./g, '');
  });

  return output;
}

const DOM_ID = Object.freeze(replaceSelectorToDomID(SELECTOR));

export { SELECTOR, DOM_ID };
