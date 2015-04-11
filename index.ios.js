/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Board = require('./app/Board');
var Card = require('./app/Card');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
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

        board.selected = null;
    } else {
        // missed hit
        this.state.board.lock();
        setTimeout(
            () => {
                selected.hide();
                previous.node.hide();
            },
            1000
        );
        board.selected = null;
    }
  },

  onCardHide() {
    this.state.board.unlock();
  },

  canShow() {
    return !this.state.board.isLocked;
  },

  render() {
    var rows = this.state.board.grid.map((cards, row) =>
      <View key={'row' + row} ref={'row' + row} style={styles.row}>
        {cards.map((imgUrl, col) =>
          <Card
            key={'col' + col}
            ref={'card' + row + col}
            img={imgUrl}
            onPress={this.handleCardPress.bind(this, imgUrl, row, col)}
            onHide={this.onCardHide}
            canShow={this.canShow}
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
});

AppRegistry.registerComponent('Memory', () => Memory);

module.exports = Memory;
