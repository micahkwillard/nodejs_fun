/**
 *
 * Created by micah.k.willard on 10/25/16.
 *
 */
"use strict";
let Player = function (number, name, initGameScore, initSetScore) {
    this.number = number;
    this.name = name;
    this.gameScore = initGameScore;
    this.setScore = initSetScore;
};

Player.prototype.SCORE_TEXT = ["Love", "Fifteen", "Thirty", "Forty", "Advantage"];
Player.prototype.MAX_SET_SCORE = 7;
Player.prototype.MIN_SET_SCORE = 6;
Player.prototype.MIN_GAME_SCORE = 5;
Player.prototype.MIN_GAME_LEAD = 2;
Player.prototype.MIN_SET_LEAD = 2;

Player.prototype.scored = function (otherPlayerObj) {
    this.gameScore++;
    if (this.hasPlayerWonGame(otherPlayerObj)) {//Game won!
        //Add logic for Set win condition
        this.setScore++;
    }
    this.printScore(otherPlayerObj);
};

Player.prototype.printScore = function (otherPlayerObj) {
    let player1 = this;
    let player2 = otherPlayerObj;
    let scorePattern = "";

    if (this.number != 1) {
        player1 = otherPlayerObj;
        player2 = this;
    }

    if (player1.gameScore != player2.gameScore) {
        scorePattern = "xy";// different scores. Display "score-score". Check for advantage or win next.

        if ((player1.gameScore - player2.gameScore) >= 1 && player1.gameScore > 3) {
            scorePattern = "p1a"; //player1 advantage
        }
        if ((player1.gameScore - player2.gameScore) >= 2 && player1.gameScore > 4) {
            scorePattern = "p1w"; //player1 win
        }

        if ((player2.gameScore - player1.gameScore) >= 1 && player2.gameScore > 3) {
            scorePattern = "p2a"; //player2 advantage
        }
        if ((player2.gameScore - player1.gameScore) >= 2 && player2.gameScore > 4) {
            scorePattern = "p2w"; //player2 win
        }
    }
    if (player1.gameScore == player2.gameScore) {// same score.
        scorePattern = "xx";//xx could just be xy, since both will do the same print, but left for different for reading.

        if(player1.gameScore >= 4) {// deuce check;
            scorePattern = "deuce";
        }
    }
    if(player1.hasPlayerWonSet(player2)) {//Set Win check
        scorePattern = "p1ws";
    }
    if(player2.hasPlayerWonSet(player1)) {
        scorePattern = "p2ws";
    }

    switch (scorePattern) {
        case "xy":
        case "xx":
            console.log(player1.getScoreText() + "-" + player2.getScoreText());//PRINT: <text>-<text>
            break;
        case "p1a":
            console.log(player1.getScoreText() + " " + player1.name);//PRINT: Advantage Player 1
            break;
        case "p1w":
            console.log(player1.name + " wins the game");//PRINT: Player 1 wins the game
            break;
        case "p1ws":
            console.log(player1.name + " wins the game and set " + player1.setScore + "-" + player2.setScore);//PRINT: Player 1 wins the game and set <int>-<int>
            break;
        case "p2a":
            console.log(player2.getScoreText() + " " + player2.name);//PRINT: Advantage Player 2
            break;
        case "p2w":
            console.log(player2.name + " wins the game");//PRINT: Player 2 wins the game
            break;
        case "p2ws":
            console.log(player2.name + " wins the game and set " + player1.setScore + "-" + player2.setScore);//PRINT: Player 2 wins the game and set <int>-<int>
            break;
        case "deuce":
            console.log("Deuce!");//PRINT: Deuce!
            break;
        default:

    }
};

Player.prototype.getScoreText = function () {
    return this.SCORE_TEXT[(this.gameScore < this.MIN_GAME_SCORE ? this.gameScore : 4)];//Nothing can be larger than "Advantage".
};

Player.prototype.hasPlayerWonGame = function (otherPlayerObj) {
    return ((this.gameScore - otherPlayerObj.gameScore) >= this.MIN_GAME_LEAD && this.gameScore >= this.MIN_GAME_SCORE);
};

Player.prototype.hasPlayerWonSet = function (otherPlayerObj) {
    return (this.setScore == this.MAX_SET_SCORE || ((this.setScore - otherPlayerObj.setScore) >= this.MIN_SET_LEAD && this.setScore >= this.MIN_SET_SCORE));
};

Player.prototype.resetGame = function () {
    this.gameScore = 0;
};

module.exports = Player;