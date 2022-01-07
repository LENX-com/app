import React from "react";
import PageTitle from '../components/Typography/PageTitle'
import Editor from "../components/Blog/Editor";
import SidebarAction from "../components/Blog/SidebarAction";
import SidebarCategories from "../components/Blog/SidebarCategories";

const AddNewPost = () => (
  <div className="container grid px-6 mx-auto">
    {/* Page Header */}
    <div  className="page-header py-4">
      <PageTitle>
          Add new post
      </PageTitle>
    </div>

    <div className=" flex ">
      {/* Editor */}
      <div className=" mr-4 w-3/4 ">
        <Editor />
      </div>

      {/* Sidebar Widgets */}
      <div className= " ">
        <SidebarAction title= "Edit post "/>
        <SidebarCategories />
      </div>
    </div>
  </div>
);

export default AddNewPost;
