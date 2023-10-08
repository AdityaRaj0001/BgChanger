import React, { useState, useEffect } from "react";
import axios from "axios";
import download from "./assets/download.png";
import QRCode from "react-qr-code";
const PreviewComponent = ({ formData }) => {
  const [image, setImage] = useState("");
  const [qr, setQr] = useState("");

  useEffect(() => {
    const sendFormData = async () => {
      try {
        const response = await axios.post(
            "https://beta-sdk.photoroom.com/v1/instant-backgrounds",
            formData,
            {
              headers: {
                "x-api-key": import.meta.env.VITE_KEY,
                Accept: "application/json",
                "Content-type": "multipart/form-data",
              },
              responseType: "blob",
            }
          );

          const blob = response.data;
          const url = URL.createObjectURL(blob);
          setImage(url);
          // Clear the formData after the request

          formData.delete("prompt");
          formData.delete("negativePrompt")
          // formData.append("file",formData.get("imageFile"))
          formData.delete("imageFile");
          // formData.append("upload_preset","BgchangerGoKapture")
          // const response2=await axios.post("https://api.cloudinary.com/v1_1/dvc9k0yjr/image/upload",formData,{
          //   headers: {
          //     'Content-Type':"multipart/form-data"
          //   },
          // })
          // const data=response2.data
          // console.log(data);
          // setQr(data.secure_url);
          // formData.delete("upload_preset")
          // formData.delete("file")
          
      } catch (error) {
        console.error("Error sending formData:", error);
      }
    };

    // Trigger the formData submission when formData changes
    if (formData.get("imageFile") && formData.get("prompt") && formData.get("negativePrompt")) {
      sendFormData();
    }
  }, [formData]);

  return (
    <div className="flex-1 w-full flex justify-center items-center flex-col">
      <div className="flex-1 max-w-[75%] border-black rounded-3xl p-1 flex justify-center items-center">
        <div className="flex-1 max-w-[75%] p-1 justify-center items-center flex">
          {!image && 
            <img
              src="https://cdnl.iconscout.com/lottie/premium/thumb/loading-shapes-5391802-4514914.gif"
              className="w-full max-h-[35rem] object-contain rounded-3xl "
              alt=""
            />
}

{
  image && <img src={image} className="w-full max-h-[35rem] object-contain rounded-3xl" alt="" />
}

          
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center gap-10 mt-5">
        {/* <button
          onClick={() => {
            if (qr) {
              setQr("");
              return;
            } else {
              setQr(image);
            }
          }}
          className="h-24 w-24 bg-black rounded-full flex justify-center items-center"
        >
          <p className="text-white font-bold text-3xl">QR</p>
        </button> */}
        <button
          onClick={async () => {
            const response = await axios.get(image, {
              responseType: "blob",
            });
            const blob = new Blob([response.data], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "Bgchanger.jpeg";
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="h-24 w-24 bg-black rounded-full flex justify-center items-center "
        >
          <img src={download} className="h-14 w-14" />
        </button>
      </div>
      <button
        onClick={() => {
          window.location.reload();
          formData.delete("imageFile");
          formData.delete("prompt");
          formData.delete("negativePrompt")
        }}
        className="mt-4 py-2 px-6 bg-black text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
      >
        Re Generate
      </button>
    </div>
  );
};

export default PreviewComponent;
