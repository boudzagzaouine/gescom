import { BriefcaseIcon } from '@heroicons/react/solid';
import ListArticleCommandes from 'features/manager/client/ListArticleCommandes';
import React, { useState } from 'react';
import { style_icon, style_span } from 'tools/constStyle';
import { Client, Commande, commande0 } from 'tools/types';
import List from 'widgets/List';
import { MenuNavTabs } from 'widgets/TypeWidgets';

type CommandesProp = {
	client: Client;
	refetchParent: () => void;
};
var refetch = () => {};
const ListCommandes = ({ client, refetchParent }: CommandesProp) => {
	const [commande, setCommande] = useState(commande0);
	const init = (c: Commande, r: () => void) => {
		setCommande(c);
		refetch = r;
	};
	const commandes: MenuNavTabs[] = [
		{
			id: 1,
			name: (
				<>
					<BriefcaseIcon className={style_icon} aria-hidden='true' />
					<span className={style_span}>Articles de la commande</span>
				</>
			),
			featured: (
				<ListArticleCommandes
					idClient={client?.id}
					idCommande={commande?.id}
					refetchParent={refetch}
				/>
			),
		},
	];
	return (
		<>
			<List
				displayedIncheck={{
					msg: "",
					css: "",
					tab: [],
				}}
				avatar={false}
				rectoVerso={false}
				title='Commande'
				mal={false}
				body={[
					{
						label: "Client",
						attr: "idClient",
						type: "attr",
						required: true,
						css: "w-1/2 float-left",
						path: "clients",
						displayed: true,
						join: client?.design,
					},
					{
						label: "Adresse de livraison",
						attr: "adrLiv",
						type: "select",
						required: true,
						css: "w-1/2 float-left",
						path: "adressLivs",
						displayed: false,
						join: ".",
					},
					{
						label: "N° BC",
						attr: "id",
						type: "attr",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
					{
						label: "Saison",
						attr: "season",
						type: "attr",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
					{
						label: "Date Commande",
						attr: "date33",
						type: "date",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
				]}
				emptyObject={commande0}
				path='commandes'
				detailObjects={commandes}
				init={init}
			/>
		</>
	);
};

export default ListCommandes;
