import React from "react";
import "./styles/index.css";
import App from "./App";
import SocketProvider from "./SocketProvider";

const ChatApp = () => {
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      var getUserMedia =
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!getUserMedia) {
        return Promise.reject(
          new Error("getUserMedia is not implemented in this browser")
        );
      }
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }
  return (
    <>
      <SocketProvider>
        <App />
      </SocketProvider>
    </>
  );
};

export default ChatApp;
