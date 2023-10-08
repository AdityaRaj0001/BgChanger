import React, { useState, useEffect, useCallback } from "react";

type CaptureImageComponentProps = {
  videoRef: React.RefObject<any>;
  capturedImage: string | null;
  showButtons: boolean;
  handleCaptureClick: () => void;
  handleNextClick: () => void;
  handleRetryClick: () => void;
  handleFileUpload: any
};

const CaptureImageComponent: React.FC<CaptureImageComponentProps> = ({
  capturedImage,
  handleCaptureClick,
  handleNextClick,
  handleRetryClick,
  showButtons,
  videoRef,
  handleFileUpload
}) => {
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [flashlightOn, setFlashlightOn] = useState(false);

  const videoConstraints = {
    facingMode,
    aspectRatio: 1 / 1.5,
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  };

  const toggleFlashlight = useCallback(() => {
    if (videoRef.current) {
      const track = videoRef.current.srcObject?.getTracks()[0];
      if (track && track.kind === "video") {
        const capabilities = (track.getCapabilities() as any) || {};
        if ("torch" in capabilities) {
          track.applyConstraints({
            advanced: [{ torch: !flashlightOn }],
          });
          setFlashlightOn(!flashlightOn);
        }
      }
    }
  }, []);

  useEffect(() => {
    let stream: any = null;
    navigator.mediaDevices
    .getUserMedia({ video: videoConstraints })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach((track: any) => {
          track.stop();
        });
      }
    };
  }, [videoConstraints]);

  return (
    <div className="flex-1 w-full flex justify-center items-center flex-col self-center">
      {!capturedImage && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="border rounded-3xl mt-4"
        />
      )}
      {capturedImage && (
        <div className="flex flex-col items-center">
          <img
        src={capturedImage}
        alt="Captured"
        className="rounded-3xl mb-4"
        style={{ width: "50%", }}
          />
          {showButtons && (
            <div className="flex gap-10">
              <button
                className="mt-4 py-2 px-6 bg-red-400 text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
                onClick={handleRetryClick}
              >
                Retry
              </button>
              <button
                className="mt-4 py-2 px-6 bg-black text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      {!capturedImage && (
        <div className="flex justify-center items-center gap-2 flex-col">
           <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="imageUploadInput"
          />
          <label
            htmlFor="imageUploadInput"
            className="mt-4 py-2 px-4 bg-gray-700 text-white rounded-3xl text-xl font-semibold relative overflow-hidden cursor-pointer"
          >
            Upload Image
          </label>
          <div className="flex justify-center items-center flex-row gap-5">
            <button
              className="mt-4 py-2 px-4 bg-gray-700 text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
              onClick={() => {
                setFacingMode(facingMode === "user" ? "environment" : "user");
              }}
            >
              Toggle Camera
            </button>
            <button
              className="mt-4 py-2 px-4 bg-gray-700 text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
              onClick={toggleFlashlight}
            >
              {flashlightOn ? "Off Flashlight" : "On Flashlight"}
            </button>
          </div>
          <button
            className="mt-4 py-2 px-6 bg-black text-white rounded-full text-2xl font-semibold relative overflow-hidden"
            onClick={handleCaptureClick}
          >
            Capture
          </button>
        </div>
      )}
    </div>
  );
};

export default CaptureImageComponent;
