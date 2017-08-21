/**
 * Created by Ismail on 2017-07-19.
 */

var player = videojs('my-player');
var options = {};
var player = videojs('my-player', options, function onPlayerReady() {
    videojs.log('Your player is ready!');

    // In this context, `this` is the player that was created by Video.js.
    //this.play();

    //loadstart event listener
    this.on('loadstart', function() {
        videojs.log('Loadstart');
        var table = document.getElementById('table');
        //create a row element
        var tr = document.createElement('tr');
        //create empty column elements
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        //adds text/data to these elements
        var event = document.createTextNode('Loadstart');
        var currentTime = document.createTextNode(player.currentTime());
        var duration = document.createTextNode(player.remainingTime());
        td1.appendChild(event);
        td2.appendChild(currentTime);
        td3.appendChild(duration);
        //adds the column elements to the row
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        //add the row to the table
        table.appendChild(tr);
    });

    var c = 0;
    var t;
    var timer_is_on = 0;

    function timedCount() {
        //document.getElementById("txt").value = c;
        c = c + 1;
        t = setTimeout(function(){ timedCount() }, 1000);
    }

    function startCount() {
        if (!timer_is_on) {
            timer_is_on = 1;
            timedCount();
        }
    }

    function stopCount() {
        clearTimeout(t);
        c = 0;
        timer_is_on = 0;
    }
    var pausedDuration = 0;
    //play event listener
    this.on('play', function() {
        videojs.log('Play event triggered!');
        //console.log(c);
        pausedDuration = c;
        stopCount();
        pause();
        var table = document.getElementById('table');
        //create a row element
        var tr = document.createElement('tr');

        //creates col elements
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        //adds text/data to these col elements
        var event = document.createTextNode('Play');
        var currentTime = document.createTextNode(player.currentTime());
        var duration = document.createTextNode(player.remainingTime().toFixed(2));

        td1.appendChild(event);
        td2.appendChild(currentTime);
        td3.appendChild(duration);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        //add the row to the table
        table.appendChild(tr);
    });

    //loadedmetadata event listener
    this.on('loadedmetadata', function() {
        videojs.log('loadedmetadata event triggered!');
        var table = document.getElementById('table');
        //create a row element
        var tr = document.createElement('tr');
        //creates col elements
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        //adds text/data to these col elements
        var event = document.createTextNode('Loadedmetadata');
        var currentTime = document.createTextNode(player.currentTime());
        var duration = document.createTextNode(player.remainingTime());

        td1.appendChild(event);
        td2.appendChild(currentTime);
        td3.appendChild(duration);
        //adds the column elements to the row
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        //add the row to the table
        table.appendChild(tr);
    });

    function pause(){
        var table = document.getElementById('table');
        //create a row element
        var tr = document.createElement('tr');
        //creates col elements
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var event = document.createTextNode('Pause');
        var currentTime = document.createTextNode(player.currentTime());
        var duration = document.createTextNode(pausedDuration);

        td1.appendChild(event);
        td2.appendChild(currentTime);
        td3.appendChild(duration);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        //add the row to the table
        table.appendChild(tr);
    }

    //pause event listener
    this.on('pause', function() {
        videojs.log('Paused event triggered!');
        startCount();
    });
    /*
     var table = document.getElementById('table');
     //create a row element
     var tr = document.createElement('tr');
     //creates col elements
     var td1 = document.createElement('td');
     var td2 = document.createElement('td');
     var td3 = document.createElement('td');

     var event = document.createTextNode('Pause');
     var currentTime = document.createTextNode(player.currentTime());
     var duration = document.createTextNode(pausedDuration);

     td1.appendChild(event);
     td2.appendChild(currentTime);
     td3.appendChild(duration);
     tr.appendChild(td1);
     tr.appendChild(td2);
     tr.appendChild(td3);

     //add the row to the table
     table.appendChild(tr);
     */


    var previousTime = 0;
    var currentTime1 = 0;
    var seekStart = null;
    this.on('timeupdate', function() {
        previousTime = currentTime1;
        currentTime1 = player.currentTime();
    });

    this.on('seeking', function() {
        if(seekStart === null) {
            seekStart = previousTime;
        }
    });

    //seeked event listener
    this.on('seeked', function() {
        console.log('seeked from', seekStart, 'to', currentTime1, '; delta:', currentTime1 - previousTime);
        // videojs.log('Seeked event triggered!');
        var table = document.getElementById('table');
        //create a row element
        var tr = document.createElement('tr');
        //creates col elements
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');

        var event = document.createTextNode('Seeked');
        var currentTime = document.createTextNode(player.currentTime().toFixed(2));
        var duration = document.createTextNode(player.duration().toFixed(2));
        var seekstart = document.createTextNode(seekStart.toFixed(2));
        var seekend = document.createTextNode(currentTime1.toFixed(2));
        var difference = document.createTextNode((currentTime1 - previousTime).toFixed(3));

        td1.appendChild(event);
        td2.appendChild(currentTime);
        td3.appendChild(duration);
        td4.appendChild(seekstart);
        td5.appendChild(seekend);
        td6.appendChild(difference);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        //add the row to the table
        table.appendChild(tr);
        seekStart = null;
    });

    //stalled event listener
    this.on('stalled', function() {
        videojs.log('Stalled event triggered!');
        var table = document.getElementById('table');
        //create a row element
        var tr = document.createElement('tr');
        //creates col elements
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var event = document.createTextNode('Stalled');
        var currentTime = document.createTextNode(player.currentTime());
        var duration = document.createTextNode(player.remainingTime());

        td1.appendChild(event);
        td2.appendChild(currentTime);
        td3.appendChild(duration);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        //add the row to the table
        table.appendChild(tr);
    });

    //ended event listener
    this.on('ended', function() {
        videojs.log('Ended event triggered!');
        var table = document.getElementById('table');
        //create a row element
        var tr = document.createElement('tr');
        //creates col elements
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var event = document.createTextNode('Ended');
        var currentTime = document.createTextNode(player.currentTime());
        var duration = document.createTextNode(player.duration());

        td1.appendChild(event);
        td2.appendChild(currentTime);
        td3.appendChild(duration);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        //add the row to the table
        table.appendChild(tr);
    });
});

//var player = videojs('my_player');
var timeCheck = function() {
    if (player.currentTime() > 10) {
        player.off('timeupdate', timeCheck);
        player.trigger('played50Second');
    }
};
player.on('played50Second', function(){
    console.log('Played Longer than 10 seconds');
});
player.on('timeupdate', timeCheck);