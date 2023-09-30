import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

function App() {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleimageinput = (e) => {
    
    const file = e.target.files[0];
    setImage(file);
  };

  const handlepromptchange = (e) => {
    setPrompt(e.target.value);
  };

  const handlestepchange = () => {
    setStep(step + 1);
  };

  const retry = () => {
    setStep(1);
    setPrompt("");
    setImage(null);
    setImageurl("");
  };

  const download=()=>{
    if(imageurl){
      saveAs(imageurl,"bgChanger.png")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStep(step + 1);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("negativePrompt", "blurry, dark");
      formData.append("imageFile", image);

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
      setImageurl(url);
    } catch (error) {
      console.error("API request failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container min-h-screen h-auto w-auto flex flex-col  gap-20">
        <h1 className="app_title text-center text-4xl  pt-5">
          Background Changer
        </h1>

        {step === 1 && (
          <div className="prompt_card w-[80%] h-1/6 flex  items-center justify-center gap-2 mx-auto">
            <input
              className="prompt_input w-full text-bold border-black border-2 sm:w-[300px] h-[30px] p-5 "
              value={prompt}
              onChange={handlepromptchange}
              placeholder="Describe your background"
            ></input>
            <button
              className="border-black bg-blue-300 p-5 h-[30px] flex items-center border-2 rounded-sm "
              onClick={handlestepchange}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="imageselectorcontainer w-full mx-auto flex items-end justify-start">
            <div className="imageinput w-3/5 pl-6 flex flex-col gap-16 sm:justify-center items-center  border-slate-50 ">
              <h1 className="imageselectortitle text-xl sm:text-2xl w-3/5 ">
                Choose your Image :-
              </h1>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleimageinput}
                className="text-sm w-3/5 sm:text-xl"
              ></input>
            </div>

            <button
              className=" w-[25%] p-4 ml-5 border-black bg-blue-300  h-[30px] flex items-center justify-center border-2 rounded-sm  sm:h-[50px] text-lg"
              onClick={handleSubmit}
            >
              Generate
            </button>
          </div>
        )}

        {step === 3 && (
          <>
            {loading && (
              <div className=" text-center text-xl sm:text-2xl">Loading..</div>
            )}

            {!loading && imageurl !== "" && (
              <div className="flex w-full flex-col mx-auto gap-5 items-center">
                <div className="resultdisplaycontainer  w-[90%]  flex flex-col gap-5 items-center">
                  <h2 className="text-lg md:text-2xl font-semibold w-full max-w-[300px]">Response Image:</h2>
                  <img className="w-full max-w-[300px]" src={imageurl}></img>
                </div>
                <div className="flex gap-16">

                <button className="text-xl sm:text-2xl bg-blue-300 border-slate-700 border-4 p-4  hover:bg-blue-500" onClick={download}>Download</button>
                <button className=" text-xl sm:text-2xl bg-blue-300 border-slate-700 border-4 p-4 hover:bg-blue-500" onClick={retry}>Retry</button>

                </div>
                
              </div>
            )}
          </>
        )}
        {/* 
{step === 3 && (
        <>
          {loading && <div className="text-lg text-white">Loading...</div>}

          {!loading && imageurl !== "" && (
            
            <div className="flex justify-between items-center">
              <div className="w-2/3">
              <h2 className="text-white mb-10">Response Image : </h2>
              <img className="w-[500px]" src={imageurl}></img>
              </div>
              <div className="w-1/3">
              <button type="submit" onClick={retry} color="primary">
              Retry
          </button>
              </div>
            </div>
              
              
            

          )}
</>
)} */}
      </div>
    </>
  );
}

export default App;
