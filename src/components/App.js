import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    //this copies the current state so we can reach into it and do stuff
    //without everything breaking/slowing way down
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
  };

  loadSampleFish = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    console.log(key);
    const order = { ...this.state.order };
    order[key] = (order[key] || 0) + 1;
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder.bind(this, key)}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFish={this.loadSampleFish}
        />
      </div>
    );
  }
}

export default App;
