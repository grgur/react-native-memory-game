var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

var AnimationExperimental = require('AnimationExperimental');

class Card extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            paired: false,
            visible: false
        };
    }

    /**
     * Only happens on game reset so we reset card styles
     * @param  {Object} nextProps Properties to receive
     */
    componentWillReceiveProps (nextProps) {
        if (nextProps.cardCfg.hidden === true) {
            this.setState({
                visible: false,
                paired: false
            });
        }
    }

    onPress() {
        var state = this.state;

        if (state.paired || state.visible || !this.props.canShow()) {
            return;
        }

        this.show();

        this.props.onPress();
    }

    show() {
        this.setState({visible: true});
        this.props.cardCfg.hidden = false;
        AnimationExperimental.startAnimation({
            node: this.refs.image,
            duration: 400,
            easing: 'easeOutQuad',
            property: 'opacity',
            toValue: 1,
        });
    }

    setPaired() {
        this.setState({paired: true});
        this.props.cardCfg.hidden = false;
        AnimationExperimental.startAnimation({
            node: this.refs.image,
            duration: 400,
            easing: 'easeInQuad',
            property: 'opacity',
            toValue: 0.1,
        });
    }

    hide() {
        this.setState({visible: false});
        this.props.cardCfg.hidden = true;
        this.props.onHide();
    }

    render() {
        var state = this.state,
            imageStyles = [styles.cardImage],
            cardStyles = [styles.card];

        if (state.visible === true) {
            imageStyles.push(styles.cardImageVisible);
            cardStyles.push(styles.cardVisible);
        }

        if (state.paired === true) {
            imageStyles.push(styles.cardImagePaired);
            cardStyles.push(styles.cardPaired);
        }

        return (
          <TouchableHighlight
            onPress={this.onPress.bind(this)}
            underlayColor="transparent"
            activeOpacity={0.5}>
            <View style={cardStyles}>
              <Image style={imageStyles} ref="image" source={{uri: this.props.img}} />
            </View>
          </TouchableHighlight>
        );
    }
};


var styles = StyleSheet.create({
  card: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#2DBE99',
    borderColor: '#068981',
    borderWidth: 2,
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
  },

  cardImagePaired: {
    opacity: 0.5
  },

  cardPaired: {
    backgroundColor: '#F4F9CB',
    borderColor: '#89E0B9'
  },

  cardVisible: {
    backgroundColor: '#fff'
  },
});

module.exports = Card;