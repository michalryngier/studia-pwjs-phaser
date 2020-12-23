export default class TextHelper {

  static createText(
    game,
    font,
    text,
    size,
    centered = true,
    xVertex = 0,
    yVertex = 0
  ) {
    if (centered) {
      return game.add.bitmapText(
        this.screenCenter(game).x + xVertex,
        this.screenCenter(game).y + yVertex,
        font,
        text,
        size
      );
    }
    return game.add.bitmapText(
      xVertex,
      yVertex,
      font,
      text,
      size
    );
  }

  static createTwoLinedTexts(game, prop1, prop2) {
    let text1 = game.add.bitmapText(
      this.screenCenter(game).x / 2,
      this.screenCenter(game).y + prop1.yVertex,
      prop1.font,
      prop1.text,
      prop1.size
    );
    let text2 = game.add.bitmapText(
      this.screenCenter(game).x * 1.5,
      this.screenCenter(game).y + prop2.yVertex,
      prop2.font,
      prop2.text,
      prop2.size
    );

    return [text1, text2];
  }

  static screenCenter(game) {
    const screenCenterX = game.cameras.main.worldView.x + game.cameras.main.width / 2;
    const screenCenterY = game.cameras.main.worldView.y + game.cameras.main.height / 2;
    return {
      x: screenCenterX,
      y: screenCenterY
    };
  }
}