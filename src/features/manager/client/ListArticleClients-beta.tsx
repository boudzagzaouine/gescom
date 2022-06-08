import { BriefcaseIcon, ClipboardListIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { style_icon, style_span } from "tools/constStyle";
import { ArticleClient, articleClient0 } from "tools/types";
import List from "widgets/List";
import { MenuNavTabs } from "widgets/TypeWidgets";

const Temp = () => {
	return <h1>en cours ...</h1>;
};
var refetch = () => {};
const ListArticleClients = () => {
	const [articleclient, setarticleclient] = useState(articleClient0);

	const init = (a: ArticleClient, r: () => void) => {
		setarticleclient(a);
		refetch = r;
	};
  const articlecom: MenuNavTabs[] = [
		{
			id: 1,
			name: (
				<>
					<BriefcaseIcon className={style_icon} aria-hidden='true' />
					<span className={style_span}>Matière Première</span>
				</>
			),
			featured: <></>,
		},
		{
			id: 2,
			name: (
				<>
					<ClipboardListIcon className={style_icon} aria-hidden='true' />
					<span className={style_span}>Historique de production</span>
				</>
			),
			featured: <></>,
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
				title='Article'
				mal={false}
				body={[
					{
						label: "Code",
						attr: "id",
						type: "attr",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
                    {
						label: "Désignation",
						attr: "design",
						type: "attr",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
                    {
						label: "Prix Unitaire",
						attr: "prix",
						type: "attr",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
					{
						label: "Client",
						attr: "idClient",
						type: "select",
						required: true,
						css: "w-1/2 float-left",
						path: "clients",
						displayed: false,
						join: ".",
					},
                    {
						label: "Poids",
						attr: "poid",
						type: "select",
						required: true,
						css: "w-1/2 float-left",
						path: ".",
						displayed: true,
						join: ".",
					},
                    {
						label: "Fournisseur",
						attr: "idFournisseur",
						type: "select",
						required: false,
						css: "w-1/2 float-left",
						path: "fournisseurs",
						displayed: true,
						join: ".",
					},
					{
						label: "Famille article",
						attr: "idFamilleArticle",
						type: "select",
						required: true,
						css: "w-1/2 float-left",
						path: "articles",
						displayed: true,
						join: ".",
					},
					{
						label: "Code barre",
						attr: ".",
						type: "attr",
						required: false,
						css: "w-1/2 float-left",
						path: ".",
						displayed: false,
						join: ".",
					},
				]}
				emptyObject={articleClient0}
				path='articleclients'
				detailObjects={articlecom}
				init={init}
			/>
		</>
	);
};

export default ListArticleClients;
