import React from "react"

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import './MonthlyEarning.css'

import ApexRadial from "./ApexRadial"

const MonthlyEarning = () => {
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Monthly Earning</CardTitle>
          <Row className="month-style-card">
            <Col sm="5">
              <p className="text-muted">This month</p>
              <h3 className="amount-style">$34,252</h3>
              <p className="text-muted">
                <span className="text-success mr-2">
                  {" "}
                  12% <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                From previous period
              </p>
              <div className="mt-4">
                <Link
                id="btn-month-style"
                  to=""
                  className="btn btn-primary waves-effect waves-light btn-sm"
                >
                  View More <i  className="mdi mdi-arrow-right ml-1"></i>
                </Link>
              </div>
            </Col>
            <Col sm="7">
              <div className="mt-4 mt-sm-0" >
                <ApexRadial/>
              </div>
            </Col>
          </Row>
          <p className="text-muted mt-4 mb-3">
            We craft digital, graphic and dimensional thinking.
          </p>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarning
