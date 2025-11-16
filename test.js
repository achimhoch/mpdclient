const { MPC } = require('mpc-js');
const mpc = new MPC();
const connect = mpc.connectTCP('192.168.0.165', 6600);
//const connect = mpc.connectWebSocket('ws://192.168.0.165:8000/');

var pstate = "";

if (connect) {
    console.log('verbunden');
    //status = "verbunden";
}else{
    console.log("nicht verbunden");
    //status = "nicht verbunden";
}



mpc.on('changed-player', () => { 
    mpc.status.status().then(status => { 
        //console.log(status);
        if (status.state == 'play') { 
            mpc.status.currentSong().then(song => pstate = song.title);
            console.log("Playing: '" + pstate + "'");
        } else {
            console.log('Stopped playback');
        }

        if (status.state == 'pause') {
            mpc.playback.play();
        }
    });
});

