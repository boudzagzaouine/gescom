import { useFetchCommandesFournisseurQuery } from 'config/rtk';
import React, { useRef, useState } from 'react';
import { Button } from 'widgets';
import Icon from 'widgets/Icon';
import Section from 'widgets/Section';
import Table from 'widgets/Table';

const ListCommandFournisseurAGenerer = () => {
	const {
		data = [],
		isFetching,
		refetch,
	} = useFetchCommandesFournisseurQuery();
	return (
		<Section>
			<div className='float-left w-full'>
				<h1 className='float-left'>
					<b> Commandes Fournisseurs Générée non validées</b>
				</h1>
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
			<Table
				className='tab-list float-left w-full mt-2'
				thead={
					<tr>
						<Table.th>
							<input type='checkbox' name='com' />
						</Table.th>
						<Table.th>N° Commande</Table.th>
						<Table.th>Fournisseur</Table.th>
						<Table.th>Date de Commande</Table.th>
						<Table.th>Date Livraison</Table.th>
						<Table.th>Origine</Table.th>
						<Table.th>Montant</Table.th>
						<Table.th></Table.th>
						<Table.th>
							<th className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0'>
								<Button className='inline-flex items-center px-2 py2 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
									Valider
								</Button>
							</th>
						</Table.th>
					</tr>
				}>
				{
					//@ts-ignore
					data.content?.map((commande) => (
						<tr key={commande.id}>
							<Table.th>
								<input type='checkbox' name='com' />
							</Table.th>
							<Table.td>{commande.id}</Table.td>
							<Table.td>fournisseur</Table.td>
							<Table.td>{commande.dateCommande}</Table.td>
							<Table.td>{commande.dateLivraison}</Table.td>
							<Table.td>-</Table.td>
							<Table.td>Montant</Table.td>
							<Table.td>
								<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-semibold sm:pr-6 md:pr-0'>
									<Button className='text-lime-500 hover:text-lime-800'>
										Modifier<span className='sr-only'>, Lindsay Walton</span>
									</Button>
								</td>
							</Table.td>
							<Table.td>
								<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-semibold sm:pr-6 md:pr-0'>
									<Button className='text-fuchsia-600 hover:text-fuchsia-900'>
										Valider<span className='sr-only'>, Lindsay Walton</span>
									</Button>
								</td>
							</Table.td>
						</tr>
					))
				}
			</Table>
		</Section>
	);
};

export default ListCommandFournisseurAGenerer;
