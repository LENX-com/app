import React from "react";
import { Card, CardBody } from '@windmill/react-ui'
import { MdFlag, MdVisibility, MdPermContactCalendar, MdDone, MdSave, MdPublish } from "react-icons/md";

const SidebarAction = ({ title }) => (
  <Card>
    <CardBody className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardBody>

    <CardBody className="p-0">
      <div>
        <div className="p-3">
          <span className=" flex mb-2">
            <MdFlag />
            <strong className="mr-1">Status:</strong> Draft{" "}
            <a className="ml-auto" href="#div">
              Edit
            </a>
          </span>
          <span className=" flex mb-2">
            < MdVisibility />
            <strong className="mr-1">Visibility:</strong>{" "}
            <strong className="text-success">Public</strong>{" "}
            <a className="ml-auto" href="#div">
              Edit
            </a>
          </span>
          <span className="flex mb-2">
            <MdPermContactCalendar />
            <strong className="mr-1">Schedule:</strong> Now{" "}
            <a className="ml-auto" href="#div">
              Edit
            </a>
          </span>
          <span className=" flex">
            <MdDone />
            <strong className="mr-1">Readability:</strong>{" "}
            <strong className="text-warning">Ok</strong>
          </span>
        </div>
        <div className="d-flex px-3 border-0">
          <button outline theme="accent" size="sm">
            <MdSave /> Save Draft
          </button>
          <button theme="accent" size="sm" className="ml-auto">
            <MdPublish /> Publish
          </button>
        </div>
      </div>
    </CardBody>
  </Card>
);

export default SidebarAction;
