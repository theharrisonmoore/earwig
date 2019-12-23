import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-virtualized-select";

import withSelect from "./withSelect";

// import "react-select/dist/react-select.css";
// import "react-virtualized-select/styles.css";

class ReactSelect extends Component {
  filterOption = ({ label }, searchWord) =>
    label.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0;

  render() {
    const { options, placeholder, addHandler, value } = this.props;
    return (
      <Select
        placeholder={placeholder}
        options={options.map(item => ({
          ...item,
          value: item._id,
          label: item.name,
        }))}
        selectComponent={CreatableSelect}
        filterOption={this.filterOption}
        onCreateOption={addHandler}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        value={value}
        // styles={{ menu: base => ({ ...base, position: "relative" }) }}
        onChange={this.props.handleChange}
      />
    );
  }
}

export default withSelect(ReactSelect);
