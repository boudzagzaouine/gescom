import { useFetchMatierePremiereByIdFournisseurQuery } from 'config/rtk';
import React from 'react';
import { useRef, useState } from 'react';
import { f0, getMp0, MatierePremiere } from 'tools/types';
import Bcyan from 'widgets/Bcyan';
import Table from 'widgets/Table';
import { ListFournisseursProps } from 'widgets/TypeWidgets';

import FormMatierePremiere from './FormMatierePremiere';

const ListMatierePremiere = ({ fournisseur }: ListFournisseursProps) => {
	const { data = [], refetch } = useFetchMatierePremiereByIdFournisseurQuery(
		fournisseur.id,
	);
	const [matierespremiere, setMatierespremiere] = useState(fournisseur.matiere);
	//const l=matiere.map((m:MatierePremiere)=>(m.fournisseur.id))
	const refCom = useRef(null);
	return (
		<>
			<Bcyan
				className='float-left mt-2'
				onClick={() => {
					//@ts-ignore
					refCom.current(getMp0(fournisseur));
				}}>
				Nouvelle Matiére
			</Bcyan>
			<FormMatierePremiere
				Matierep={getMp0(fournisseur)}
				ref={refCom}
				disabled={false}
				fournisseur={f0}
				fournisseurs={[]}
				refetch={refetch}
			/>

			<Table
				className='tab-list float-left w-full mt-2'
				thead={
					<tr>
						<Table.th>Code MP</Table.th>
						<Table.th>Désignation</Table.th>
						<Table.th>Prix</Table.th>
						<Table.th>Fournisseur</Table.th>
						<Table.th>Famille</Table.th>
						<Table.th></Table.th>
					</tr>
				}>
				{" "}
				{data?.map((m: MatierePremiere) => (
					<tr key={m.id}>
						<Table.td>{m.id}</Table.td>
						<Table.td>{}</Table.td>
						<Table.td>{m.prix}</Table.td>
						<Table.td>{fournisseur.design}</Table.td>
						<Table.td>{m.familleMatierePremiere}</Table.td>
						<Table.td></Table.td>
					</tr>
				))}
			</Table>
		</>
	);
};

export default ListMatierePremiere;
