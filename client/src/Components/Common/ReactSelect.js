import React, { Component } from "react";
import { components } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";

import withSelect from "./withSelect";
import Icon from "./Icon/Icon";

import { colors } from "../../theme";

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        icon="search"
        height="19px"
        width="19px"
        className="selectIcon"
        color={colors.dustyGray1}
      />
    </components.DropdownIndicator>
  );
};

class ReactSelect extends Component {
  filterColors = inputValue => {
    return this.props.options
      .filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
      .map(item => ({
        ...item,
        value: item._id,
        label: item.name,
      }));
  };

  promiseOptions = inputValue => {
    return new Promise(resolve => {
      resolve(this.filterColors(inputValue));
    });
  };

  render() {
    const { placeholder, addHandler, value } = this.props;

    return (
      <AsyncCreatableSelect
        placeholder={placeholder}
        onCreateOption={addHandler}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        value={value}
        components={{ DropdownIndicator, IndicatorSeparator: null }}
        styles={{ menu: base => ({ ...base, position: "relative" }) }}
        onChange={this.props.handleChange}
        loadOptions={this.promiseOptions}
        cacheOptions
        menuIsOpen={this.props.open}
        closeMenuOnScroll
        noOptionsMessage={() => (value ? null : "Input to search")}
        // keep this dummy function to auto clear the input value on blur
        onInputChange={() => {}}
      />
    );
  }
}

export default withSelect(ReactSelect);
