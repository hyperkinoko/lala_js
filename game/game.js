var player;
var enemy;

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
}

function defense() {
    alert("防御する");
}

function escape() {
    endBattle(false);
}

function move() {
    state = 1;
    startBattle();
}

function startBattle() {
    jQuery('#field_controller').hide();
    jQuery('#battle_controller').show();
    jQuery('#enemy_panel').show();

    // 敵を作る
    enemy = new Enemy("スリャイム", "slime", 6, 1, 2, 4, 8, 3);
    jQuery('#message_panel').text(enemy.name + "があらわれた！");
    enemy.dispStatus();
}

function battle() {
    // 素早さの大きい方から攻撃する
    var enemy_damage = Math.max(player.attack - enemy.defense, 0);
    var player_damage = Math.max(enemy.attack - player.defense, 0);
    player.hp = player.hp - player_damage;
    enemy.hp = enemy.hp -enemy_damage;
    alert("攻撃する");
}

function endBattle(defeat) {
    if(defeat) {
        alert("てきにかった");
    } else {
        jQuery('#message_panel').text(player.name + "はにげだした");
    }
    jQuery('#field_controller').show();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
}