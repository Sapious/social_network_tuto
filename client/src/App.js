import { Fragment, useEffect } from "react";
import Helmet from "react-helmet";
import "./assets/css/color.css";
import "./assets/css/responsive.css";
import "./assets/css/style.css";
function App() {
	return (
		<Fragment>
			<Helmet>
				<script src="./assets/js/custom.js" type="text/javascript" async />
			</Helmet>
			<div>hello world</div>
		</Fragment>
	);
}

export default App;
