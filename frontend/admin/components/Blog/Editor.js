import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Input, } from '@windmill/react-ui'

import "react-quill/dist/quill.snow.css";
import "../../assets/css/quill.scss";

const Editor = () => (
  <Card className="mb-3">
    <CardBody>
      <form className="add-new-post">
        <Input className="mb-1" placeholder="Your post title" />
        <ReactQuill className="add-new-post__editor mb-1" />
      </form>
    </CardBody>
  </Card>
);

export default Editor;
