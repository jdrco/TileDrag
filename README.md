# Tile Drag
#### Video Demo:
#### Description:
I've always found the game UI experience on sites like chess.com or lichess.com addictive and exciting (only when I'm winning).
Part of the reason I love online chess is because of the movement mechanics of the pieces which makes the game feel smooth and snappy.

Knowing that not a lot of people play chess online, I wanted to create a game that mimics the "smooth and grid snappy" feel without having to worry about the rules of chess.

Even if you do know how to play chess, you can use this app to enchance your movement/mouse accuracy. 

This project is written in Vanilla Javascript (no canvas or external libraries). Therefore, all I needed was an index.html file to take care of the site's skeleton, a styles.css file to make the game look nice, and a main.js file to take care of the game logic (rendering the board and all other elements, player movement logic, game logic).

At first I made the logic of the game time based but decided that a "Don't let the {blank} fill up" type of game would be more exciting and harder to program. 

#### Main Learning Outcomes:
- Passing the "event" object inside of event handlers.
- Asychronous programming.
- Algorithmic problem solving (finding the most efficient solution).
- Styling with css (Positioning elemnts).

#### Most Challenging Function:
The function I had most trouble with was the "chooseRandomTile" function (inside the main.js), sincet this function required constant checking of how mny target tiles are on the board so that whatever random tile chosen isn't already targetted. Many times I broke my browser due to being stuck in an infinite loop or having a large runtime whiche made it slow. I was able to solve this function by using hashMap logic and arrays to get the function running in O(n) time.

#### References:
- Board Creation and grid snap logic: https://youtube.com/playlist?list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj
- Events summary: https://www.w3schools.com/jsref/dom_obj_event.asp
- Mouse event help: https://stackoverflow.com/questions/34483940/best-way-to-run-mousemove-only-on-mousedown-with-pure-javascript

#### Tile drag is an addictive arcade game written in vanilla javascript. Hope you enjoy!

https://jdrco.github.io/tile-drag/
