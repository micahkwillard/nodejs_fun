#!/usr/bin/env node
"use strict";

var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');
var Player = require('./models/PlayerModel.js');

program
//.option('--p1name <p1name>','Player 1\'s name up to 10 characters (Player 1 is default)', /^(\w{1,10})/i, 'Player 1')
.option('--p1name <p1name>','Player 1\'s name up to 10 characters (Player 1 is default)', /^(\w{1,10})/i, 'p1')
.option('--p2name <p2name>','Player 2\'s name up to 10 characters (Player 2 is default)', /^(\w{1,10})/i, 'p2')
//.option('--p2name <p2name>','Player 2\'s name up to 10 characters (Player 2 is default)', /^(\w{1,10})/i, 'Player 2')
.option('--p1score <p1score>','The initial score for player 1 - (zero of Love, Fifteen, Thirty, Forty, Advantage - default is Love)', /^(\d)/i, '0')
.option('--p2score <p2score>','The initial score for player 2 - (zero of Love, Fifteen, Thirty, Forty, Advantage - default is Love)', /^(\d)/i, '0')
.option('--p1wins <p1wins>','The initial # of wins for player 1 - (an integer between 0 and 6 - default is 0)', /^(\d)/i, '0')
.option('--p2wins <p2wins>','The initial # of wins for player 2 (an integer between 0 and 6 - default is 0)', /^(\d)/i, '0')
//.option('--mode <mode>','Whether to run the program in game mode or set mode (one of game or set - default is set)', /^(game|set)/i, 'set')//TODO: UNCOMMENT
.option('--mode <mode>','Whether to run the program in game mode or set mode (one of game or set - default is set)', /^(game|set)/i, 'game')
.parse(process.argv);

if(program.p1name) console.log("p1name is " + program.p1name);
if(program.p2name) console.log("p2name is " + program.p2name);
if(program.p1score) console.log("p1score is " + program.p1score);
if(program.p2score) console.log("p2score is " + program.p2score);
if(program.p1wins) console.log("p1wins is " + program.p1wins);
if(program.p2wins) console.log("p2wins is " + program.p2wins);
if(program.mode) console.log("mode is " + program.mode);

co(function *() {
    try {
        let winCondition = false;
        let player1 = new Player(1, program.p1name, program.p1score, program.p1wins);
        let player2 = new Player(2, program.p2name, program.p2score, program.p2wins);

        while (!winCondition) {
            let scoreEvent = yield prompt("Score Event: ");
            if (!isValidEvent(scoreEvent, player1, player2)) {
                console.log("Invalid Input");
                continue;
            }
            fireEvent(scoreEvent, player1, player2, program.mode);
            console.log("Score Event was " + scoreEvent);
            winCondition = hasSomeoneWon(player1, player2, program.mode);
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

function fireEvent(event, player1, player2, mode) {
    switch (event)
    {
        case player1.name + " scores!" :
            player1.scored(player2, mode);
            break;
        case player2.name + " scores!" :
            player2.scored(player1, mode);
            break;
        default:
            break;
    }
    return;
}

function hasSomeoneWon(player1, player2, mode) {
    if(mode == "game") {
        if((player1.gameScore - player2.gameScore > 2 && player1.gameScore >= 5) || (player2.gameScore - player1.gameScore > 2  && player2.gameScore >= 5)) {
            return true;
        }
    }
    else {
        //TODO:
        //TODO: A set is won by winning at least six games and at least two games more than the opponent.
        //TODO: Special case: if the set score is 6-5 and the trailing player wins--making the set score 6-6--the next game wins the set.
        if((player1.setScore - player2.setScore > 2 && player1.setScore >= 5) || (player2.setScore - player1.setScore > 2  && player2.setScore >= 5)) {
            return true;
        }
    }
    return false;
}