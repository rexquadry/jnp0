import { IonFooter, IonToolbar, IonIcon } from "@ionic/react";
import {
	statsChartOutline,
	walletOutline,
	settingsOutline,
	cashOutline,
	cartOutline,
	barcodeOutline,
	informationOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";

const MainNav: React.FC = () => {
	return (
		<IonFooter>
			<IonToolbar color="dark">
				<div className="footer-nav">
					<Link to="/cart" className="footer-nav-item">
						<IonIcon icon={cartOutline} />
						<span>Cart</span>
					</Link>
					<Link to="/client/tuns" className="footer-nav-item">
						<IonIcon icon={barcodeOutline} />
						<span>Scan</span>
					</Link>
					<Link to="/" className="footer-nav-item">
						<IonIcon icon={informationOutline} />
						<span>Info</span>
					</Link>
				</div>
			</IonToolbar>
		</IonFooter>
	);
};

export default MainNav;
