to install and run, please use the following instructions:

Requirements:
    npm
    node (needs to be in /usr/bin/env for the current config on line 1 of tennis_cmd.js)

1) open a terminal and navigate to the tennis_cmd folder.
2) execute: "npm install -g"
    NOTE: sudo may be required.
3) execute: "tennis_cmd" options are listed below
4) enjoy!

OPTIONS:
--p1name Player 1's name (Player 1 is default)

--p2name Player 2's name (Player 2 is default)

--p1score The initial score for player 1 - (one of Love, Fifteen, Thirty, Forty, Advantage - default is Love)

--p2score The initial score for player 2 - (one of Love, Fifteen, Thirty, Forty, Advantage - default is Love)

--p1wins The initial # of wins for player 1 - (an integer between 0 and 6 - default is 0)

--p2wins The initial # of wins for player 2 (an integer between 0 and 6 - default is 0)

--mode Whether to run the program in game mode or set mode (one of game or set - default is set)