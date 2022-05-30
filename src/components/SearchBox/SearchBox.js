import React, { Component } from "react";
import "./SearchBox.css";
import { connect } from "react-redux";
import { remoteData } from "../../redux/actions/actions";
class SearchBox extends Component {
  state = {
    searchLine: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };
  render() {
    const { searchLine } = this.state;
    const { remoteData } = this.props;
    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            onClick={() => remoteData(searchLine)}
            disabled={!searchLine}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    remoteData: (search) => {
      dispatch(remoteData(search));
    },
  };
};
export default connect(null, mapDispatchToProps)(SearchBox);
