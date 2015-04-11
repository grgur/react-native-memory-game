/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Board = require('./app/Board');
var Card = require('./app/Card');
var Scoreboard = require('./app/Scoreboard');

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
    return { board: new Board(4, 4), turns: 0 };
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

        this.setState({board: board.pair(1)});
    } else {
        // missed hit
        board.miss(true);
        
        setTimeout(
            () => {
                selected.hide();
                previous.node.hide();
            },
            1000
        );
    }
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
        <View style={styles.board}>
          {rows}
        </View>

        <Scoreboard 
            player1={board.score.player1} 
            player2={board.score.player2} 
        />

        <TouchableHighlight
            onPress={this.onRestartPress}
            underlayColor="transparent"
            activeOpacity={0.5}>
            <Text style={styles.restartbtn}>Restart</Text>
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
    marginBottom: 20,
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
  restartbtn: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 16,
    marginTop: 10,
    color: '#535659',
  }
});

AppRegistry.registerComponent('Memory', () => Memory);

module.exports = Memory;
