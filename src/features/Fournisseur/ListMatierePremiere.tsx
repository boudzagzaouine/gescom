import { useState } from "react";
import { Fournisseur, MatierePremiere, matierepremiere0 } from "tools/types";
import List from "widgets/List";

const Temp = () => {
	return <h1>en cours ...</h1>;
};
var refetch = () => {};
type ListMatierePremiereProp={
	fournisseur:Fournisseur
}
const ListMatierePremiere = ({fournisseur}:ListMatierePremiereProp) => {
  const [matierespremiere, setMatierespremiere] = useState(matierepremiere0);


	const init = (m: MatierePremiere, r: () => void) => {
		setMatierespremiere(m);
		refetch = r;
	};
	
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
				title='Matière'
				mal={false}
				body={[
					{
						label: "Fournisseur",
						attr: "idFournisseur",
						type: "attr",
						required: false,
						css: "w-full",
						path: "fournisseurs",
						displayed: true,
						join: fournisseur?.design,
					},
					{
						label: "Code",
						attr: "id",
						type: "attr",
						required: true,
						css: "w-full",
						path: ".",
						displayed: true,
						join: ".",
					},
					{
						label: "Désignation",
						attr: "design",
						type: "attr",
						required: true,
						css: "w-full",
						path: ".",
						displayed: true,
						join: ".",
					},
                    {
						label: "Famille",
						attr: "familleMatierePremiere",
						type: "select",
						required: true,
						css: "w-full",
						path: "rawMaterials",
						displayed: true,
						join: ".",
					},
					{
						label: "Prix",
						attr: "prix",
						type: "attr",
						required: true,
						css: "w-full",
						path: ".",
						displayed: true,
						join: ".",
					},
					{
						label: "Origine",
						attr: "origine",
						type: "select",
						required: false,
						css: "w-full",
						path: "pays",
						displayed: false,
						join: ".",
					},
				]}
				emptyObject={matierepremiere0}
				path='matieresPremiere'
				detailObjects={[]}
				init={init}
			/>
		</>
	);
};

export default ListMatierePremiere;
