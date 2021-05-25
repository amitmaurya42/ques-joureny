import React, { Component } from "react";
import "./ProgressBar.scss";

class ProgressBar extends Component {
  render() {
    return (
      <div className="progress-bar-continer">
        <div className="Progress-bar-desktop">
          <div className="progress-bar">
            <div
              className="progress-bar__indicatior"
              style={{
                width:
                  (this.props.questionPercentage
                    ? this.props.questionPercentage
                    : "0") + "%",
              }}
            ></div>
            <div className="progress-bar__text">
              {" "}
              {this.props.questionPercentage
                ? this.props.questionPercentage
                : "0"}{" "}
              % Completed
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProgressBar;
