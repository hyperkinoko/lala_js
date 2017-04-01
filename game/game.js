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
        var statusArea = "#enemy_status"
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
    constructor(name, level, hp_max, attack, defense, agility, exp) {
        this.name = name;
        this.level = level;
        this.hp_max = hp_max;
        this.hp = hp_max;
        this.attack = attack;
        this.defense = defense;
        this.agility = agility;
        this.exp = exp;
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
    }

}

function attack() {
    alert("攻撃する");
}

function defense() {
    alert("防御する");
}

function escape() {
    alert("にげる");
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
    var enemy = new Enemy("スリャイム", "slime", 6, 1, 2, 4, 8, 3);
    jQuery('#message_panel').text(enemy.name + "があらわれた！");
    enemy.dispStatus();
}
