import React from "react";
import s from "../tables/static/Static.module.scss";
import {toast} from "react-toastify";
import {Badge, Col, Progress, Row, Table} from "reactstrap";
import Widget from "../../components/Widget";
import easyinvoice from 'easyinvoice';

class OrderPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderInfo: {
                order: ""
            },
            orderProductList: [],
            invoiceBase64: ""
        }
    }

    async createInvoice() {
        //See documentation for all data properties
        const data = this.getSampleData();
        const result = await easyinvoice.createInvoice(data);
        this.setState({
            invoiceBase64: result.pdf
        });
    }

    async downloadInvoice() {
        //See documentation for all data properties
        const data = this.getSampleData();
        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download('myInvoice.pdf', result.pdf);
    }

    async renderInvoice() {
        //See documentation for all data properties
        document.getElementById("pdf").innerHTML = "loading...";
        const data = this.getSampleData();
        const result = await easyinvoice.createInvoice(data);
        easyinvoice.render('pdf', result.pdf);
    }

    async componentDidMount() {
        const response =
//            await fetch('http://ec2-3-143-232-87.us-east-2.compute.amazonaws.com:8080/order/' + this.props.location.id)
            await fetch('http://localhost:8080/order/' + 29)
        const resp = await response.json()
        const orderInfo = resp.order
        const productList = resp.orderProductList
        this.setState({orderInfo: orderInfo, orderProductList: productList})
    }

    getSampleData() {
        return {
            //"documentTitle": "RECEIPT", //Defaults to INVOICE

            //"locale": "de-DE",
            //Defaults to en-US. List of locales: https://datahub.io/core/language-codes/r/3.html

            "currency": "INR",
            //Defaults to no currency. List of currency codes: https://www.iban.com/currency-codes

            "taxNotation": "gst", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://jf-images-website.s3.ap-south-1.amazonaws.com/JF.png", //or base64
//            "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64
            "sender": {
                "company": "Jeevamrut",
                "address": "2-131, Engineers Enclave",
                "zip": "500050",
                "city": "Chandanagar",
                "country": "Hyderabad",
                "custom1": "MMTS Main road",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "client": {
                "company": "Client Corp",
                "address": "Clientstreet 456",
                "zip": "4567 CD",
                "city": "Clientcity",
                "country": "Clientcountry"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            "invoiceNumber": "2021.0001",
            "invoiceDate": new Date().toDateString(),
            "products": [
                {
                    "quantity": "2",
                    "description": "Test1",
                    "tax": 6,
                    "price": 33.87
                },
                {
                    "quantity": "4",
                    "description": "Test2",
                    "tax": 21,
                    "price": 10.45
                }
            ],
            "bottomNotice": "Kindly pay your invoice within 15 days.",
            // Used for translating the headers to your preferred language
            // Defaults to English. Below example is translated to Dutch
            // "translate": {
            //     "invoiceNumber": "Factuurnummer",
            //     "invoiceDate": "Factuurdatum",
            //     "products": "Producten",
            //     "quantity": "Aantal",
            //     "price": "Prijs",
            //     "subtotal": "Subtotaal",
            //     "total": "Totaal"
            // }
        };
    }

    render() {
        const orderVal = this.state.orderInfo ? this.state.orderInfo : null;
        const productList = this.state.orderProductList ? this.state.orderProductList : null;
        console.log(productList);
        let sum = 0;
        if (productList != null && productList !== {}) {
            productList.forEach(p => {
                sum = p.total + sum;
            })
        }
        console.log(sum);

        return (
            <div className={s.root}>
                <h2 className="page-title">
                    Order - <span className="fw-semi-bold">Information</span>
                    <small>&nbsp;&nbsp;
                        <span className="circle bg-default text-white mr-2">
                            <button onClick={() => this.downloadInvoice()}>
                                <i className="glyphicon glyphicon-print"/>
                            </button>
                        </span>
                    </small>
                </h2>
                <Row>
                    <Col lg={12} xl={12} xs={12}>
                        <Widget
                            title={<h6> ORDER - <span className="fw-semi-bold">{this.props.location.id}</span></h6>}>
                            {this.state.orderInfo != null ?
                                <div className="stats-row">
                                    <div className="stat-item">
                                        <h6 className="name">Order Date</h6>
                                        <p className="value">
                                            {/*<span className="fw-bold">{new Date().toDateString()}</span>*/}
                                            <span className="fw-bold">{orderVal.createdAt}</span>
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
                                </div> : ""}
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
                                    {(productList != null && productList !== {}) ? productList.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row.vendorProduct.product.detail}</td>
                                            <td>{row.quantity}</td>
                                            <td>Rs {row.vendorProduct.product.price} /-</td>
                                            <td>Rs {row.total} /-</td>
                                        </tr>
                                    )) : ""}
                                    </tbody>
                                    {/* eslint-enable */}
                                </Table>
                            </div>
                            {/*<Progress*/}
                            {/*    color="gray"*/}
                            {/*    value="100"*/}
                            {/*    className="bg-subtle-blue progress-xs"*/}

                            <div className={s.overFlow}>
                                <Table className="table-responsive">
                                    <tbody>
                                    <tr>
                                        <td align={"center"}>Total :</td>
                                        <td align={"right"}>{sum} /-</td>
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

export default OrderPage;
