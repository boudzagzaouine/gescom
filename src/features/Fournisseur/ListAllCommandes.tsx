import { BriefcaseIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { style_icon, style_span } from "tools/constStyle";
import { CommandeFournisseur, commandeFournisseur0, Fournisseur, fournisseur0 } from "tools/types";
import List from "widgets/List";
import { MenuNavTabs } from "widgets/TypeWidgets";
import ListLigneDeCommande from "./ListLigneDeCommande";

const Temp = () => {
	return <h1>en cours ...</h1>;
};
var refetch=()=>{};
type ListAllCommandFournisseurProp={
  fournisseur:Fournisseur
}
const ListAllCommandes=({fournisseur}:ListAllCommandFournisseurProp)=>{
  const[command,setCommand]=useState(commandeFournisseur0);
  const init=(c:CommandeFournisseur,r:()=> void)=>{
    setCommand(c);
    refetch=r;
  };
  const commandes: MenuNavTabs[] = [
    {
      id: 1,
      name: (
        <>
          <BriefcaseIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Matières Premières</span>
        </>
      ),
      featured: (
        <ListLigneDeCommande
          idCommandeFournisseur={command.id}
          idfournisseur={fournisseur0.id}
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
						label: "Fournisseur",
						attr: "idFournisseur",
						type: "select",
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
				detailObjects={commandes}
				init={init}
			/>
		</>
  );
};
export default ListAllCommandes;