import { BriefcaseIcon, ClipboardListIcon, TagIcon, TruckIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { style_icon, style_span } from 'tools/constStyle';
import { Client, client0 } from 'tools/types';
import List from 'widgets/List';
import { MenuNavTabs } from 'widgets/TypeWidgets';

import ListAdressLivraisons from './ListAdressLivraisons';
import ListArticleClients from './ListArticleClients';
import ListCommandes from './ListCommandes';
import SoldesCommandes from './SoldesCommandes';

const Temp = () => {
	return <h1>en cours ...</h1>;
};
var refetch = () => {};
const ListClientManager = () => {
	const [client, setClient] = useState(client0);

	const init = (c: Client, r: () => void) => {
		setClient(c);
		refetch = r;
	};
	const commanndes: MenuNavTabs[] = [
		{
			id: 1,
			name: (
				<>
					<BriefcaseIcon className={style_icon} aria-hidden='true' />
					<span className={style_span}>Commandes Clients</span>
				</>
			),
			featured: <ListCommandes client={client} refetchParent={refetch} />,
		},
		{
			id: 2,
			name: (
				<>
					<ClipboardListIcon className={style_icon} aria-hidden='true' />
					<span className={style_span}>Soldes Commandes</span>
				</>
			),
			featured: <SoldesCommandes idClient={client.id} />,
		},
		{
			id: 3,
			name: (
				<>
					<TagIcon className={style_icon} aria-hidden='true' />
					<span className={style_span}>Articles Clients</span>
				</>
			),
			featured: <ListArticleClients />,
		},
		{
			id: 4,
			name: (
				<>
					<TruckIcon className={style_icon} aria-hidden='true' />
					<span className={style_span}>Adresses de livraisons</span>
				</>
			),
			featured: (
				<ListAdressLivraisons idClient={client.id} refetchParent={refetch} />
			),
		},
	];
	return (
		<>
			<List
				displayedIncheck={{
					msg: "les coordonnées bancaires du client",
					css: "float-left w-1/2",
					tab: [
						{
							label: "Banque",
							attr: "banck",
							type: "attr",
							required: false,
							css: "w-full",
							path: ".",
							displayed: false,
							join: ".",
						},
						{
							label: "RIB",
							attr: "rib",
							type: "attr",
							required: false,
							css: "w-full",
							path: ".",
							displayed: false,
							join: ".",
						},
						{
							label: "SWIFT",
							attr: "swift",
							type: "attr",
							required: false,
							css: "w-full",
							path: ".",
							displayed: false,
							join: ".",
						},
					],
				}}
				avatar={true}
				rectoVerso={true}
				title='client'
				mal={true}
				body={[
					{
						label: "Raison Social",
						attr: "design",
						type: "attr",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
					{
						label: "Mode de Règlement",
						attr: "paymentChoice",
						type: "select",
						required: true,
						css: "w-1/2 float-left",
						path: "payementModes",
						displayed: true,
						join: ".",
					},
					{
						label: "Contact",
						attr: "contact",
						type: "attr",
						required: false,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
					{
						label: "Incoterm",
						attr: "incoterm",
						type: "select",
						required: true,
						css: "w-1/2 float-left",
						path: "incoterms",
						displayed: true,
						join: ".",
					},
					{
						label: "Téléphone",
						attr: "tel",
						type: "attr",
						required: false,
						css: "w-1/2 float-left",
						path: ".",
						displayed: false,
						join: ".",
					},
					{
						label: "Adresse de Facturation",
						attr: "adrFact",
						type: "attrArea",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: false,
						join: ".",
					},
					{
						label: "Email",
						attr: "email",
						type: "attr",
						required: false,
						css: "w-1/2 float-left",
						path: ".",
						displayed: false,
						join: ".",
					},
					{
						label: "Devise",
						attr: "devise",
						type: "select",
						required: true,
						css: "w-1/2 float-left",
						path: "devises",
						displayed: false,
						join: ".",
					},
					{
						label: "Adresse de  livraison",
						attr: "adrLiv",
						type: "attrArea",
						required: false,
						css: "w-1/2 float-left",
						path: ".",
						displayed: false,
						join: ".",
					},
				]}
				emptyObject={client0}
				path='clients'
				detailObjects={commanndes}
				init={init}
			/>
		</>
	);
};

export default ListClientManager;
