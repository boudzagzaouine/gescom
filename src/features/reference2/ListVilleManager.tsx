import { openpaysv } from 'config/rtk/rtkPays';
import { OpenVilleProp, openVilles } from 'config/rtk/rtkVille';
import React, { useRef, useState } from 'react';
import { ARCHIVE, DEL, RESTORE } from 'tools/consts';
import { getLine } from 'tools/Methodes';
import { i0, Pays, Ville, VilleJson } from 'tools/types';
import Action from 'widgets/Action';
import Bcyan from 'widgets/Bcyan';
import { Button } from 'widgets/Button';
import Icon from 'widgets/Icon';
import MitemsRef from 'widgets/MitemsRef';
import Pagin from 'widgets/Pagin';
import Section from 'widgets/Section';
import Table from 'widgets/Table';

import FormVilleManager from './FormVilleManager';

function ListVilleManager() {
	const [page, setPage] = useState(0);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
	};

	const villesToOpen: OpenVilleProp = openVilles(page);
	const villeJson: VilleJson = villesToOpen.data;
	const villes: Ville[] = villeJson.content;
	const refetch: () => void = villesToOpen.refetch;
	const save = villesToOpen.save;
	const edit = villesToOpen.edit;
	const refCom = useRef(null);
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);
	const pays: Pays[] = openpaysv().data.content;
	return (
		<>
			<Section>
				<Action
					id=''
					path='villes'
					design=''
					type='Ville'
					ref={del}
					action={DEL}
				/>
				<Action
					id=''
					path='villes'
					design=''
					type='Ville'
					ref={archive}
					action={ARCHIVE}
				/>
				<Action
					id=''
					path='villes'
					design=''
					type='Ville'
					ref={restore}
					action={RESTORE}
				/>
				<h1>Villes</h1>
				<div className='float-left w-full'>
					<Bcyan
						className='float-left'
						onClick={() => {
							//@ts-ignore
							refCom.current(i0, false);
						}}>
						Nouvelle Ville
					</Bcyan>
					<FormVilleManager
						refetch={refetch}
						save={save}
						edit={edit}
						Ville={i0}
						disable={false}
						ref={refCom}
					/>
					<div className='float-right'>
						<Button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg'>
							<Icon i='search' cl='' />
						</Button>
						<input
							type='text'
							className='py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96'
						/>
					</div>
				</div>
				<Table
					className='tab-list float-left w-full mt-8'
					thead={
						<tr>
							<Table.th>Désignation</Table.th>
							<Table.th>Pays</Table.th>
							<Table.th></Table.th>
						</tr>
					}>
					{villes?.map((Ville) => (
						<tr key={Ville.id}>
							<Table.td>
								<span>{Ville.design}</span>
							</Table.td>
							<Table.td>
								<span>{getLine(Ville.pays, pays)?.design}</span>
							</Table.td>

							<Table.td>
								<MitemsRef
									archive={() => {
										//@ts-ignore
										archive.current(Ville.id, Ville.design);
									}}
									/*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
									del={() => {
										//@ts-ignore
										del.current(Ville.id, Ville.design);
									}}
									obj={Ville}
									update={() => {
										//@ts-ignore
										refCom.current(Ville, false);
									}}
								/>
							</Table.td>
						</tr>
					))}
				</Table>

				<Pagin
					load={loadPage}
					max={villes?.length}
					visible={villes?.length > 0}
				/>
			</Section>
		</>
	);
}

export default ListVilleManager;
