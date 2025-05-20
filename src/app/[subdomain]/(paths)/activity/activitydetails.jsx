import React from "react";
import { Col, Row } from "react-bootstrap";

export default function ActivityDetails(selectedActivity) {
  // console.log(selectedActivity?.actionType, "selectedActivity");
  return (
    <div>
      <Row>
        <Col>
          <div className="grid-item">
            <div className="d-flex ">
              <img
                src={selectedActivity?.userId?.Profile}
                alt=""
                width={"100px"}
                style={{ borderRadius: "50%" }}
                className="m-auto"
              />
            </div>
            <div className="text-center mt-2">
              <p>{selectedActivity?.userId?.userRole}</p>
              <p className="m-auto fw-bold">{`${selectedActivity?.userId?.firstname} ${selectedActivity?.userId?.lastname}`}</p>
              <ul className="list-inline">
                <li>{selectedActivity?.userId?.email}</li>
                <li>{selectedActivity?.userId?.mobile}</li>
                <li>
                  <span className="fw-bold">actionType :</span> <br />
                  {selectedActivity?.actionType}
                </li>
                <li>
                  <span className="fw-bold">description :</span> <br />
                  {selectedActivity?.description}
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
