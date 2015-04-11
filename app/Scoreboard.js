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
              <Text style={styles.scoreText}>{this.props.player2}</Text>
            </View>
          </View>
        );
    }
});


var styles = StyleSheet.create({
  board: {
    flexDirection: 'row', 
    height: 100, 
    padding: 5
  },
  score: {
    flex: 0.8,
    backgroundColor: '#89E0B9'
  },
  scoreText: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 12,
    marginBottom: 20,
    color: '#535659',
  }
});

module.exports = Scoreboard;