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

        var numberOfCards = numRows * numCols / 2;
        var cards = this.cards = this.getCards(numberOfCards);
        this.createGrid();
    }

    getCards(numberOfCards: number): Array {
        var playingCards = this.arrayShuffle([
            'http://www.picgifs.com/disney-gifs/disney-gifs/disney-glitter/disney-graphics-disney-glitter-017763.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/disney-glitter/disney-graphics-disney-glitter-953286.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/belle-and-the-beast/disney-graphics-belle-and-the-beast-928628.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/dumbo/disney-graphics-dumbo-193099.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/peter-pan/disney-graphics-peter-pan-107140.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/madagascar/disney-graphics-madagascar-224386.jpg',
            'http://www.picgifs.com/disney-gifs/disney-gifs/tweety-and-sylvester/disney-graphics-tweety-and-sylvester-481783.gif',
            'http://www.picgifs.com/disney-gifs/disney-gifs/ariel/animaatjes-ariel-0232913.gif'
        ]).slice(0, numberOfCards);

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

module.exports = Board;