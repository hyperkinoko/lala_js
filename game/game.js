$(document).ready(function() {
    jQuery('#field_controller').show();
    jQuery('#battle_controller').hide();
    jQuery('#enemy_panel').hide();
});

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
    startBattle();
}

function startBattle() {
    jQuery('#field_controller').hide();
    jQuery('#battle_controller').show();
    jQuery('#enemy_panel').show();
    jQuery('#message_panel').text("敵があらわれた！");
}
