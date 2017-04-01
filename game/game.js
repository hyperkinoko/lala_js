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
    jQuery('#message_panel').text("敵があらわれた！");
}
