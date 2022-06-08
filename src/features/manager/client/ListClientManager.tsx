import { OpenClientProp, openPaginationClients } from 'config/rtk/RtkClient';
import React, { useEffect, useRef, useState } from 'react';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE } from 'tools/consts';
import { c0, Client } from 'tools/types';
import { Button } from 'widgets';
import Action from 'widgets/Action';
import Bcyan from 'widgets/Bcyan';
import Icon from 'widgets/Icon';
import Mitems from 'widgets/Mitems';
import Pagin from 'widgets/Pagin';
import Section from 'widgets/Section';
import Table from 'widgets/Table';

import FormClientManager from './FormClientManager';

const ListClientManager1 = () => {
	const [form, setForm] = useState(false);
	const [client0, setClient0] = useState(c0);
	const [request0, setRequest0] = useState(REQUEST_SAVE);
	const [page, setPage] = useState(0);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
	};
	//openPaginationClients =(page:number):OpenClientProp
	const openClients: OpenClientProp = openPaginationClients(page);
	const clients: Client[] = openClients.data.content;
	const refetch = openClients.refetch;
	const [disabled, setDisabled] = useState(true);
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);

	const showFormulaire = (client: Client) => {
		setClient0(client);
		setForm(true);
		setRequest0(REQUEST_EDIT);
	};
	const FormAsAdd = () => {
		setDisabled(false);
		setClient0(c0);
		setForm(true);
		setRequest0(REQUEST_SAVE);
	};
	const FormAsEdit = (client: Client) => {
		setDisabled(true);
		showFormulaire(client);
	};
	const FormAsUpdate = (client: Client) => {
		setDisabled(false);
		showFormulaire(client);
	};
	return (
		<>
			{form && (
				<FormClientManager
					request={request0}
					client={client0}
					closed={() => {
						setForm(false);
						setRequest0(REQUEST_SAVE);
						refetch();
					}}
					refetch={refetch}
					disable={disabled}
				/>
			)}
			{!form && (
				<Section>
					<Action
						id=''
						path='clients'
						design=''
						type='le client'
						ref={del}
						action={DEL}
					/>
					<Action
						id=''
						path='clients'
						design=''
						type='le client'
						ref={archive}
						action={ARCHIVE}
					/>
					<Action
						id=''
						path='clients'
						design=''
						type='le client'
						ref={restore}
						action={RESTORE}
					/>
					<div className='float-left w-full'>
						<Bcyan
							className='float-left'
							onClick={() => {
								//setClient0(c0);
								//setForm(true);
								FormAsAdd();
							}}>
							Nouveau Client
						</Bcyan>
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
								<Table.th>Nom client</Table.th>
								<Table.th>Contact</Table.th>
								<Table.th>Icoterm</Table.th>
								<Table.th>Mode règlement</Table.th>
								<Table.th></Table.th>
							</tr>
						}>
						{
							//@ts-ignore
							clients?.map((client) => (
								//   data?.map((client) => (
								<tr key={client.id}>
									<Table.td>
										<figure>
											<img src={"/images/empty-contact.png"} alt='' />
											<figcaption>
												<span>{client.design}</span>
												&nbsp;&nbsp;
												<span>{client.contact}</span>
											</figcaption>
										</figure>
									</Table.td>
									<Table.td>
										<ul>
											<li>{client.tel}</li>
											<li>{client.email}</li>
										</ul>
									</Table.td>
									<Table.td>{client.incoterm}</Table.td>
									<Table.td>{client.paymentChoice}</Table.td>
									<Table.td>
										<Mitems
											archive={() => {
												//@ts-ignore
												archive.current(client.id, client.design);
											}}
											/*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
											del={() => {
												//@ts-ignore
												del.current(client.id, client.design);
											}}
											edit={() => {
												FormAsEdit(client);
											}}
											obj={client}
											update={() => {
												FormAsUpdate(client);
											}}
										/>
									</Table.td>
								</tr>
							))
						}
					</Table>

					<Pagin
						load={loadPage}
						visible={clients?.length > 0}
						max={clients?.length}
					/>
				</Section>
			)}
		</>
	);
};

export default ListClientManager1;
