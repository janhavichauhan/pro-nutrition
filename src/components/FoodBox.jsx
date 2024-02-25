import React, { Component } from 'react';
import FoodData from "./FoodData"
import '../App.css';

class FoodBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fooditems: FoodData.map((food) => ({
        id: food.id,
        count: 0,
        total_no_of_calories: 0,
      })),
      searchTerm: "",
    };
  }

  handleQuantityChange = (id, count) => {
    this.setState((prevState) => ({
      fooditems: prevState.fooditems.map((item) =>
        item.id === id ? { ...item, count: count >= 0 ? count : 0 } : item
      ),
    }));
  };

  handleAddClick = (id) => {
    this.setState((prevState) => ({
      fooditems: prevState.fooditems.map((item) =>
        item.id === id
          ? {
              ...item,
              total_no_of_calories: item.count * FoodData.find((food) => food.id === id).cal,
            }
          : item
      ),
    }));
  };

  handleResetClick = (id) => {
    this.setState((prevState) => ({
      fooditems: prevState.fooditems.map((item) =>
        item.id === id ? { ...item, count: 0, total_no_of_calories: 0 } : item
      ),
    }));
  };

  handleSearchClick = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { fooditems, searchTerm } = this.state;

    const filteredFoodItems = fooditems.filter((item) =>
      FoodData.find((food) => food.id === item.id)
        .name.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <div className="bar">
          <div className="search">
            <p>Search</p>
            <input
              type="text"
              placeholder="Search foods"
              value={searchTerm}
              onChange={this.handleSearchClick}
            />
          </div>
        </div>
        <div>
          {filteredFoodItems.map((item) => {
            const { id, count, total_no_of_calories } = item;
            const { name, cal, img } = FoodData.find((food) => food.id === id);
            return (
            <div key={id} className="foodbox">
                <div>
                  <div className="foods">
                    <img src={img} alt={name} />
                    <div className="bichkenam">
                      <p className="heading">{name} {cal}</p>
                    </div>
                    <input
                      type="number"
                      value={count}
                      onChange={(e) =>
                        this.handleQuantityChange(id, parseInt(e.target.value, 10))
                      }
                    />
                    <button onClick={() => this.handleAddClick(id)}>+</button>
                  </div>
                </div>
                <div className="calories">
                  <p>
                    {count} {name} = {total_no_of_calories} calories
                  </p>
                  <button onClick={() => this.handleResetClick(id)}>Reset</button>
                </div>
            </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default FoodBox;
