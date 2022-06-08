import { OpenFournisseurProp, openPaginationFournisseurs } from 'config/rtk/rtkFournisseur';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE } from 'tools/consts';
import { f0, Fournisseur } from 'tools/types';
import { Button } from 'widgets';
import Action from 'widgets/Action';
import Bcyan from 'widgets/Bcyan';
import Icon from 'widgets/Icon';
import Mitems from 'widgets/Mitems';
import Pagin from 'widgets/Pagin';
import Section from 'widgets/Section';

import FormFournisseurManager from './FormFournisseurManager';

const ListFournisseurManager = () => {
	const search = (key: string, obj: Fournisseur[]): Fournisseur[] => {
		const fournisseurSearch: Fournisseur[] = obj.filter((o: Fournisseur) => {
			return (
				o.id.match(key) != null ||
				o.design.match(key) != null ||
				o.contact.match(key) != null ||
				o.tel.match(key) != null ||
				o.email.match(key) != null ||
				o.adresse.match(key) != null ||
				o.modeDeReglements.match(key) != null ||
				o.incoterm.match(key) != null ||
				o.devise.match(key) != null ||
				o.nomBanque.match(key) != null ||
				o.ribBanque.match(key) != null ||
				o.swift.match(key) != null ||
				o.image.match(key) != null
			);
		});
		return fournisseurSearch;
	};
	const [form, setForm] = useState(false);
	const [fournisseur0, setFournisseur0] = useState(f0);
	const [request0, setRequest0] = useState(REQUEST_SAVE);
	const [page, setPage] = useState(0);
	const fournOpen: OpenFournisseurProp = openPaginationFournisseurs(page);
	const fournisseurs: Fournisseur[] = fournOpen.data.content;
	const refetch = fournOpen.refetch;
	const save = fournOpen.save;
	const [disabled, setDisabled] = useState(true);
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
	};
	const showFormulaire = (fournisseur: Fournisseur) => {
		setFournisseur0(fournisseur);
		setForm(true);
		setRequest0(REQUEST_EDIT);
	};
	const FormAsAdd = () => {
		setDisabled(false);
		setFournisseur0(f0);
		setForm(true);
		setRequest0(REQUEST_SAVE);
	};
	const FormAsEdit = (fournisseur: Fournisseur) => {
		setDisabled(true);
		showFormulaire(fournisseur);
	};
	const FormAsUpdate = (fournisseur: Fournisseur) => {
		setDisabled(false);
		showFormulaire(fournisseur);
	};
	return (
		<>
			{form && (
				<FormFournisseurManager
					request={request0}
					fournisseur={fournisseur0}
					closed={() => {
						setForm(false);
						setRequest0(REQUEST_SAVE);
						refetch();
					}}
					disable={disabled}
				/>
			)}
			{!form && (
				<Section>
					<Action
						id=''
						path='fournisseurs'
						design=''
						type='le fournisseur'
						ref={del}
						action={DEL}
					/>
					<Action
						id=''
						path='fournisseurs'
						design=''
						type='le fournisseur'
						ref={archive}
						action={ARCHIVE}
					/>
					<Action
						id=''
						path='fournisseurs'
						design=''
						type='le fournisseur'
						ref={restore}
						action={RESTORE}
					/>
					<div className='float-left w-full'>
						<Bcyan
							className='float-left'
							onClick={() => {
								FormAsAdd();
							}}>
							Nouveau Fournisseur
						</Bcyan>
						<div className='float-right'>
							<input
								type='text'
								className='py-3 border outline-[#ddd] border-[#ddd] float-right border-l-0 rounded-r-lg w-96'
								placeholder='Recherche'
							/>
							<Button className='bg-white float-right border border-[#ddd] border-r-0 p-3 rounded-l-lg'>
								<Icon i='search' cl='' />
							</Button>
						</div>
					</div>
					<table className='tab-list float-left w-full mt-8'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-3 py-3 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6'>
									Nom Fournisseur
								</th>
								<th className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
									Contact
								</th>
								<th className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
									Incoterm
								</th>
								<th className='px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
									Mode Réglement
								</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{fournisseurs?.map((fournisseur) => (
								<tr key={fournisseur.id}>
									<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
										<div className='flex items-center'>
											<div className='h-10 w-10 flex-shrink-0'>
												<img
													className='h-10 w-10 rounded-full'
													src={"/images/empty-contact.png"}
													alt=''
												/>
											</div>
											<div className='ml-4'>
												<div className='font-medium text-gray-900'>
													{fournisseur.design}
												</div>
											</div>
										</div>
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>{fournisseur.tel}</div>
										<div className='text-gray-500'>{fournisseur.email}</div>
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>{fournisseur.incoterm}</div>
										<div className='text-gray-500'>{fournisseur.contact}</div>
									</td>
									<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
										<div className='text-gray-900'>
											{fournisseur.modeDeReglements}
										</div>
									</td>
									<td>
										<Mitems
											archive={() => {
												//@ts-ignore
												archive.current(fournisseur.id, fournisseur.design);
											}}
											/*    restore={() => {
                        //@ts-ignore
                        restore.current(fournisseur.id,fournisseur.design);
                      }} */
											del={() => {
												//@ts-ignore
												del.current(fournisseur.id, fournisseur.design);
											}}
											edit={() => {
												FormAsEdit(fournisseur);
											}}
											obj={fournisseur}
											update={() => {
												FormAsUpdate(fournisseur);
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagin
						visible={fournisseurs?.length > 0}
						load={loadPage}
						max={fournisseurs?.length}
					/>
				</Section>
			)}
		</>
	);
};

export default ListFournisseurManager;
