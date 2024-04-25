class Movement extends Phaser.Scene {
    constructor() {
        super("Movement");
        this.my = { sprite: {} };  // Create an object to hold sprite bindings

        // Create constants for the monster location
        this.bodyX = 400;
        this.bodyY = 500;
        this.monsterSpeed = 2;  // Movement speed
        this.showingSmile = true;  // Initially show a smiling face
        this.leftLeg;
        this.rightLeg;
        this.face;
    }

    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        this.load.setPath("./assets/");
        this.load.atlasXML("characterParts", "spritesheet_default.png", "spritesheet_default.xml");

        // Update instruction text
        document.getElementById('description').innerHTML = '<h2>Movement.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>';
    }

    create() {
        let my = this.my;
    
        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX - 100, this.bodyY, "characterParts", "blue_body_circle.png");
        my.sprite.face = this.add.sprite(my.sprite.body.x - 0, my.sprite.body.y + 0, "characterParts", "face_e.png");
    
        // Create legs and set their position relative to the body
        // Create left leg and set its position relative to the body
        my.sprite.rightLeg = this.add.sprite(my.sprite.body.x - 60, my.sprite.body.y - 10, "characterParts", "blue_hand_rock.png");
    
        // Reflect the left leg sprite over the y-axis by setting a horizontal scaling factor of -1
        my.sprite.rightLeg.setScale(-1, 1);
    
        my.sprite.leftLeg = this.add.sprite(my.sprite.body.x + 60, my.sprite.body.y - 10, "characterParts", "blue_hand_rock.png");
    
        // Create space bar key object
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update() {
        let my = this.my;
    
        // Move the monster left when 'A' is pressed
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey('A'), 1)) {
            // Check if moving left will keep the character within the screen bounds
            if (my.sprite.body.x - this.monsterSpeed >= 0) {
                for (let part in my.sprite) {
                    my.sprite[part].x -= this.monsterSpeed;
                }
            }
        }
    
        // Move the monster right when 'D' is pressed
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey('D'), 1)) {
            // Check if moving right will keep the character within the screen bounds
            if (my.sprite.body.x + my.sprite.body.width + this.monsterSpeed <= this.sys.game.config.width) {
                for (let part in my.sprite) {
                    my.sprite[part].x += this.monsterSpeed;
                }
            }
        }
    
        // Emit a sprite when space bar is pressed
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            let emittedSprite = this.add.sprite(my.sprite.body.x, my.sprite.body.y, "characterParts", "tile_background_tree_large.png");
            emittedSprite.setOrigin(0.5, 1); // Set origin to bottom center of the player avatar
            emittedSprite.setDepth(-1); // Ensure emitted sprite is behind the player avatar
            this.time.delayedCall(1000, () => { // Remove emitted sprite after 1 second
                emittedSprite.destroy();
            });
        }
    }
    
    
}