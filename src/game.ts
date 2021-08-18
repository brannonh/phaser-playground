/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

import * as Phaser from 'phaser';

export default class Playground extends Phaser.Scene {
  character: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('playground');
  }

  preload() {
    this.load.spritesheet('citizen', 'assets/character/walk.png', { frameWidth: 35, frameHeight: 52 });
  }

  create() {
    // Create character.
    this.character = this.physics.add.sprite(100, 450, 'citizen');
    this.character.setBounce(0.2);
    this.character.setCollideWorldBounds(true);

    // Create character animations.
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('citizen', { start: 0, end: 30 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'citizen', frame: 0 }],
      frameRate: 20,
    });

    // Create controls.
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
      if (this.cursors.left.isDown)
      {
          this.character.setVelocityX(-160);
          this.character.anims.play('walk', true);
      }
      else if (this.cursors.right.isDown)
      {
          this.character.setVelocityX(160);
          this.character.anims.playReverse('walk', true);
      }
      else
      {
          this.character.setVelocityX(0);
          this.character.anims.play('turn');
      }

      if (this.cursors.up.isDown && this.character.body.touching.down)
      {
          this.character.setVelocityY(-330);
      }
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: 800,
  height: 600,
  scene: Playground,
};

const game = new Phaser.Game(config);
