import React from "react";
import VideoPlayer from "../../component/Special/Special";

const page = () => {
  const videoSrc =
    "https://mmd.biananset.net/_v7/a684043aa044e8107434617d8cdd6e0015d1a951b5021410d9f8c4ed9f6bc9a310f88a7887b090f86f0d88fcc3a2853dbddf91a5c7c60a06eea6972cb2007ccc81fabd8919c67a7ac66a949ca89520854378a574810efb51ffbe6bde827ebf1aeec2d5175d0725b486c803aa24cad0ccd40432825db06cd6170adba2c1c3be27/master.m3u8"; // Replace with your video source
  const thumbnailVtt = "https://s.megastatics.com/thumbnails/977facb5dbc425dddc7ea9f435bdc404/thumbnails.vtt"; // Replace with your VTT thumbnail source
  const subtitleTracks = [
    {
      src: "https://s.megastatics.com/subtitle/20ca01dd10956f58a11f3d466c1c11a0/eng-2.vtt",
      srclang: "en",
      label: "English",
      default: true,
    },
    {
      src: "https://cc.zorores.com/20/ca/20ca01dd10956f58a11f3d466c1c11a0/spa-3.vtt",
      srclang: "es",
      label: "Spanish",
    },
  ];
  return (
    <div>
      <VideoPlayer
        videoSrc={videoSrc}
        thumbnailVtt={thumbnailVtt}
        subtitleTracks={subtitleTracks}
      />
    </div>
  );
};

export default page;
