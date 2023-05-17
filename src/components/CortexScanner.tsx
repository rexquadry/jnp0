import React, { useEffect, useRef, useState } from "react";
import * as CortexDecoder from "cortexdecoder_web";
import { ChildProps } from "../types/child-prop.type";

// const beep = new Audio("/assets/audio/jumpnpass-store-scanner-beep.mp3");

// function CortexScanner({ duplicateDelay = 3000, handleSubmitBarcode }) {

const CORTEX_KEY = import.meta.env.VITE_CORTEX_KEY;
const CortexScanner: React.FC<any> = ({
	duplicateDelay = 3000,
	handleSubmitBarcode,
	...rest
}) => {
	const videoRef = useRef(null);
	const [cameraIsRunning, setCameraIsRunning] = useState(false);
	const [canScan, setCanScan] = useState(true);

	useEffect(() => {
		/* if (!haveInitialized) {
			setHaveInitialized(true);

			init();
		} */
		init();

		return () => {
			console.log("It gets called");
			try {
				// stopScanner("scanner component");
			} catch (error) {
				console.error("problem stopping camera: ", error);
			}
		};
	}, []);

	const init = async () => {
		// keep trying until we can init the library
		await CortexDecoder.CDDecoder.init("/assets/cortexScan");
		try {
			await CortexDecoder.CDLicense.activateLicense(CORTEX_KEY);
			console.log("CDDevice:", CortexDecoder.CDDevice);
			CortexDecoder.CDDevice.audio = true;
		} catch (error) {
			console.error(error);
		}

		startScanner({});
	};

	const startScanner = async (callback) => {
		if (!cameraIsRunning) {
			try {
				await CortexDecoder.CDCamera.init();
			} catch (err) {
				console.log("Ask for camera permission");
				return;
			}

			const cameras = await CortexDecoder.CDCamera.getConnectedCameras();
			if (cameras.length > 0) {
				await setCamera(cameras[0].label);
			} else {
				resultCallback("", "", "No camera available");
				return;
			}

			await startCamera();
			await startCameraPreview();
		} else {
			console.log("Camera is not running. Ask for camera permission");
		}
	};

	const setCamera = async (cameraLabel) => {
		try {
			if (isMobile()) {
				CortexDecoder.CDCamera.setCameraPosition("BACK");
			} else {
				await CortexDecoder.CDCamera.setCamera(cameraLabel);
			}
		} catch (err) {
			resultCallback("", "", err);
		}
	};

	const startCamera = async () => {
		try {
			await CortexDecoder.CDCamera.startCamera();
		} catch (err) {
			resultCallback("", "", err);
		}
	};

	const startCameraPreview = async () => {
		let screenOrient: any = {};

		try {
			setDuplicateFilterDuration(duplicateDelay);
			await CortexDecoder.CDCamera.startPreview(getResult);
			if (iPhoneorMac()) {
				if (!window.orientation) {
					if (window.innerWidth > window.innerHeight) {
						screenOrient.orient = "landscape";
					} else {
						screenOrient.orient = "portrait";
					}
				} else {
					screenOrient.angle = window.orientation;
				}
			} else {
				/* screenOrient.orient =
					screen.orientation.type ||
					screen.mozOrientation ||
					screen.msOrientation;
				screenOrient.angle = screen.orientation.angle; */
			}
		} catch (err) {
			resultCallback("", "", err);
		}
	};

	const stopCamera = async () => {
		try {
			await CortexDecoder.CDCamera.stopCamera();
		} catch (err) {
			resultCallback("", "", err);
		}
	};

	const stopScanner = async (page = "") => {
		// if (isCameraRunning) {
		stopCamera();
		// stopCameraPreview()

		// isCameraRunning = false;
		// }
	};

	const stopCameraPreview = async () => {
		try {
			// await CortexDecoder.CDCamera.stopPreview();
			CortexDecoder.setDecoding(false);
		} catch (err) {
			resultCallback("", "", err);
		}
	};

	const setDuplicateFilterDuration = (duration: number) => {
		try {
			CortexDecoder.CDDecoder.setDuplicateDelay(duration);
		} catch (err) {
			resultCallback("", "", err);
		}
	};

	/* const setCameraasync = (cameraLabel) => {
		try {
			if (isMobile()) {
				CortexDecoder.CDCamera.setCameraPosition("BACK");
			} else {
				await CortexDecoder.CDCamera.setCamera(cameraLabel);
			}
		} catch (err) {
			resultCallback("", "", err);
		}
	}; */

	const getResult = (result) => {
		try {
			if (result !== undefined && result.results.length > 0) {
				const curScan = result.results[0];
				const serial = curScan.barcodeData;
				const symbology = curScan.symbologyName;
				// report to the listener
				resultCallback(serial, symbology, null);
				console.log(serial, symbology);
				console.log(CortexDecoder.CDDevice);
				handleSubmitBarcode({ serial, symbology });
				/* try {
					playBeep();
				} catch (error) {
					alert("Audio not available");
				} */
			}
		} catch (err) {
			resultCallback("", "", err);
		}
	};

	const resultCallback = (serial, symbology, error) => {
		/* if (clientCallback) {
			clientCallback(serial, symbology, error);
		} */
		console.log("result callback:", serial, symbology, error);
	};

	const isMobile = () => {
		return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	};

	const iPhoneorMac = () => {
		return [
			"iPhone",
			"iPod",
			"Mac68K",
			"MacPPC",
			"MacIntel",
			"iPad",
		].includes(navigator.platform);
	};

	return (
		<div id="scanner-container" className="text-white">
			<video
				id="scanner-video"
				ref={videoRef}
				playsInline
				style={{
					maxWidth: "100%",
					height: "auto",
					paddingBottom: "50px",
				}}
			/>
			<div className="scanner-laser"></div>
		</div>
	);
};

export default CortexScanner;
