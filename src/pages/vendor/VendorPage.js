import React from "react";
import s from "../tables/static/Static.module.scss";
import {toast} from "react-toastify";
import {Badge, Col, Progress, Row, Table} from "reactstrap";
import Widget from "../../components/Widget";

class VendorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productList: [
                {
                    "product": "Brinjal - 250gm",
                    "quantity": 4,
                    "price": 40,
                    "total": 160
                },
                {
                    "product": "Pineapple - 500gm",
                    "quantity": 2,
                    "price": 240,
                    "total": 480
                },
                {
                    "product": "Carrot - 1Kg",
                    "quantity": 1,
                    "price": 30,
                    "total": 30
                },
                {
                    "product": "Avocado - 1 Pc",
                    "quantity": 4,
                    "price": 140,
                    "total": 560
                },
                {
                    "product": "Brinjal - 250gm",
                    "quantity": 4,
                    "price": 40,
                    "total": 160
                }
            ]
        }
    }

    componentDidMount() {
        toast.success("Thanks for checking out Order PAge!", {
            position: "bottom-right",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    render() {
        return (
            <div className={s.root}>
                <h2 className="page-title">
                    Order - <span className="fw-semi-bold">Information</span>
                    <small>&nbsp;&nbsp;
                        <span className="circle bg-default text-white mr-2">
                                <i className="glyphicon glyphicon-print"/>
                        </span>
                    </small>
                </h2>

                <Row>
                    <Col lg={12} xl={12} xs={12}>
                        <Widget title={<h6> ORDER - <span className="fw-semi-bold">{this.props.location.id}</span></h6>}>
                            <div className="stats-row">
                                <div className="stat-item">
                                    <h6 className="name">Order Date</h6>
                                    <p className="value">
                                        <span className="fw-bold">{new Date().toDateString()}</span>
                                    </p>
                                </div>
                                <div className="stat-item">
                                    <h6 className="name">Payment method</h6>
                                    <p className="value">
                                        <span className="fw-bold">PAYU</span>
                                    </p>
                                </div>
                                <div className="stat-item">
                                    <h6 className="name">Order Status</h6>
                                    <p className="value">
                                        <span className="fw-bold">Processing</span>
                                    </p>
                                </div>
                                <div className="stat-item">
                                    <h6 className="name">Payment Status</h6>
                                    <p className="value">
                                        <span className="fw-bold">Paid</span>
                                    </p>
                                </div>
                            </div>
                            <div className={s.overFlow}>
                                <Table className="table-active">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Cost</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    {/* eslint-disable */}
                                    <tbody>
                                    {this.state.productList.map((row, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{row.product}</td>
                                            <td>{row.quantity}</td>
                                            <td>Rs {row.price} /-</td>
                                            <td>Rs {row.total} /-</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    {/* eslint-enable */}
                                </Table>
                            </div>
                            {/*<Progress*/}
                            {/*    color="gray"*/}
                            {/*    value="100"*/}
                            {/*    className="bg-subtle-blue progress-xs"*/}
                            {/*/>*/}

                            <div className={s.overFlow}>
                                <Table className="table-responsive">
                                    <tbody>
                                    <tr>
                                        <td align={"center"}>Total :</td>
                                        <td align={"right"}>Rs 1390 /-</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                            {/*<p>*/}
                            {/*    <small>*/}
                            {/*  <span className="circle bg-default text-white mr-2">*/}
                            {/*    <i className="fa fa-chevron-up"/>*/}
                            {/*  </span>*/}
                            {/*    </small>*/}
                            {/*    <span className="fw-semi-bold">&nbsp;17% higher</span>*/}
                            {/*    &nbsp;than last month*/}
                            {/*</p>*/}
                        </Widget>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default VendorPage;
