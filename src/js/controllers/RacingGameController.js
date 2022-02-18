import RacingGameModel from '../models/RacingGameModel.js';
import RacingGameView from '../views/RacingGameView.js';

import { SELECTOR } from '../constants/selector.js';
import GAME_SETTING from '../constants/RacingGame/setting.js';
import { $ } from '../utils/element-tools.js';
import { nameStringToArray } from '../utils/data-manager.js';
import { isCarNameValid, isRaceTimeValid, isGameSetup } from '../utils/RacingGame/validator.js';

export default class RacingGameController {
  #racingGameModel;
  #racingGameView;

  constructor() {
    this.#racingGameModel = new RacingGameModel();
    this.#racingGameView = new RacingGameView();

    this.bindDefaultEvent();
    this.init();
  }

  init() {
    this.#racingGameModel.init();
  }

  bindDefaultEvent() {
    $(SELECTOR.CAR_NAME_BUTTON).addEventListener('click', this.handleCarNameInput.bind(this));
    $(SELECTOR.RACE_TIME_BUTTON).addEventListener('click', this.handleRaceTimeInput.bind(this));
    $(SELECTOR.RETRY_BUTTON).addEventListener('click', this.handleGameRetry.bind(this));
  }

  handleCarNameInput(event) {
    event.preventDefault();

    const carNameValue = $(SELECTOR.CAR_NAME_INPUT).value;
    if (!isCarNameValid(carNameValue)) {
      return false;
    }

    this.#racingGameView.setDisableForm(event.target);
    this.#racingGameModel.carList = nameStringToArray(carNameValue);

    this.tryRacingGameStart();
    return false;
  }

  handleRaceTimeInput(event) {
    event.preventDefault();

    const raceTimeValue = $(SELECTOR.RACE_TIME_INPUT).value;
    if (!isRaceTimeValid(raceTimeValue)) {
      return false;
    }

    this.#racingGameView.setDisableForm(event.target);
    this.#racingGameModel.round = raceTimeValue;

    this.tryRacingGameStart();
    return false;
  }

  handleGameRetry(event) {
    event.preventDefault();

    this.#racingGameModel.init();
    this.#racingGameView.init();
    return false;
  }

  tryRacingGameStart() {
    const { round, carList } = this.#racingGameModel;
    if (isGameSetup(round, carList.length) === false) {
      return false;
    }

    this.playRacingGame();
  }

  playRacingGame() {
    const { carList } = this.#racingGameModel;

    this.#racingGameView.renderCarContainer(carList);
    this.#racingGameView.setVisibleProgress(true);

    setTimeout(() => this.handleRaceTimer(), GAME_SETTING.ROUND_INTERVAL);
  }

  handleRaceTimer(stageNumber = 0) {
    stageNumber += 1;

    const carPlayResult = this.#racingGameModel.play();
    this.#racingGameView.renderCarAdvance(carPlayResult);

    const { round: gameRound } = this.#racingGameModel;
    if (gameRound === stageNumber) {
      this.#racingGameView.setVisibleProgress(false);
      this.#racingGameView.renderWinners(this.#racingGameModel.winners);
      return;
    }

    setTimeout(() => this.handleRaceTimer(stageNumber), GAME_SETTING.ROUND_INTERVAL);
  }
}
