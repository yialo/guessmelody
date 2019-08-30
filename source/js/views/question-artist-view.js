import TypeView from './question-type-view';
import ArtistView from './artist-view';
import AudioView from './audio-view';

export default class QuestonArtistView extends TypeView {
  constructor(question, onAnswer) {
    super(question, onAnswer, ArtistView);
    this._targetTrack = this._question.targetTrack;
    this._correctAnswer = this._question.correctAnswer;
    this._audio = new AudioView(this._targetTrack, true);
  }

  get caption() {
    this._caption = 'Кто исполняет эту песню?';
    return this._caption;
  }

  get template() {
    this._template = (
      `<div class="game__track">
        <button class="track__button track__button--play" type="button"></button>
        ${this._audio.template}
      </div>
      <form class="game__artist">
        ${this.formMarkup}
      </form>`
    );
    return this._template;
  }

  _checkAnswer(selectedAnswer) {
    return (selectedAnswer === this._correctAnswer);
  }

  _createClickHandler() {
    return (evt) => {
      const answer = evt.currentTarget.value;
      const answerStatus = this._checkAnswer(answer);
      this._onAnswer(answerStatus);
    };
  }
}
