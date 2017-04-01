var player;
var enemy;

$(document).ready(function() {
    jQuery('#field_controller').show();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
    player = new Player("ゆうしゃ", "", 1, 10, 5, 2, 5, 0, 0);
    player.dispStatus();
});

class Character {
    constructor(name, imgfile, level, hp_max, attack, defense, agility, exp, gold) {
        this.name = name;
        this.imgfile = imgfile;
        this.level = level;
        this.hp_max = hp_max;
        this.hp = hp_max;
        this.attack = attack;
        this.defense = defense;
        this.agility = agility;
        this.exp = exp;
        this.gold = gold;
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
    constructor(name, imgfile, level, hp_max, attack, defense, agility, exp, gold) {
        super(name, imgfile, level, hp_max, attack, defense, agility, exp, gold);
        this.statusArea = "#enemy_status";
    }

    dispStatus() {
        jQuery('#enemy_image img').attr('src', './images/enemy/' + this.imgfile + '.png');
        super.dispStatus();
    }
}

class Player extends Character {
    constructor(name, imgfile, level, hp_max, attack, defense, agility, exp, gold) {
        super(name, imgfile, level, hp_max, attack, defense, agility, exp, gold);
        this.statusArea = "#player_status";
    }

    setAction(action) {
        this.action = action;
    }

    dispStatus() {
        jQuery(this.statusArea + ' .level').text(this.level);
        super.dispStatus();
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
    enemy = new Enemy("スリャイム", "slime", 0, 6, 3, 2, 4, 8, 3);
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