import './App.css';
import RepeatButton from "./components/RepeatButton/RepeatButton";
import React from "react";
import Spinner from "./components/Spinner/Spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
  }

  static loser = [
    'такое ооо прогорит',
    'не привлекает инвесторов',
    'безвкусно',
    'не звучит',
    'уже ближе',
    'слишком пафосно',
    'у такого ооо отзовут лицензию',
    'не очень клиентоориентированно',
    'ну почти...',
    'в следующий раз найму копирайтера'
  ];

  static matches = [];

  finishHandler(value) {
    App.matches.push(value);

    if (App.matches.length === 3) {
      const { winner } = this.state;
      const first = App.matches[0];
      let results = App.matches.every(match => match === first)
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    App.matches = [];
  }

  render() {
    const { winner } = this.state;
    const getLoser = () => {
      return App.loser[Math.floor(Math.random()*App.loser.length)]
    }
    let repeatButton = null;
    let winningSound = null;

    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.handleClick} />
    }

    if (winner) {
      winningSound = <>
        <div>FLAG: POWER_OF_NAME</div>
        <div className={"won"} />
      </>
    }

    return (
        <div className={"App"}>
          {winningSound}
          {! winningSound ? <h1 className={"title"}>генератор ооо</h1> : null}
          <div className={`spinner-container`}>
            <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="0" />
            <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="0" />
            <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="0" />
            {winner === null ? <div className="gradient-fade" /> : <div className="gradient-fade green" />}
          </div>
          <h1 className={"status"}>
            <span className={"message"}>
              {winner === null ? 'посмотрим…' : winner ? '🤑 гениально! 🤑' : getLoser()}
            </span>
          </h1>
          {repeatButton}
        </div>
    );
  }
}

export default App;
