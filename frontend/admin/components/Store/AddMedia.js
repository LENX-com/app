import React from 'react';
import { AiFillFileImage } from "react-icons/ai";
import {useDropzone} from 'react-dropzone';
import Button from '../../../components/Buttons/Button';

 const AddMedia  = (props) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container p-2 border-box">
      <div {...getRootProps({ className: 'dropzone text-center' })}>
        <input {...getInputProps()} />
        <div clasName="p-2 mx-auto">
            <AiFillFileImage className="my-auto h-12 w-12 m-auto"/>
            <Button className="my-3"> Add Files </Button>
        </div>
        <em className="text-xs text-Black-medium">(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        {/* <h4>Accepted files</h4> */}
        <ul>{acceptedFileItems}</ul>
        {/* <h4>Rejected files</h4> */}
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default AddMedia