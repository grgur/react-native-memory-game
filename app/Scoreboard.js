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
        return (
          <View style={styles.board}>
            <View style={styles.score}>
              <Text style={styles.scoreText}>{this.props.player1}</Text>
              <Text style={styles.scoreText}>-</Text>
              <Text style={styles.scoreText}>{this.props.player2}</Text>
            </View>
          </View>
        );
    }
});


var styles = StyleSheet.create({
  board: { 
    padding: 5,
    marginTop: 12
  },
  score: {
    flexDirection: 'row', 
    justifyContent: 'center',
    width: 80,
    flex: 0.8,
    backgroundColor: '#89E0B9',
    borderColor: '#2DBE99',
    borderWidth: 1,
    borderRadius: 5
  },
  scoreText: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 12,
    color: '#535659',
    padding: 4
  }
});

module.exports = Scoreboard;