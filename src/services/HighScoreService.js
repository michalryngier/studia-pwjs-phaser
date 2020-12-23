class HighScoreService {
  constructor(highScore) {
    this.highScore = highScore;
    this.localStorage = window.localStorage;
  }

  static run() {
    let highScore = 0;
    if (window.localStorage.getItem('high_score') !== null) {
      highScore = parseInt(window.localStorage.getItem('high_score'));
    }
    return new this(highScore);
  }

  getHighScore() {
    return this.highScore;
  }

  setHighScore(score) {
    this.highScore = score;
    this.localStorage.setItem('high_score', score.toString());
  }

  checkHighScore(score) {
    if (this.getHighScore() < score) {
      this.setHighScore(score);
      return true;
    }
    return false;
  }
}

const highScoreService = HighScoreService.run();
export default highScoreService;
