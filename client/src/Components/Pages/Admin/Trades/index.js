import React, { Component } from "react";
import axios from "axios";

import { Table, Input, Button, Popconfirm, Form, Icon, message, Select } from "antd";


// styles 
import { AddTradeWrapper, AddTradeTitle } from "./Trades.style.js"

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Trade",
        dataIndex: "trade",
        width: "30%",
        editable: true
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button ghost type="danger">
                <Icon type="delete" style={{ color: "red" }} />
              </Button>
            </Popconfirm>
          ) : null
      }
    ];

    this.state = {
      dataSource: [],
      count: 2,
      newTrades: []
    };
  }
  // end of constuctor

  componentDidMount() {
    this.fetchTrades();
  }

  fetchTrades = () => {
    axios
      .get("/api/admin/trades")
      .then(res => {
        this.setState({ dataSource: res.data });
      })
      .catch(err => {
        const error =
          err.response && err.response.data && err.response.data.error;
        message.error(error || "Something went wrong");
      });
  };

  handleDelete = key => {
    // delete from db and update
    axios.delete(`/api/admin/trades/${key}`).then(res => {
      this.fetchTrades();
    });
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAddInput = value => {
    this.setState({newTrades: value})
  }

  handleAdd = () => {
    // save to database then update the table
    const { newTrades } = this.state;

    const tradesList = Object.values(newTrades)
    const trades = tradesList.map(trade => {
      const cleanedTrade = trade.toLowerCase().charAt(0).toUpperCase() + trade.slice(1)
      return { title: cleanedTrade }
    })

    axios.post("/api/admin/trades/add", { trades }).then(() => {
      this.fetchTrades()
      this.setState({ newTrades: [] })
      message.success('Trades succesfully added');
    }).catch(err => { 
      const error =
      err.response && err.response.data && err.response.data.error;
    message.error(error || "Something went wrong") 
  })
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource, adding, newTrades } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <AddTradeWrapper>
          <AddTradeTitle>Add new trades:</AddTradeTitle>
          <Select style={{ width: '100%', marginRight: '16px' }} mode="tags" placeholder="Hit enter for each trade" onChange={this.handleAddInput} value={newTrades} /> 
          <Button onClick={this.handleAdd} type="primary">Submit</Button>
        </AddTradeWrapper>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;
