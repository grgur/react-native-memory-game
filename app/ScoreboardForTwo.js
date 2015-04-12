var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

class ScoreboardForTwo extends React.Component {
    render() {
        var score1Style = [styles.score];
        var score2Style = [styles.score];
        var score1TextStyle = [styles.scoreText];
        var score2TextStyle = [styles.scoreText];
        var board = this.props.board;

        switch (board.turn) {
          case 0: 
            score1Style.push(styles.turn);
            score1TextStyle.push(styles.turnText);
            break;
          case 1: 
            score2Style.push(styles.turn);
            score2TextStyle.push(styles.turnText);
            break;
        }

        return (
          <View style={styles.board}> 
            <View key="player1" style={score1Style}>
              <Text key="flips" style={styles.numberOfTurnsText}>{board.flips[0]}</Text>
              <Text key="score" style={score1TextStyle}>{board.score[0]}</Text>
            </View>

            <Text style={styles.divider}>:</Text>

            <View key="player2" style={score2Style}>
              <Text key="flips" style={styles.numberOfTurnsText}>{board.flips[1]}</Text>
              <Text key="score" style={score2TextStyle}>{board.score[1]}</Text>
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

module.exports = ScoreboardForTwo;