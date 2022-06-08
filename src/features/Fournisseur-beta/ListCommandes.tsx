import { useState } from "react";
import { CommandeFournisseur, commandeFournisseur0, Fournisseur } from "tools/types";
import List from "widgets/List";

const Temp = () => {
	return <h1>en cours ...</h1>;
};
var refetch=()=>{};
type ListCommandFournisseurProp={
  fournisseur:Fournisseur
}
const ListCommandes=({fournisseur}:ListCommandFournisseurProp)=>{
  const[command,setCommand]=useState(commandeFournisseur0);
  const init=(c:CommandeFournisseur,r:()=> void)=>{
    setCommand(c);
    refetch=r;
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
				title='Commande'
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
						label: "Date Commande",
						attr: "dateCommande",
						type: "date",
						required: true,
						css: "w-full",
						path: ".",
						displayed: true,
						join: ".",
					},
          {
						label: "Date de livraison",
						attr: "dateLivraison",
						type: "date",
						required: true,
						css: "w-full",
						path: ".",
						displayed: true,
						join: ".",
					},
				]}
				emptyObject={commandeFournisseur0}
				path='commandeFournisseurs'
				detailObjects={[]}
				init={init}
			/>
		</>
  );
};
export default ListCommandes;
