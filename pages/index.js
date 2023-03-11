import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const [uploadUrl] = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    console.log({uploadUrl});
    setUrl(uploadUrl);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <input
              type="file"
              className="mb-3"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="btn btn-primary mb-3" onClick={uploadToIpfs}>
              Upload
            </button>
            {url && (
              <div className="react-player-wrapper">
                <ReactPlayer
                  url={url}
                  className="react-player"
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
