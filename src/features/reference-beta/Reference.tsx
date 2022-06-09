import React from 'react';
import {
    article0,
    bureauDouane0,
    coco0,
    declarant0,
    devise0,
    document0,
    ville0,
    incoterm0,
    payementMode0,
    pays0,
    rawMaterial0,
    regimeDouanier0,
    transporteur0,
    type0,
    unitMeasure0,
} from 'tools/types';
import List from 'widgets/List';

type ReferenceProps = {
	type: string;
};
const Reference = ({ type }: ReferenceProps) => {
	switch (type) {
		case "coco":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='test coco'
					mal={false}
					body={[
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
							label: "Quantité",
							attr: "qte",
							type: "attr",
							required: false,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
						{
							label: "Date",
							attr: "date",
							type: "date",
							required: true,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={coco0}
					path='cocos'
				/>
			);
			break;
		case "unitMeasure":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Unités de Mesure'
					mal={false}
					body={[
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
							label: "Symbole",
							attr: "symbole",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
						{
							label: "Décimal",
							attr: "decimal",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={unitMeasure0}
					path='unitMeasures'
				/>
			);
			break;
		case "article":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Familles Article'
					mal={false}
					body={[
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
							label: "Nomenclature",
							attr: "nomenclature",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
						{
							label: "Taux de perte",
							attr: "tauxPertes",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={article0}
					path='articles'
				/>
			);
			break;
		case "rawMaterial":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Familles Matière Première'
					mal={false}
					body={[
						{
							label: "Désignation",
							attr: "design",
							type: "attr",
							required: true,
							css: "w-full",
							path: "nodisplayed:true,join",
							displayed: true,
							join: "nodisplayed:true,join",
						},
						{
							label: "Nomenclature",
							attr: "nomenclature",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: "nodisplayed:true,join",
							displayed: true,
							join: "nodisplayed:true,join",
						},
						{
							label: "Famille Mère",
							attr: "family",
							type: "select",
							required: false,
							css: "w-1/2 float-left",
							path: "rawMaterials",
							displayed: true,
							join: "rawMaterials",
						},
						{
							label: "Unité de mesure",
							attr: "measureUnit",
							type: "select",
							required: true,
							css: "w-1/2 float-left",
							path: "unitMeasures",
							displayed: true,
							join: "unitMeasures",
						},
						{
							label: "Taux de perte",
							attr: "tauxPertes",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: "nodisplayed:true,join",
							displayed: true,
							join: "nodisplayed:true,join",
						},
					]}
					emptyObject={rawMaterial0}
					path='rawMaterials'
				/>
			);
			break;
		case "bureauDouane":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Bureaux Douaniers'
					mal={true}
					body={[
						{
							label: "Numéro",
							attr: "code",
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
							css: "w-full",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={bureauDouane0}
					path='bureauDouanes'
				/>
			);
			break;
		case "regimeDouanier":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Régimes Douaniers'
					mal={true}
					body={[
						{
							label: "Numéro",
							attr: "code",
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
							css: "w-full",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={regimeDouanier0}
					path='regimeDouaniers'
				/>
			);
			break;
		case "payementMode":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='mode de règlement'
					mal={true}
					body={[
						{
							label: "Code",
							attr: "code",
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
							css: "w-full",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={payementMode0}
					path='payementModes'
				/>
			);
			break;
		case "incoterm":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='incoterms'
					mal={true}
					body={[
						{
							label: "Code",
							attr: "code",
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
							css: "w-full",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={incoterm0}
					path='incoterms'
				/>
			);
			break;
		case "declarant":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Déclarants'
					mal={true}
					body={[
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
							label: "Ville",
							attr: "ville",
							type: "select",
							required: true,
							css: "w-1/2 float-left",
							path: "villes",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={declarant0}
					path='declarants'
				/>
			);
			break;
		case "Transporteur":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Transporteurs'
					mal={true}
					body={[
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
					]}
					emptyObject={transporteur0}
					path='transporteurs'
				/>
			);
			break;
		case "Document":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Documents'
					mal={true}
					body={[
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
					]}
					emptyObject={document0}
					path='documents'
				/>
			);
			break;
		case "Devise":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Devises'
					mal={false}
					body={[
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
							label: "Code ISO",
							attr: "code_iso",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
						{
							label: "Symbole",
							attr: "symbole",
							type: "attr",
							required: true,
							css: "w-1/2 float-left",
							path: ".",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={devise0}
					path='devises'
				/>
			);
			break;
		case "Pays":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Pays'
					mal={true}
					body={[
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
					]}
					emptyObject={pays0}
					path='pays'
				/>
			);
			break;
		case "Ville":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Villes'
					mal={false}
					body={[
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
							label: "Pays",
							attr: "pays",
							type: "select",
							required: true,
							css: "w-1/2 float-left",
							path: "pays",
							displayed: true,
							join: ".",
						},
					]}
					emptyObject={ville0}
					path='villes'
				/>
			);
			break;
		case "Type":
			return (
				<List
					init={(o: any, ref: () => void) => {}}
					avatar={false}
					detailObjects={[]}
					rectoVerso={false}
					displayedIncheck={{ msg: "", css: "", tab: [] }}
					title='Types'
					mal={true}
					body={[
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
					]}
					emptyObject={type0}
					path='types'
				/>
			);
			break;
		default:
			return <></>;
			break;
	}
};

export default Reference;
