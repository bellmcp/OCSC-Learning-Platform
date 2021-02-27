import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ url }: any) {
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
      }}
    >
      <ReactPlayer
        url={url}
        controls
        className="react-player"
        playing
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
