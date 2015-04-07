/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AlertIOS,
  Animation,
} = React;

// var Memory = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+Control+Z for dev menu
//         </Text>
//       </View>
//     );
//   }
// });


class Board {
    /**
     * Shuffled cards in play
     * @type {String[]}
     */
    cards: Array<string>;
    
    /**
     * Number of rows
     * @type {number}
     */
    numRows: number;

    /**
     * Number of columns
     * @type {number}
     */
    numCols: number;

    /**
     * Currently selected card (if any)
     * @type {String}
     */
    selected: string;

    /**
     * Number of found cards 
     * @type {Number}
     */
    found: number;

    constructor(numRows, numCols) {
        this.numRows = numRows || 4;
        this.numCols = numCols || 4;
        var cards = this.cards = this.getCards();
        this.createGrid();
    }

    getCards(): Array {
        var playingCards = [
            'http://www.picgifs.com/disney-gifs/disney-gifs/disney-glitter/disney-graphics-disney-glitter-017763.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/disney-glitter/disney-graphics-disney-glitter-953286.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/belle-and-the-beast/disney-graphics-belle-and-the-beast-928628.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/dumbo/disney-graphics-dumbo-193099.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/peter-pan/disney-graphics-peter-pan-107140.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/madagascar/disney-graphics-madagascar-224386.jpg'
        ];

        var deck = playingCards.concat(playingCards);

        this.arrayShuffle(deck);

        return deck;
    }

    arrayShuffle(items: array): Array {
        var currentIndex = items.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = items[currentIndex];
            items[currentIndex] = items[randomIndex];
            items[randomIndex] = temporaryValue;
        }

        return items;
    }

    createGrid(): Array {
        var cards = this.cards,
            numCols = this.numCols,
            numRows = this.numRows,
            index = 0,
            grid = [];

        for (var i = 0; i < numRows; i++) {
            var row = Array(numCols);
            for (var j = 0; j < numCols; j++) {
                row[j] = cards[index];
                index++;
            }
            grid[i] = row;
        }

        this.grid = grid;
    }
}


var Card = React.createClass({
    getInitialState() {
        return {
            paired: false,
            visible: false
        }
    },

    onPress() {
        var state = this.state;

        if (state.paired || state.visible) {
            return;
        }

        this.show();

        this.props.onPress();
    },

    show() {
        this.setState({visible: true});
        Animation.startAnimation(this.refs.image, 1400, 0, 'easeOut', {opacity: 1});
    },

    setPaired() {
        this.setState({paired: true});
        Animation.startAnimation(this.refs.image, 1400, 0, 'easeOut', {opacity: 0.1});
    },

    hide() {
        this.setState({visible: false});
        Animation.startAnimation(this.refs.image, 1400, 0, 'easeOut', {opacity: 0});
    },

    render() {
        return (
          <TouchableHighlight
            onPress={this.onPress}
            underlayColor="transparent"
            // underlayColor="green"
            activeOpacity={0.5}>
            <View style={styles.card}>
              <Image style={styles.cardImage} ref="image" source={{uri: this.props.img}} />
            </View>
          </TouchableHighlight>
        );
    }
});

var Memory = React.createClass({
  getInitialState() {
    return { board: new Board(), turns: 0 };
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
        board.selected = current;
    } else if (previous.url === url) {
        // AlertIOS.alert(
        //     'Found one',
        //     url,
        //     [
        //       {text: 'Oh Yeah!'},
        //     ]
        //   );


        previous.node.setPaired();
        selected.setPaired();

        board.selected = null;
    } else {
        // missed hit
        setTimeout(
            () => {
                selected.hide();
                previous.node.hide();
            },
            1000
        );
        board.selected = null;
    }

    // AlertIOS.alert(
    //         'Clicked on',
    //         url,
    //         [
    //           {text: 'Oh Yeah!'},
    //         ]
    //       )

    return;

    if (this.state.board.hasMark(row, col)) {
      return;
    }

    this.setState({
      board: this.state.board.mark(row, col, this.state.player),
      player: this.nextPlayer(),
    });
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
          />
        )}
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title} onPress={() => AlertIOS.alert(
            'Foo Title',
            'My Alert Msg',
            [
              {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
              {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
            ]
          )}>Memory</Text>
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
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'Chalkduster',
    fontSize: 39,
    marginBottom: 20,
  },
  board: {
    padding: 5,
    backgroundColor: '#47525d',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#7b8994',
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    resizeMode: Image.resizeMode.cover,
    width: 80,
    height: 80,
    opacity: 0
  },

  cardImageVisible: {
    opacity: 1
  }
});

AppRegistry.registerComponent('Memory', () => Memory);

module.exports = Memory;
