var enemy;

$(document).ready(function() {
    jQuery('#field_controller').show();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
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
        jQuery('#enemy_image img').attr('src', './images/enemy/' + this.imgfile + '.png');
        jQuery('#enemy_status .name').text(this.name);
        jQuery('#enemy_status .hp_max').text(this.hp_max);
        jQuery('#enemy_status .hp').text(this.hp);
        jQuery('#enemy_status .attack').text(this.attack);
        jQuery('#enemy_status .defense').text(this.defense);
        jQuery('#enemy_status .agility').text(this.agility);
        jQuery('#enemy_status .exp').text(this.exp);
        jQuery('#enemy_status .gold').text(this.gold);
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
    enemy = new Enemy("スリャイム", "slime", 6, 1, 2, 4, 8, 3);
    jQuery('#message_panel').text(enemy.name + "があらわれた！");
    enemy.dispStatus();
}
