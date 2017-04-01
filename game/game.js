var player;
var enemy;

$(document).ready(function() {
    jQuery('#field_controller').show();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
    player = new Player("ゆうしゃ", 1, 10, 5, 2, 5, 0, 0);
    player.dispStatus();
});

class Enemy {
    constructor(name, imgfile, hp_max, attack, defense, agility, exp, gold) {
        this.name = name;
        this.imgfile = imgfile;
        this.hp_max = hp_max;
        this.hp = hp_max;
        this.attack = attack;
        this.defense = defense;
        this.agility = agility;
        this.exp = exp;
        this.gold = gold;
    }

    dispStatus() {
        var statusArea = "#enemy_status";
        jQuery('#enemy_image img').attr('src', './images/enemy/' + this.imgfile + '.png');
        jQuery(statusArea + ' .name').text(this.name);
        jQuery(statusArea + ' .hp_max').text(this.hp_max);
        jQuery(statusArea + ' .hp').text(this.hp);
        jQuery(statusArea + ' .attack').text(this.attack);
        jQuery(statusArea + ' .defense').text(this.defense);
        jQuery(statusArea + ' .agility').text(this.agility);
        jQuery(statusArea + ' .exp').text(this.exp);
        jQuery(statusArea + ' .gold').text(this.gold);
    }
}

class Player {
    constructor(name, level, hp_max, attack, defense, agility, exp, gold) {
        this.name = name;
        this.level = level;
        this.hp_max = hp_max;
        this.hp = hp_max;
        this.attack = attack;
        this.defense = defense;
        this.agility = agility;
        this.exp = exp;
        this.gold = gold;
    }

    setAction(action) {
        this.action = action;
    }

    dispStatus() {
        var statusArea = "#player_status";
        jQuery(statusArea + ' .name').text(this.name);
        jQuery(statusArea + ' .level').text(this.level);
        jQuery(statusArea + ' .hp_max').text(this.hp_max);
        jQuery(statusArea + ' .hp').text(this.hp);
        jQuery(statusArea + ' .attack').text(this.attack);
        jQuery(statusArea + ' .defense').text(this.defense);
        jQuery(statusArea + ' .agility').text(this.agility);
        jQuery(statusArea + ' .exp').text(this.exp);
        jQuery(statusArea + ' .gold').text(this.gold);
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
    enemy = new Enemy("スリャイム", "slime", 6, 3, 2, 4, 8, 3);
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