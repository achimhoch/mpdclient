const e = require('express');
const express = require('express');
const { MPC } = require('mpc-js');


const router = express.Router();
const mpc = new MPC();

var pstate = "";
var logo = "";
var state = "";
var status = "";
var elapsed = "";

const connect = mpc.connectTCP('192.168.0.165', 6600);

if (connect) {
    console.log('verbunden');
    status = "verbunden";
}else{
    console.log("nicht verbunden");
    status = "nicht verbunden";
}



router.get("/", (req, res) => {
    logo = "WebPlayer"

    mpc.storedPlaylists.listPlaylists().then(playlist => console.log(playlist));

    mpc.on('changed-player', () => { 
        mpc.storedPlaylists.listPlaylists().then(playlist => console.log(playlist));
        
        mpc.currentPlaylist.playlistInfo().then(item => state = item[0].title);
        console.log(state);
        mpc.status.status().then(status => { 
            //console.log(status);
          
            if (status.state == 'play') { 
                mpc.status.currentSong().then(song => pstate = song.title);
                console.log("playing: '" + pstate +"'")
                
                
            } else {
                console.log('Stopped playback');
            }
        });
    });

   

    

    res.render("index", { logo: logo, status: status, state: state, pstate: pstate, });
});

module.exports = router; 