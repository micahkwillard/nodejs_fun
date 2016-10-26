#!/usr/bin/env node
"use strict";

var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');
var Player = require('./models/PlayerModel.js');

program
.option('--p1name <p1name>','Player 1\'s name up to 50 characters (Player 1 is default)')
.option('--p2name <p2name>','Player 2\'s name up to 50 characters (Player 2 is default)')
.option('--p1score <p1score>','The initial score for player 1 - (one of Love, Fifteen, Thirty, Forty, Advantage - default is Love)')
.option('--p2score <p2score>','The initial score for player 2 - (one of Love, Fifteen, Thirty, Forty, Advantage - default is Love)')
.option('--p1wins <p1wins>','The initial # of wins for player 1 - (an integer between 0 and 6 - default is 0)')
.option('--p2wins <p2wins>','The initial # of wins for player 2 (an integer between 0 and 6 - default is 0)')
.option('--mode <mode>','Whether to run the program in game mode or set mode (one of game or set - default is set)')
.parse(process.argv);

let badParam = false;

if(program.p1name && !(/^(\w{1,50})$/i).test(program.p1name)) {

    badParam = true;
}
else if(!program.p1name) {
    program.p1name = "Player 1";
}

if(program.p2name && !(/^(\w{1,50})$/i).test(program.p2name)) {

    badParam = true;
}
else if(!program.p2name) {
    program.p2name = "Player 2"
}

if(program.p1score && !(/^([1-5])/i).test(program.p1score)) {

    badParam = true;
}
else if(!program.p1score) {
    program.p1score = 1
}

if(program.p2score && !(/^([1-5])/i).test(program.p2score)) {

    badParam = true;
}
else if(!program.p2score) {
    program.p2score = 1
}

if(program.p1wins && !(/^([0-6])/i).test(program.p1wins)) {

    badParam = true;
}
else if(!program.p1wins) {
    program.p1wins = 0
}

if(program.p2wins && !(/^([0-6])/i).test(program.p2wins)) {

    badParam = true;
}
else if(!program.p2wins) {
    program.p2wins = 0
}

if(program.mode && !(/^(game|set)/i).test(program.mode)) {

    badParam = true;
}
else if(!program.mode) {
    program.mode = "set"
}

if(program.p1score && program.p2score && program.p1score == program.p2score && program.p1score == 5) {
    badParam = true;
}

if(badParam)
{
    program.help();
}

co(function *() {
    try {
        let winCondition = false;
        let player1 = new Player(1, program.p1name, (program.p1score - 1), program.p1wins);//According to the requirement, the score a user can enter starts with "Love" at "one". I minus one to make it 0 to make it array friendly.
        let player2 = new Player(2, program.p2name, (program.p2score - 1), program.p2wins);//According to the requirement, the score a user can enter starts with "Love" at "one". I minus one to make it 0 to make it array friendly.

        while (!winCondition) {
            let scoreEvent = yield prompt("Score Event: ");
            if (!isValidEvent(scoreEvent, player1, player2)) {
                console.log("Invalid Input");
                continue;
            }
            fireEvent(scoreEvent, player1, player2);
            if(hasSomeoneWon(player1, player2, "game")) {
                if(hasSomeoneWon(player1, player2, program.mode)) {
                    winCondition = true;
                }
                player1.resetGame();
                player2.resetGame();
            }
        }
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        console.trace(e);
        process.exit(1);
    }
});

function isValidEvent(event, player1, player2) {
    let valid = false;
    switch (event) {
        case player1.name + " scores!":
            valid = true;
            break;
        case player2.name + " scores!":
            valid = true;
            break;
        default:
            valid = false;
    }
    return valid;
}

function fireEvent(event, player1, player2) {
    switch (event)
    {
        case player1.name + " scores!" :
            player1.scored(player2);
            break;
        case player2.name + " scores!" :
            player2.scored(player1);
            break;
        default:
            break;
    }
}

function hasSomeoneWon(player1, player2, mode) {
    if(mode == "game") {
        return (player1.hasPlayerWonGame(player2) || player2.hasPlayerWonGame(player1));
    }
    else {
        return (player1.hasPlayerWonSet(player2) || player2.hasPlayerWonSet(player1));
    }
}