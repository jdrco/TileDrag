
document.addEventListener('DOMContentLoaded', function() {

    var audio = new Audio('./sounds/move1.mp3')
    //audio.volume = 0.5;
    
    // Creating the board. Set up the players initial position.
    var board = document.querySelector('#board');
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var indicator = i + j;
            
            if (indicator % 2 != 0) {
                // render a black tile
                var tile = document.createElement('div');
                tile.id = i + ',' + j;
                tile.className = 'tile black-tile';
                board.appendChild(tile);
                 
                // render player
                if (i == 4 && j == 3) {

                    let player = document.createElement("div");
                    player.className = 'player';
                    document.getElementById('4,3').appendChild(player);
                }
                
            }
            else {
                // render a white tile
                var tile = document.createElement('div');
                tile.id = i + ',' + j;
                tile.className = 'tile white-tile';
                board.appendChild(tile);
            }
        }
    }
    // get player 
    var player = document.querySelector('.player');
    // get the tiles from the board
    var tiles = board.querySelectorAll('.tile');
    
    // Player Listeners
    document.addEventListener('mousedown', dragstart);
    document.addEventListener('mousemove', dragmove);
    document.addEventListener('mouseup', dragdrop);

    // tile hover on while mouse is down on player
    function mouseMoveFunction(e) {
        const j = Math.floor((e.clientX - board.offsetLeft) / 100); 
        const i = Math.floor((e.clientY - board.offsetTop) / 100);
        var id = i + "," + j;
        document.getElementById(id).classList.add('hover')
        for (const tile of tiles) {
            if (tile != document.getElementById(id) && tile.classList.contains('hover')){
                tile.classList.remove('hover')
            }
        }
    
    }
    player.addEventListener("mousedown", function(e){
        player.onmousemove = function(e) {
            mouseMoveFunction(e);
        }
    });
    
    player.addEventListener("mouseup", function(e){
        const j = Math.floor((e.clientX - board.offsetLeft) / 100); 
        const i = Math.floor((e.clientY - board.offsetTop) / 100);
        var id = i + "," + j;
        if (document.getElementById(id).classList.contains('hover')) {
            document.getElementById(id).classList.remove('hover')
        }
        player.onmousemove = null
    });


    var active = false;
    // tile listeners
    for (const tile of tiles) {

    }

    // initialize active player as none
    let activePiece = null;
    var isToggling = false;

    // drag functions
    // Center the player to the mouse position on mousdown
    function dragstart(e) {

        const element = e.target;
        if (element.classList.contains('player')) {
            
            element.style.position = 'absolute';
            var x = e.clientX - 50;
            var y = e.clientY - 48;
            element.style.left = x + "px";
            element.style.top = y + "px";
            
            activePiece = element;
            // console.log('current ' + activePiece.parentNode.id);
        }
    }

    // move the piece wherever the mouse is while the mouse is still down
    function dragmove(e) {

        if (activePiece) {
            // constrain player to board while moving the piece to current mouse position
            activePiece.style.position = 'absolute';
            const minX = board.offsetLeft - 20;
            const minY = board.offsetTop - 20;
            const maxX = board.offsetLeft + board.clientWidth - 80;
            const maxY = board.offsetTop + board.clientHeight - 80;
            var x = e.clientX - 50; 
            var y = e.clientY - 48;

            if  (x < minX) {
                activePiece.style.left = minX + "px";
            } else if (x > maxX) {
                activePiece.style.left = maxX + "px";
            } else {
                activePiece.style.left = x + "px";
            }

            if  (y < minY) {
                activePiece.style.top = minY + "px";
            } else if (y > maxY) {
                activePiece.style.top = maxY + "px";
            } else {
                activePiece.style.top = y + "px";
            }
            // (ternerary operator method) same thing as this ^^ 
            // activePiece.style.left =
            //     (x < minX)
            //         ? minX + "px" // true case (if)
            //         : x + "px";   // false case (else)

            // activePiece.style.top = 
            // (y < minY)
            //     ? minY + "px"
            //     : y + "px";

            // Get mouse coords while mouse is down
            // const j = Math.floor((e.clientX - board.offsetLeft) / 100); 
            // const i = Math.floor((e.clientY - board.offsetTop) / 100);

            // old_id = activePiece.parentNode.id
            // var new_id = i + "," + j;

            // var oldtile = document.getElementById(old_id);
            // var newtile = document.getElementById(new_id);

            // console.log('         old ' + old_id + ' new ' + new_id);
            
            // if (new_id == old_id) {
            //     oldtile.classList.add('hover');
            //     console.log(oldtile.classList)
                
            // } else {
            //     newtile.classList.add('hover');
            //     if (oldtile.classList.contains('hover')) {
            //         newtile.classList.remove('hover');
            //     }
            // }
            /* pseudocode
            if the old = new:
                get the old tile and add a  hover class to it
                remove hover class from new tile
            else:
                get the new tile and add a hover class to it 
                remove the hover class from old tile
            */



        }
    }

    // drop the piece when the mouse is up
    function dragdrop(e) {

        if (activePiece) {

            var player = document.querySelector('.player');
            
            // get the coordinates of the mousedrop wrt to board coordinates
            const j = Math.floor((e.clientX - board.offsetLeft) / 100); 
            const i = Math.floor((e.clientY - board.offsetTop) / 100);

            // prevent player from dropping to a non-real tile (outside of board)
            if (j < 0) {
                activePiece.style.position = 'static';
                activePiece = null;

            } else if (j > 7){
                activePiece.style.position = 'static';
                activePiece = null;

            } else if ( i < 0){
                activePiece.style.position = 'static';
                activePiece = null;

            } else if (i > 7){
                activePiece.style.position = 'static';
                activePiece = null;
            
            // Regular case (player drops it on board)
            } else {
                var id = i + "," + j;
                if (id != e.target.parentNode.id) {
                    audio.play();
                }
                // render a new board? naaaah
                // remove player from last div, append player to new div with id as x, y coords
                document.getElementById(e.target.parentNode.id).removeChild(player);
                document.getElementById(id).appendChild(player);
                activePiece.style.position = 'static';

                activePiece = null;

            }   
        }
    }

});