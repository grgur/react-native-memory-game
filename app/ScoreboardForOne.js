var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

class ScoreboardForOne extends React.Component {
    render() {
        var scoreStyle = [styles.score, styles.turn];
        var scoreTextStyle = [styles.scoreText, styles.turnText];
        var board = this.props.board;

        var flips = board.flips[0] + board.flips[1];
        var score = board.score[0] + board.score[1];

        return (
          <View style={styles.board}> 
            <View key="player" style={scoreStyle}>
              <Text key="flips" style={styles.numberOfTurnsText}>{flips}</Text>
              <Text key="score" style={scoreTextStyle}>{score}</Text>
            </View>
          </View>
        );
    }
};


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
    padding: 2,
    lineHeight: 30

  },
  turn: {
    borderColor: '#068981',
  },
  turnText: {
    color: '#D9304F',
  },
  numberOfTurnsText: {
    fontFamily: 'ChalkboardSE-Bold',
    color: "#068981",
    fontSize: 12
  },
  divider: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 32,
    color: '#535659',
    padding: 2,
  }

});

module.exports = ScoreboardForOne;