require('Modules/LoginRegister/index.js');
require('Modules/PlayerNotify/index.js');
require('Modules/GlobalNotify/index.js');
require('Modules/Fraktionsauswahl/index.js');
require('Modules/Hud/index.js');
require('Modules/ProgressBar/index.js');
require('Modules/Garage/index.js');
require('Modules/FFAauswahl/index.js');
require('Modules/AufsatzShop/index.js');
require('weaponcomponents');
//require('nativeui');
//require('ClothesMenu');

// Discord Status
mp.discord.update('Spielt auf Gangwar', 'discord.gg/uTYbxh3zmf')

// Weapon Damage
mp.events.add("render", () => {
    mp.game.player.setWeaponDamageModifier(0.3);
    mp.game.ped.setAiWeaponDamageModifier(0.3);
    mp.players.local.setSuffersCriticalHits(false);
});

//Disable Nametags
mp.events.add("render", () => {
    mp.nametags.enabled = false;
});

// Disable WeaponHeavyHit ETC.
mp.events.add('render', () => {
    mp.game.controls.disableControlAction(2, 19, true);
    mp.game.controls.disableControlAction(32, 68, true);
    mp.game.controls.disableControlAction(32, 70, true);
    mp.game.controls.disableControlAction(0, 140, true);
    mp.game.controls.disableControlAction(0, 141, true);
    mp.game.controls.disableControlAction(0, 142, true);
});

var isDisableAllControls = false;

mp.events.add('toggleDisableAllControls', state => {
    isDisableAllControls = state;
    if (isDisableAllControls) {
        mp.game.controls.disableControlAction(0, 140, true);
        mp.game.controls.disableControlAction(0, 141, true);
        mp.game.controls.disableControlAction(0, 257, true);
        mp.game.controls.disableControlAction(0, 142, true);
        mp.game.controls.disableControlAction(0, 25, true);
        mp.game.controls.disableControlAction(0, 24, true);
        mp.game.controls.disableControlAction(0, 69, true);
        mp.game.controls.disableControlAction(0, 92, true);
        mp.game.controls.disableControlAction(0, 114, true);
        mp.game.controls.disableControlAction(0, 288, true);
        mp.game.controls.disableControlAction(0, 289, true);
        mp.game.controls.disableControlAction(0, 170, true);
        mp.game.controls.disableControlAction(0, 166, true);
        mp.game.controls.disableControlAction(0, 167, true);
        mp.game.controls.disableControlAction(0, 168, true);
        mp.game.controls.disableControlAction(0, 169, true);
    } else {
        mp.game.controls.disableControlAction(0, 140, false);
        mp.game.controls.disableControlAction(0, 141, false);
        mp.game.controls.disableControlAction(0, 257, false);
        mp.game.controls.disableControlAction(0, 142, false);
        mp.game.controls.disableControlAction(0, 25, false);
        mp.game.controls.disableControlAction(0, 24, false);
        mp.game.controls.disableControlAction(0, 69, false);
        mp.game.controls.disableControlAction(0, 92, false);
        mp.game.controls.disableControlAction(0, 114, false);
        mp.game.controls.disableControlAction(0, 288, false);
        mp.game.controls.disableControlAction(0, 289, false);
        mp.game.controls.disableControlAction(0, 170, false);
        mp.game.controls.disableControlAction(0, 166, false);
        mp.game.controls.disableControlAction(0, 167, false);
        mp.game.controls.disableControlAction(0, 168, false);
        mp.game.controls.disableControlAction(0, 169, false);
    }
});

//Punkt Armor
mp.keys.bind(0xBE, true, function () {
    mp.events.callRemote("Server:HotkeyPunkt:Armor");
});

//Komma Armor
mp.keys.bind(0xBC, true, function () {
    mp.events.callRemote("Server:HotkeyKomma:Health");
});

//Key E
mp.keys.bind(0x45, false, function () {
    mp.events.callRemote("Server:Key:E");
});

//Key F4
mp.keys.bind(0x73, false, function () {
    mp.events.callRemote("Server:Key:F4");
});

//Key F5
mp.keys.bind(0x74, false, function () {
    mp.events.callRemote("Server:Key:F5");
});

//Key F6
mp.keys.bind(0x75, false, function () {
    mp.events.callRemote("Server:Key:F6");
});

//Key F7
mp.keys.bind(0x76, false, function () {
    mp.events.callRemote("Server:Key:F7");
});

mp.events.add('setPlayerVehicleMultiplier', value => {
    if (!mp.players.local.vehicle) return;
    mp.players.local.vehicle.setEnginePowerMultiplier(value);
    mp.players.local.vehicle.setInvincible(false);
});

//NoClip

var isNoClip = false;
var noClipCamera;
var shiftModifier = false;
var controlModifier = false;
var localPlayer = mp.players.local;

var getNormalizedVector = function (vector) {
    var mag = Math.sqrt(
        vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );
    vector.x = vector.x / mag;
    vector.y = vector.y / mag;
    vector.z = vector.z / mag;
    return vector;
};
var getCrossProduct = function (v1, v2) {
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = v1.y * v2.z - v1.z * v2.y;
    vector.y = v1.z * v2.x - v1.x * v2.z;
    vector.z = v1.x * v2.y - v1.y * v2.x;
    return vector;
};
var bindVirtualKeys = {
    F2: 0x71
};
var bindASCIIKeys = {
    Q: 69,
    E: 81,
    LCtrl: 17,
    Shift: 16
};

mp.events.add('toggleNoClip', state => {
    isNoClip = state;
    mp.game.ui.displayRadar(!isNoClip);
    if (isNoClip) {
        startNoClip();
    } else {
        stopNoClip();
    }
});

function startNoClip() {
    //mp.game.graphics.notify('NoClip ~g~activated');
    var camPos = new mp.Vector3(
        localPlayer.position.x,
        localPlayer.position.y,
        localPlayer.position.z
    );
    var camRot = mp.game.cam.getGameplayCamRot(2);
    noClipCamera = mp.cameras.new('default', camPos, camRot, 45);
    noClipCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    localPlayer.freezePosition(true);
    //localPlayer.setInvincible(true);
    localPlayer.setVisible(false, false);
    localPlayer.setCollision(false, false);
}
function stopNoClip() {
    //mp.game.graphics.notify('NoClip ~r~disabled');
    if (noClipCamera) {
        localPlayer.position = noClipCamera.getCoord();
        localPlayer.setHeading(noClipCamera.getRot(2).z);
        noClipCamera.destroy(true);
        noClipCamera = null;
    }
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    localPlayer.freezePosition(false);
    //localPlayer.setInvincible(false);
    localPlayer.setVisible(true, false);
    localPlayer.setCollision(true, false);
}
mp.events.add('render', function () {
    if (!noClipCamera || mp.gui.cursor.visible) {
        return;
    }
    controlModifier = mp.keys.isDown(bindASCIIKeys.LCtrl);
    shiftModifier = mp.keys.isDown(bindASCIIKeys.Shift);
    var rot = noClipCamera.getRot(2);
    var fastMult = 1;
    var slowMult = 1;
    if (shiftModifier) {
        fastMult = 3;
    } else if (controlModifier) {
        slowMult = 0.5;
    }
    var rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    var rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    var leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
    var leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
    var pos = noClipCamera.getCoord();
    var rr = noClipCamera.getDirection();
    var vector = new mp.Vector3(0, 0, 0);
    vector.x = rr.x * leftAxisY * fastMult * slowMult;
    vector.y = rr.y * leftAxisY * fastMult * slowMult;
    vector.z = rr.z * leftAxisY * fastMult * slowMult;
    var upVector = new mp.Vector3(0, 0, 1);
    var rightVector = getCrossProduct(
        getNormalizedVector(rr),
        getNormalizedVector(upVector)
    );
    rightVector.x *= leftAxisX * 0.5;
    rightVector.y *= leftAxisX * 0.5;
    rightVector.z *= leftAxisX * 0.5;
    var upMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.Q)) {
        upMovement = 0.5;
    }
    var downMovement = 0.0;
    if (mp.keys.isDown(bindASCIIKeys.E)) {
        downMovement = 0.5;
    }
    mp.players.local.position = new mp.Vector3(
        pos.x + vector.x + 1,
        pos.y + vector.y + 1,
        pos.z + vector.z + 1
    );
    mp.players.local.heading = rr.z;
    noClipCamera.setCoord(
        pos.x - vector.x + rightVector.x,
        pos.y - vector.y + rightVector.y,
        pos.z - vector.z + rightVector.z + upMovement - downMovement
    );
    noClipCamera.setRot(
        rot.x + rightAxisY * -5.0,
        0.0,
        rot.z + rightAxisX * -5.0,
        2
    );
});
