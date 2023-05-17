import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import CortexScanner from "../../components/CortexScanner";
import MainNav from "../../components/MainNav";

const Client: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	/* const handleSubmitBarcode = () => {
		console.log("submitted");
        alert()
	}; */

	const handleSubmitBarcode = (scanResult) => {
		console.log("scanResult:", scanResult);

		if (
			!scanResult.serial ||
			scanResult.serial.length === 0 ||
			scanResult.symbology === "QR Code"
		)
			return;

		// setSku(scanResult.serial);
		alert(`Barcode is: ${scanResult.serial}`);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Client Store {id}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Client Store {id}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<CortexScanner handleSubmitBarcode={handleSubmitBarcode} />
			</IonContent>
			<MainNav />
		</IonPage>
	);
};

export default Client;
