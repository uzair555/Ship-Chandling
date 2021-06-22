import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="bg-overlay"></div>
            <div className="d-flex h-100 flex-column">
              <div className="py-5 px-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
