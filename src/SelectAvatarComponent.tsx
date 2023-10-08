import React, { useState } from "react";
// import image2 from "./assets/Female (1).png";
// import image3 from "./assets/Female (2).png";
// import image4 from "./assets/Female (3).png";
// import image5 from "./assets/Female (4).png";
// import image6 from "./assets/Female (5).png";
// import image7 from "./assets/Female (6).png";
// import image8 from "./assets/Female (7).png";
// import image9 from "./assets/Female (8).png";
// import image13 from "./assets/Male (1).png";
// import image18 from "./assets/Male (7).png";
// import image19 from "./assets/Male (8).png";
// import image20 from "./assets/Male (9).png";
// import image21 from "./assets/Male (10).png";
// import image22 from "./assets/Male (11).png";
// import image28 from "./assets/1.jpeg";
// import image30 from "./assets/2.jpeg";
// import image31 from "./assets/3.jpeg";
// import image32 from "./assets/4.jpeg";
// import image33 from "./assets/5.jpeg";
// import image34 from "./assets/6.jpeg";
// import image35 from "./assets/7.jpeg";

import crickertImage1 from './assets/cricket/1.jpg'
import crickertImage2 from './assets/cricket/2.jpg'
import crickertImage3 from './assets/cricket/3.jpg'
import crickertImage4 from './assets/cricket/4.jpg'
import crickertImage5 from './assets/cricket/5.jpg'
import crickertImage6 from './assets/cricket/6.jpg'
import crickertImage7 from './assets/cricket/7.jpg'
import crickertImage8 from './assets/cricket/8.png'
import crickertImage9 from './assets/cricket/9.jpeg'
import crickertImage10 from './assets/cricket/10.png'

type SelectAvatarComponentProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
};
const SelectAvatarComponent: React.FC<SelectAvatarComponentProps> = ({
  setCount,
  formData,
}) => {
  const images = [
    crickertImage1,
    crickertImage2,
    crickertImage3,
    crickertImage4,
    crickertImage5,
    crickertImage6,
    crickertImage7,
    crickertImage8,
    crickertImage9,
    crickertImage10,
    // image28,
    // image30,
    // image31,
    // image32,
    // image33,
    // image34,
    // image35,
    // image2,
    // image3,
    // image4,
    // image5,
    // image6,
    // image7,
    // image8,
    // image9,
    // image13,
    // image18,
    // image19,
    // image20,
    // image21,
    // image22,
  ];
  const [selected, setSelected] = useState(images[0]);
  const [clicked, setClicked] = useState(false);

  const handleClickGenerate = async () => {
    setClicked(true);
    try {
      const response = await fetch(selected);
      const imageBuffer = await response.arrayBuffer();

      const imageFile = new File([imageBuffer], "image.jpeg", {
        type: "image/jpeg",
      });
      formData.append("target_image", imageFile);

      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="border-dashed flex-1 max-w-[75%] border-black border-2 rounded-3xl p-1">
        <img
          src={selected}
          className="w-full max-h-[35rem] rounded-2xl "
          alt=""
        />
      </div>
      <div
        style={{
          overflow: "scroll", // This will add scrollbars when needed
          // border: "1px solid #ccc",
          flexDirection: "row",
          display: "flex",
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        {images.map((imageUrl, index) => (
          <img
            onClick={() => {
              setSelected(imageUrl);
            }}
            key={index}
            src={imageUrl}
            alt={imageUrl}
            style={{
              height: "6rem", // Adjust image width to your preference
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              borderRadius: "0.5rem",
              opacity: imageUrl === selected ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full gap-10 ">
        <button
          onClick={() => {
            setCount((e) => e - 1);
          }}
          className="mt-4 py-2 px-6 bg-gray-600 text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
        >
          Back
        </button>
        <button
          onClick={() => {
            handleClickGenerate();
          }}
          disabled={clicked}
          className={`mt-4 py-2 px-6 ${
            clicked ? "bg-gray-600" : "bg-black"
          } text-white rounded-3xl text-xl font-semibold relative overflow-hidden`}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default SelectAvatarComponent;
