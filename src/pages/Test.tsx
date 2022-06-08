import 'react-datepicker/dist/react-datepicker.css';

import { openIdsObjects } from 'config/rtk/rtkGen';
import React, { useState } from 'react';
import Bcyan from 'widgets/Bcyan';
import Section from 'widgets/Section';

const Test = () => {
	let x: any = null;
	let y: any = null;
	let z: any = null;
	setTimeout(() => {
		x = openIdsObjects("pays");
		console.log(JSON.stringify(x));
	}, 300);
	setTimeout(() => {
		//	y = openIdsObjects("clients");
	}, 500);
	setTimeout(() => {
		//	z = openIdsObjects("devises");
	}, 700);
	return (
		<Section>
			<Bcyan
				onClick={() => {
					console.clear();
					console.log(
						"gener : data=" + JSON.stringify(x.isSuccess ? x.tab : []),
					);
				}}>
				test
			</Bcyan>
			{/* <h1>{ff}</h1> */}
			{/* <TestClient /> */}
			{/* <TestCommande /> */}
			{/* <TestArticleCommande /> */}
			{/* <TestAdressLiv /> */}
			{/* <DatePicker selected={startDate} onChange={(date:Date) =>   setStartDate(date)} /> */}
			{/* <TestOpenClient /> */}
			{/* <TestSelect /> */}
			{/* <TestOpenUser /> */}
			{/* <TestArticleCommande3 /> */}
			{/* <TestFournisseur /> */}
			{/* <TestArticleClient/> */}
			{/* <TestOpengeneral />  */}
		</Section>
	);
};

export default Test;
