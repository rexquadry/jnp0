import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";

const Client: React.FC = () => {
	const { id } = useParams<{ id: string }>();

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
			</IonContent>
		</IonPage>
	);
};

export default Client;
