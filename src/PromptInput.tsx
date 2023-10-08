import React, { useState } from "react";

const PromptInput = ({formData,setCount}) => {

    const [prompt, setPrompt] = useState("");
    const [clicked, setClicked] = useState(false);

    const handlepromptchange = (e) => {
        setPrompt(e.target.value);
      };


      const handlecopy = (e) => {
        setPrompt(e.target.textContent);
      };  

      const handleClickGenerate=()=>{
        setClicked(true);
        formData.append("prompt", prompt);
        formData.append("negativePrompt", "blurry, dark");

        setCount((prevCount) => prevCount + 1);
        
      }


  return (
    <>
    
    <div className="prompt_card w-[80%] h-1/6 flex  items-center justify-center gap-2 mx-auto">
    <input
      className="prompt_input w-full text-bold border-black border-2 sm:w-[300px] h-[30px] p-5 "
      value={prompt}
      onChange={handlepromptchange}
      placeholder="Describe your background"
    ></input>
    <button
      className="border-black bg-blue-300 p-5 h-[30px] flex items-center border-2 rounded-sm "
      onClick={handleClickGenerate}
      disabled={clicked}
    >
      Generate
    </button>
  </div>
  <div className="flex flex-col w-full gap-10">
    <p className="text-center text-2xl font-semi-bold">Click to Copy!</p>
    <div className="w-[90%] mx-auto flex flex-wrap justify-between text-sm ">
      <div className="bg-blue-400 w-[30%] p-2  h-auto text-[15px] hover:cursor-pointer">
        <p onClick={handlecopy}>
          New York City, UltraHigh quality, Sunlight,Street Photography.
        </p>
      </div>
      <div className="bg-blue-400 w-[30%] p-2  h-auto text-[15px] hover:cursor-pointer">
        <p onClick={handlecopy}>
          Game of Thrones, Medieval Castles, Epic Fantasy.
        </p>
      </div>
      <div className="bg-blue-400 w-[30%] p-2  h-auto text-[15px] hover:cursor-pointer">
        <p onClick={handlecopy}>
          Japanese city street, Tokyo, UltraHigh quality, NightTime,
          CityLights
        </p>
      </div>
    </div>
  </div>
  </>
    
  )
}

export default PromptInput