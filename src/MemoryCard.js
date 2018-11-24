import React, { Component } from 'react';
import './MemoryCard.css';

class MemoryCard extends Component {

  render() {
    let memoryCardInnerClass = "MemoryCardInner"; 
    if (this.props.isFlipped === true) {
      memoryCardInnerClass += " flipped";
    }
    return (
      <div className="MemoryCard" onClick={this.props.pickCard}>
        <div className={memoryCardInnerClass}>
          <div className="MemoryCardBack">
            <img alt="freddie-face" src="./favicon.ico" />
          </div>
          <div className="MemoryCardFront">
            {console.log(this.props.symbol)}
            <img class="freddieImg" src={this.props.symbol} />
          </div>
        </div>
      </div>
    );
  }
}

export default MemoryCard;
