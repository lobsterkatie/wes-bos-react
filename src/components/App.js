import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
    loading: true
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
      //make updating the order from localStorage a callback on the firebase
      //data retrieval - otherwise the order will get updated before the data
      //is back from firebase and the order will try to render with non-existent
      //fish
      then: () => {
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
          this.setState({
            order: JSON.parse(localStorageRef)
          });
        }
        this.state.loading = false;
      }
    });
  }

  componentDidUpdate() {
    //this check is necessary because the very first time this function is
    //called, it will be because firebase is updating the cannonical fish
    //(which has to happen before the order is updated, or the order will
    //try to render non-existent fish). However, if localStorage is updated to
    //match state at that point, the empty order state which is the initial
    //value will overwrite localStoarage's correct values
    if (!this.state.loading) {
      localStorage.setItem(
        this.props.match.params.storeId,
        JSON.stringify(this.state.order)
      );
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

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
