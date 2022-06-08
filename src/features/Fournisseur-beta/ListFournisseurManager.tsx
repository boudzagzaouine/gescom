import { BriefcaseIcon, ClipboardListIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { style_icon, style_span } from "tools/constStyle";
import { Fournisseur, fournisseur0 } from "tools/types";
import List from "widgets/List";
import { MenuNavTabs } from "widgets/TypeWidgets";
import ListCommandes from "./ListCommandes";
import ListMatierePremiere from "./ListMatierePremiere";

const Temp = () => {
	return <h1>en cours ...</h1>;
};
var refetch =()=>{};
const ListFournisseurManager =()=>{
	const [fournisseur,setFournisseur]=useState(fournisseur0);
	const init=(f:Fournisseur, r:()=>void)=>{
		setFournisseur(f);
		refetch = r;
	};
	const ligneDeCommande: MenuNavTabs[]=[
		{
			id: 1,
			name: (
			  <>
				<BriefcaseIcon className={style_icon} aria-hidden="true" />
				<span className={style_span}>Commandes Fournisseur</span>
			  </>
			),
			featured: <ListCommandes fournisseur={fournisseur} />,
		  },
		  {
			id: 2,
			name: (
			  <>
				<ClipboardListIcon className={style_icon} aria-hidden="true" />
				<span className={style_span}>Matières Premières</span>
			  </>
			),
			featured: <ListMatierePremiere fournisseur={fournisseur} />,
		  },
	];
	return (
		<>
			<List
				displayedIncheck={{
					msg: "les coordonnées bancaires du fournisseur",
					css: "float-right w-1/2",
					tab: [
						{
							label: "Banque",
							attr: "nomBanque",
							type: "attr",
							required: false,
							css: "w-full",
							path: ".",
							displayed: false,
							join: ".",
						},
						{
							label: "RIB",
							attr: "ribBanque",
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
				title='Fournisseur'
				mal={true}
				body={[
					{
						label: "Nom Fournisseur",
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
						attr: "modeDeReglements",
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
						label: "Adresse",
						attr: "adresse",
						type: "attrArea",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: false,
						join: ".",
					},
				]}
				emptyObject={fournisseur0}
				path='fournisseurs'
				detailObjects={ligneDeCommande}
				init={init}
			/>
		</>
	);
};

export default ListFournisseurManager;
