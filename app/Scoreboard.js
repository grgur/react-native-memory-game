var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

var Scoreboard = React.createClass({
    getDefaultProps() {
        return {
            player1: 0,
            player2: 0
        }
    },    

    render() {
        var score1Style = [styles.score];
        var score2Style = [styles.score];
        var score1TextStyle = [styles.scoreText];
        var score2TextStyle = [styles.scoreText];

        switch (this.props.board.turn) {
          case 1: 
            score1Style.push(styles.turn);
            score1TextStyle.push(styles.turn);
            break;
          case 2: 
            score2Style.push(styles.turn);
            score2TextStyle.push(styles.turn);
            break;
        }

        return (
          <View style={styles.board}>
            <View style={score1Style}>
              <Text style={score1TextStyle}>{this.props.player1}</Text>
            </View>

            <Text style={styles.scoreText}>:</Text>

            <View style={score2Style}>
              <Text style={score2TextStyle}>{this.props.player2}</Text>
            </View>
          </View>
        );
    }
});


var styles = StyleSheet.create({
  board: { 
    marginTop: 12,
    flexDirection: 'row', 
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    flex: 0.8,
    backgroundColor: '#89E0B9',
    borderColor: '#2DBE99',
    borderWidth: 1,
    borderRadius: 5,
  },
  scoreText: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 32,
    color: '#535659',
    padding: 4
  },
  turn: { // let's see what happens when we share view and text styles
    borderColor: '#068981',
    color: '#D9304F',
  }
});

module.exports = Scoreboard;