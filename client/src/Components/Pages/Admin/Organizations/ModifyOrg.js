import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
// import { Table, Modal, message, Input, Icon, Button } from "antd";

import { Select, message, Button, Transfer, Tree, Alert } from "antd";

const { Option } = Select;
const { TreeNode } = Tree;

const isChecked = (selectedKeys, eventKey) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({ children, ...props }) => (
    <TreeNode {...props} disabled={checkedKeys.includes(props.key)}>
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
  const transferDataSource = [];
  function flatten(list = []) {
    list.forEach(item => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === "left") {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={(
                _,
                {
                  node: {
                    props: { eventKey }
                  }
                }
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
              onSelect={(
                _,
                {
                  node: {
                    props: { eventKey }
                  }
                }
              ) => {
                onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        }
      }}
    </Transfer>
  );
};

export default class AllOrganizations extends Component {
  state = {
    data: [],
    fetching: false,
    dropDownOrg1: null,
    dropDownOrg2: null,
    reviewsSelection: [],
    treeData: [],
    targetKeys: []
  };

  componentDidMount() {
    this.fetchData();
  }

  // gets all organisations
  fetchData = () => {
    const { category } = this.props;
    axios
      .get(`/api/admin/organizations/${category}`)
      .then(({ data }) => {
        this.setState({ data, fetching: true });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
        this.fetchData();
      });
  };

  // renders input dropdowns
  renderSelectField = (placeholder, orgArray, setOrgFn) => (
    <Select
      showSearch
      style={{ width: 400 }}
      placeholder={`${placeholder}`}
      optionFilterProp="children"
      onChange={setOrgFn}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {orgArray.map((d, i) => (
        <Option key={d.name} value={i}>
          {d.name}
        </Option>
      ))}
    </Select>
  );

  // puts selected organisations into state
  setOrg1 = e => {
    this.setState({
      dropDownOrg1: this.state.data[e]
    });
  };

  setOrg2 = e => {
    this.setState({
      dropDownOrg2: this.state.data[e]
    });
  };

  // fills transfer data (so far only reviews)
  handleClick = async () => {
    const { dropDownOrg1, dropDownOrg2 } = this.state;

    const orgID1 = dropDownOrg1._id;
    const orgID2 = dropDownOrg2._id;

    // get reviews
    const apiCall1 = () =>
      axios.get(`/api/admin/organizations/reviews/${orgID1}`);
    const apiCall2 = () =>
      axios.get(`/api/admin/organizations/reviews/${orgID2}`);
    const allReviews = [];

    // update reviews state
    axios
      .all([apiCall1(), apiCall2()])
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          allReviews.push(result[i].data);
        }

        // edit reviews state
        const reviewsSelection = [];
        const reviewChildren1 = [];
        const reviewChildren2 = [];

        for (let i = 0; i < allReviews.length; i++) {
          const setTitle = number =>
            number === 0
              ? `Reviews: ${dropDownOrg1.name}`
              : `Reviews: ${dropDownOrg2.name}`;

          const setChildren = number =>
            number === 0 ? reviewChildren1 : reviewChildren2;

          // check if there are reviews for that organisation
          if (allReviews[i].length > 0) {
            const reviews = {
              key: i,
              title: setTitle(i),
              children: setChildren(i)
            };

            // fill childrens array with single reviews
            for (let j = 0; j < allReviews[i].length; j++) {
              const singleReview = {
                key: allReviews[i][j]._id,
                title: `Rating: ${allReviews[i][j].rate}, Created: ${moment(
                  allReviews[i][j].createdAt
                ).format("DD-MM-YYYY")}`
              };
              setChildren(i).push(singleReview);
            }
            reviewsSelection.push(reviews);
          }
          if (allReviews[i].length === 0) {
            const noReviews = {
              key: i,
              title: "no reviews yet"
            };

            reviewsSelection.push(noReviews);
          }
        }
        // set state
        this.setState({
          treeData: reviewsSelection
        });
      })
      .catch(err => console.log(err));
  };

  deleteSelection = () => {
    window.location.reload();
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  };

  onChange = targetKeys => {
    console.log("Target Keys:", targetKeys);
    this.setState({ targetKeys });
  };

  render() {
    // const { category } = this.props;
    const {
      data,
      dropDownOrg1,
      dropDownOrg2,
      treeData,
      targetKeys
    } = this.state;

    return (
      <div>
        <h3>Select First Organisation</h3>
        {this.renderSelectField("select first option", data, this.setOrg1)}
        <h3>Select Second Organisation</h3>
        {this.renderSelectField("select second option", data, this.setOrg2)}
        <h3>Reload Data</h3>
        <Button onClick={this.deleteSelection}>Reset</Button>
        {dropDownOrg1 && dropDownOrg2 && treeData.length === 0 && (
          <Button onClick={this.handleClick}>Load Data</Button>
        )}
        {dropDownOrg1 && dropDownOrg2 && dropDownOrg1 === dropDownOrg2 && (
          <Alert
            type="error"
            description="Can't load same organisations. Please Reload"
          />
        )}
        {/* review transfer section */}
        {treeData.length > 0 &&
          dropDownOrg1 &&
          dropDownOrg2 &&
          dropDownOrg1 !== dropDownOrg2 && (
            <TreeTransfer
              dataSource={treeData}
              targetKeys={targetKeys}
              onChange={this.onChange}
              titles={["Source", "Target"]}
            />
          )}
      </div>
    );
  }
}
