/**
 * Created by mwillard on 10/25/16.
 */
"use strict";
let Player = function (number, name, initGameScore, initSetScore) {
    this.number = number;
    this.name = name;
    this.prevGameScore = initGameScore;
    this.gameScore = initGameScore;
    this.prevSetScore = initSetScore;
    this.setScore = initSetScore;
    this.SCORE_TEXT = ["Love", "Fifteen", "Thirty", "Forty", "Advantage"];
    console.log("Player " + this.name + " created. Set Score: " + this.setScore + ". Game Score: " + this.gameScore);
};

Player.prototype.scored = function(otherPlayerObj, mode) {
    if(this.hasPlayerWonGame(otherPlayerObj)) {//Game won!
        //Add logic for Set win condition
        this.prevSetScore = this.setScore;
        this.setScore++;
    }
    else {
        this.prevGameScore = this.gameScore;
        this.gameScore++;
        //Player.prototype.printScore.call(this, otherPlayerObj);
        this.printScore(otherPlayerObj);
    }
};

Player.prototype.printScore = function(otherPlayerObj) {
    let player1 = this;
    let player2 = otherPlayerObj;
    if(this.number != 1)
    {
        player1 = otherPlayerObj;
        player2 = this;
    }
    console.log(player1.getScoreText() + "-" + player2.getScoreText());//PRINT
    return;
};

Player.prototype.getScoreText = function() {
    return this.SCORE_TEXT[(this.gameScore < 5 ? this.gameScore : 4)];//Nothing can be larger than "Advantage".
};

Player.prototype.hasPlayerWonGame = function(otherPlayerObj) {
    return ((this.gameScore - otherPlayerObj.gameScore) == 2 && this.gameScore >= 5);
};

Player.prototype.hasPlayerWonSet = function(otherPlayerObj) {
    //TODO:
    //TODO: A set is won by winning at least six games and at least two games more than the opponent.
    //TODO: Special case: if the set score is 6-5 and the trailing player wins--making the set score 6-6--the next game wins the set.
    return (((this.setScore - otherPlayerObj.setScore) == 2 && this.gameScore >= 5));
};

module.exports = Player;