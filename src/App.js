import React, { Component } from 'react';
import MemoryCard from './MemoryCard.js'; 
import './App.css';

const generateDeck = () => {
    let freddieImgs = [ 'freddie1.jpg', 'freddie2.jpg', 'freddie3.jpg', 'freddie4.jpg',
     'freddie5.jpg', 'freddie6.jpg', 'freddie7.jpg', 'freddie8.jpg' ];
    let deck = [];

    for (let i=0; i<16; i++) {
      deck.push({ isFlipped: false, symbol: freddieImgs[i % 8] }); 
    }
    shuffle(deck);
    return deck;
}

const shuffle = (a) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

class App extends Component {
  constructor() {
    super();
    this.state = { 
      deck: generateDeck(),
      pickedCards: [],
      score: 0,
      misses: 0
     }; 
  }

  unflipCards(card1Index, card2Index) {
    let card1 = {...this.state.deck[card1Index]};
    let card2 = {...this.state.deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;
  
    let newDeck = this.state.deck.map((card, index) => {
      if (index == card1Index) { 
        return card1;
      } else if (index == card2Index) {
        return card2;
      } else {
        return card;
      }
    });
    this.setState({ deck: newDeck });
  }

  pickCard(cardIndex) {
    if  (this.state.deck[cardIndex].isFlipped === true) { return };
    let cardToFlip = {...this.state.deck[cardIndex]}; 
    cardToFlip.isFlipped = true;    
    
    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex == index) { return cardToFlip }; 
      return card;
    });
    if ( newPickedCards.length == 2) {
      let card1Index = newPickedCards[0];
      let card2Index = newPickedCards[1];
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        setTimeout(this.unflipCards.bind(this, card1Index, card2Index), 1000); 
        this.incrementMisses();
      } else {
        this.incrementScore();
      }
      newPickedCards = []; 
    }
    this.setState({ deck: newDeck, pickedCards: newPickedCards });
  }

  incrementScore() {
      this.setState((prevState, props) => {
          return { score: prevState.score + 1 };
      })
  }

  incrementMisses() {
    this.setState((prevState, props) => {
      return { misses: prevState.misses + 1 };
    });
  }

  checkForWinOrLoss() {
    if (this.state.score === 8) {
      this.showWinModal();
    } else if (this.state.misses === 10) {
      this.showLoseModal();
    }   
  }

  tryAgain() {
    this.setState({
      score: 0,
      misses: 0,
      deck: generateDeck()
    })
  }

  render() {
    let cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard key={index} symbol={card.symbol} isFlipped={card.isFlipped} pickCard={this.pickCard.bind(this, index)} />;
      });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Freddie<span className="titleImg"><img src="favicon.ico" /></span>Match</h1>
          <h3 className="App-subtitle">Match cards to win</h3>
        </header>
        {this.state.misses >= 10 
        ? 
        <div>
            <p>Dang, you lost. But, you'll live to bork another day!</p> 
            <button onClick={this.tryAgain.bind(this)}>Try Again</button>
        </div>
        :  
        <div className="scoreBoard">
            <section>
            <h2>Misses</h2>
            <span>{this.state.misses} / 10</span>
            </section> 
        </div>
        }
        <div>
          { cardsJSX.slice(0,4) }
        </div>
        <div>
          { cardsJSX.slice(4,8) }
        </div>
        <div>
          { cardsJSX.slice(8,12) }
        </div>
        <div>
          { cardsJSX.slice(12,16) }
        </div>
      </div>
    );
  }
}

export default App;
