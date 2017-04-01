var jsonDataOfPlayer = JSON.parse('{"name":"ゆうしゃ", "imgfile":"", "level":1, "hp_max":10, "attack":5, "defense":2, "agility":5, "exp":0, "gold":0}');
var jsonDataOfEnemy = JSON.parse('{"name":"スリャイム", "imgfile":"slime", "level":0, "hp_max":6, "attack":3, "defense":2, "agility":4, "exp":8, "gold":3}');

var player;
var enemy;

$(document).ready(function() {
    jQuery('#field_controller').show();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
    player = new Player(jsonDataOfPlayer);
    player.dispStatus();
});

class Character {
    constructor(data) {
        Object.assign(this, data);
        this.hp = data.hp_max;
    }

    dispStatus() {
        jQuery(this.statusArea + ' .name').text(this.name);
        jQuery(this.statusArea + ' .hp_max').text(this.hp_max);
        jQuery(this.statusArea + ' .hp').text(this.hp);
        jQuery(this.statusArea + ' .attack').text(this.attack);
        jQuery(this.statusArea + ' .defense').text(this.defense);
        jQuery(this.statusArea + ' .agility').text(this.agility);
        jQuery(this.statusArea + ' .exp').text(this.exp);
        jQuery(this.statusArea + ' .gold').text(this.gold);
    }

}

class Enemy extends Character {
    constructor(data) {
        super(data);
        this.statusArea = "#enemy_status";
    }

    dispStatus() {
        super.dispStatus();
        jQuery('#enemy_image img').attr('src', './images/enemy/' + this.imgfile + '.png');
    }
}

class Player extends Character {
    constructor(data) {
        super(data);
        this.statusArea = "#player_status";
    }

    setAction(action) {
        this.action = action;
    }

    dispStatus() {
        super.dispStatus();
        jQuery(this.statusArea + ' .level').text(this.level);
    }

}

function attack() {
    player.setAction("attack");
    turn();
}

function defense() {
    alert("防御する");
}

function escape() {
    endBattle(false);
}

function move() {
    startBattle();
}

function startBattle() {
    jQuery('#field_controller').hide();
    jQuery('#battle_controller').show();
    jQuery('#enemy_panel').show();

    // 敵を作る
    enemy = new Enemy(jsonDataOfEnemy);
    jQuery('#message_panel').text(enemy.name + "があらわれた！");
    enemy.dispStatus();
}

function turn() {
    // 素早さの大きい方から攻撃する
    if(enemy.agility > player.agility) {
        // 敵のほうが素早さが大きい
        var damage = Math.max(enemy.attack - player.defense, 0);
        player.hp = player.hp - damage;
        // 生死判定
        if(player.hp > 0) {
            damage = Math.max(player.attack - enemy.defense, 0);
            enemy.hp = enemy.hp - damage;
            if(enemy.hp > 0) {
                player.dispStatus();
                enemy.dispStatus();
                return;
            } else {
                // 敵に勝った
                endBattle(true);
            }
        } else {
            // 死んでしまった
            gameOver();
        }

    } else {
        // プレイヤーのほうが素早さが大きいか同じ
        var damage = Math.max(player.attack - enemy.defense, 0);
        enemy.hp = enemy.hp - damage;
        if(enemy.hp > 0) {
            damage = Math.max(enemy.attack - player.defense, 0);
            player.hp = player.hp - damage;
            if(player.hp > 0) {
                player.dispStatus();
                enemy.dispStatus();
                return;
            } else {
                // 死んでしまった
                player.dispStatus();
                gameOver();
            }
        } else {
            // 敵に勝った
            endBattle(true);
        }
    }
}

function endBattle(defeat) {
    if(defeat) {
        player.exp += enemy.exp;
        player.gold += enemy.gold;
        player.dispStatus();
        jQuery('#message_panel').text(enemy.name + "をたおした！");
    } else {
        jQuery('#message_panel').text(player.name + "はにげだした");
    }
    jQuery('#field_controller').show();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
}

function gameOver() {
    jQuery('#message_panel').text(player.name + "は死んでしまった");
    jQuery('#field_controller').hide();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
}