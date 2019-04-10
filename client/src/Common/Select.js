/**
 * select html tag with multi options
 * to use pass in props:
 * @param { string } label -select label - optional
 * @param { array of objects } options - @example [{value: 10, label: "ten"}]
 * @param { strin } placeholder - optional
 * @param { function } handleChange - reqiured
 * @param { any } value - reqired - the value from state
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 0.25rem;
`;

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: 0
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    color: "#818181",
    fontSize: "1rem",
    textAlign: "left",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  width: "100%",
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

class CustomizedSelects extends React.Component {
  render() {
    const {
      classes,
      options,
      label,
      placeholder,
      handleChange,
      value
    } = this.props;

    console.log(this.props);

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl} fullWidth={true}>
          {label && (
            <Label htmlFor={`${label}-customized-select`}>{label}</Label>
          )}
          <Select
            value={value}
            onChange={handleChange}
            name={label}
            displayEmpty
            className={classes.selectEmpty}
            input={
              <BootstrapInput name={label} id={`${label}-customized-select`} />
            }
          >
            {placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {options &&
              options.map(item => (
                <MenuItem value={item.value} key={item.value + item.label}>
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(CustomizedSelects);
