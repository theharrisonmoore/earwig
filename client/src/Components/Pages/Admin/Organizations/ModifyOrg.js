import React, { Component } from "react";
import axios from "axios";

// import { Table, Modal, message, Input, Icon, Button } from "antd";

import { Select, message, Button, Transfer, Tree } from "antd";

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
    dropDownSelection: [],
    reviewsTargetKeys: [],
    reviewsSelection: [],
    reviewsData: [],

    treeData: [],
    targetKeys: []
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.fetchData();
    }
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
  renderSelectField = (placeholder, orgArray) => (
    <Select
      showSearch
      style={{ width: 400 }}
      placeholder={`${placeholder}`}
      optionFilterProp="children"
      onChange={this.setOrgs}
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
  setOrgs = e => {
    // const orgDetails = {
    //   key: this.state.data[e]._id,
    //   title: `${this.state.data[e].name} - ${this.state.data[e].category} - ${this.state.data[e]._id}`
    // };

    // !! need to not concat it but exchange it every time or re-select
    this.setState({
      dropDownSelection: [...this.state.dropDownSelection, this.state.data[e]]
    });
  };

  // fills transfer data (reviews, comments)
  handleClick = async () => {
    // const { dropDownSelection } = this.state;
    // if (dropDownSelection.length === 2) {
    //   this.setState({
    //     targetKeys: [
    //       ...this.state.targetKeys,
    //       this.state.dropDownSelection[this.state.dropDownSelection.length - 1]
    //         .key
    //     ]
    //   });
    // }

    const orgID1 = this.state.dropDownSelection[0]._id;
    const orgID2 = this.state.dropDownSelection[1]._id;

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
        const reviewsTargetKeys = [];

        const reviewsSelection = [];
        const reviewChildren = [];

        // length = 2
        for (let i = 0; i < allReviews.length; i++) {
          console.log("i", i);
          console.log("allReviews[i", allReviews[i]);
          console.log("allReviews[i].length", allReviews[i].length);

          // check if there are reviews for that company
          if (allReviews[i].length > 0) {
            const reviews = {
              key: i,
              title: `reviews ${this.state.dropDownSelection[0]._id}`,
              children: reviewChildren
            };
            console.log("full reviews", reviews);
            // fill childrens array with single reviews
            for (let j = 0; j < allReviews[i].length; j++) {
              const singleReview = {
                key: allReviews[i][j]._id,
                title: allReviews[i][j]._id
              };
              console.log("singleReview", singleReview);
              reviewChildren.push(singleReview);
            }
            reviewsSelection.push(reviews);
          }
          if (allReviews[i].length === 0) {
            const noReviews = {
              key: i,
              title: "no reviews yet"
            };
            console.log("no review", noReviews);
            reviewsSelection.push(noReviews);
          }
          console.log("reviews", reviewsSelection);
          // return reviewsSelection;
        }
        // set state
        this.setState({
          treeData: reviewsSelection
          // targetKeys: [...this.state.targetKeys, reviewsTargetKeys]
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  };

  renderReview = item => {
    console.log(item);
    const customLabel = item.content.map(e => (
      <span className="custom-item">
        <li>
          {e.rate}, {e.overallReview.text}
        </li>
      </span>
    ));

    return {
      label: customLabel
      // value: item.content
    };
  };
  onChange = targetKeys => {
    console.log("Target Keys:", targetKeys);
    this.setState({ targetKeys });
  };
  render() {
    // const { category } = this.props;
    const { data } = this.state;

    console.log("treeData", this.state.treeData);

    return (
      <div>
        <h3>Source</h3>
        {this.renderSelectField("select first option", data)}
        <h3>Target</h3>
        {this.renderSelectField("select second option", data)}

        <Button onClick={this.handleClick}>click</Button>
        {/* review transfer section */}
        {this.state.treeData.length > 0 && (
          <TreeTransfer
            dataSource={this.state.treeData}
            targetKeys={this.state.targetKeys}
            onChange={this.onChange}
          />
          // <Transfer
          //   dataSource={this.state.reviewsSelection}
          //   targetKeys={this.state.reviewsTargetKeys}
          //   // titles={[
          //   //   `${this.state.orgSelection[0].org.name}`,
          //   //   `${this.state.orgSelection[1].org.name}`
          //   // ]}
          //   listStyle={{
          //     width: 300,
          //     height: 300
          //   }}
          //   render={this.renderReview}
          //   // rowKey={record => record.uid}
          // />
        )}
      </div>
    );
  }
}
