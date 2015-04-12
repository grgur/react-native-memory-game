/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Board = require('./app/Board');
var Card = require('./app/Card');
var ScoreboardForOne = require('./app/ScoreboardForOne');
var ScoreboardForTwo = require('./app/ScoreboardForTwo');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} = React;


var Memory = React.createClass({
  getInitialState() {
    return { board: new Board(4, 4), players: 1 };
  },

  restartGame() {
    this.setState(this.getInitialState());
  },

  handleCardPress(url: string, row: number, col: number) {
    var board = this.state.board;
    var previous = board.selected;
    var selected = this.refs['card' + row + col];
    var current = {
        url: url,
        node: selected
    }

    if (!previous) {
        // first card
        board.selected = current;
    } else if (previous.url === url) {
        // successful hit
        previous.node.setPaired();
        selected.setPaired();

        this.setState({board: board.pair()});
        this.isGameOver();
    } else {
        // missed hit
        board.miss(true);
        
        setTimeout(
            () => {
                selected.hide();
                previous.node.hide();
                this.setState({board: board});
            },
            1000
        );
    }
  },

  isGameOver() {
    var board = this.state.board,
        totalScore = board.score[0] + board.score[1],
        maxScore = board.maxScore,
        msg;

    if (totalScore < maxScore) {
        return false;
    }

    if (this.state.players === 1) {
        msg = 'You\'ve done it!';
    } else {
        if (board.score[0] === board.score[1]) {
            if (board.flips[0] === board.flips[1]) {
                msg = 'It\s a tie';
            } else {
                msg = `Player ${board.flips[0] < board.flips[1] ? 1 : 2} won!`;
            }
        } else {
            msg = `Player ${board.score[0] > board.score[1] ? 1 : 2} won!`;
        }
    }

    AlertIOS.alert(
        'Game Over',
        msg,
        [
          {text: 'Alright!'},
          {text: 'Start new', onPress: this.restartGame}
      ]
    );

    return true;
  },

  onCardHide() {
    this.state.board.unlock();
  },

  canShow() {
    return !this.state.board.isLocked;
  },

  onRestartPress() {
    AlertIOS.alert(
        'Restart',
        'Are you sure you want to restart game?',
        [
          {text: 'No'},
          {text: 'Restart', onPress: this.restartGame}
      ]
    );
  },

  makeSinglePlayer() {
    this.setState({players: 1});
  },

  makeMultiPlayer() {
    this.setState({players: 2});
  },

  getScoreboard() {
      var board = this.state.board;

      if (this.state.players === 1) {
        return <ScoreboardForOne board={board}/>;
      }

      return <ScoreboardForTwo board={board}/>;
  },

  getPlayerToggleButtons() {
    return (
        <View style={styles.playerToggleButtons}>
            <TouchableHighlight onPress={this.makeSinglePlayer} underlayColor="transparent" activeOpacity={0.5}>
                <Text style={styles.buttonText}>👤 Single Player</Text>
            </TouchableHighlight>

            <Text style={styles.buttonText}> - </Text>

            <TouchableHighlight onPress={this.makeMultiPlayer} underlayColor="transparent" activeOpacity={0.5}>
                <Text style={styles.buttonText}>👥Two Players</Text>
            </TouchableHighlight>
        </View>
    );
  },

  render() {
    var board = this.state.board;

    var rows = board.grid.map((cards, row) =>
      <View key={'row' + row} ref={'row' + row} style={styles.row}>
        {cards.map((cardCfg, col) =>
          <Card
            key={'col' + col}
            ref={'card' + row + col}
            img={cardCfg.url}
            onPress={this.handleCardPress.bind(this, cardCfg.url, row, col)}
            onHide={this.onCardHide}
            canShow={this.canShow}
            cardCfg={cardCfg}
          />
        )}
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Memory Game</Text>

        {this.getPlayerToggleButtons()}

        <View style={styles.board}>
          {rows}
        </View>

        {this.getScoreboard()}

        <TouchableHighlight
            onPress={this.onRestartPress}
            underlayColor="transparent"
            activeOpacity={0.5}>
            <Text style={styles.buttonText}>🔄 Restart</Text>
          </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F9CB'
  },
  title: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 39,
    marginBottom: 0,
    color: '#535659',
  },
  board: {
    padding: 5,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    rotation: 180
  },
  buttonText: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 16,
    marginTop: 25,
    color: '#535659',
  },
  buttonActiveText: {
    color: '#D9304F',
  },
  playerToggleButtons: {
    flexDirection: 'row',
  }
});

AppRegistry.registerComponent('Memory', () => Memory);

module.exports = Memory;
