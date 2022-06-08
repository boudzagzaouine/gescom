import { OpenArticleProp, openArticles } from 'config/rtk/rtkArticle';
import { OpenFournisseurProp, openFournisseurs } from 'config/rtk/rtkFournisseur';
import dateFormat from 'dateformat';
import React, { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Article, article0, ArticleClient, f0, Fournisseur } from 'tools/types';
import { Field, Form } from 'widgets';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';
import Calendar from 'widgets/Calendar';
import Modal from 'widgets/Modal';

//@ts-ignore
type FormArticleClientProp = {
	articleclient: ArticleClient;
	// client:Client
	refetchList: () => void;
	add: () => void;
	edit: () => void;
};
const FormArticleClient = (
	{ articleclient, refetchList, add, edit }: FormArticleClientProp,
	ref: Ref<void>,
) => {
	const [showModal, setShowModal] = useState(false);
	const [articleclient0, setArticleclient0] = useState(articleclient);
	const [startDate, setStartDate] = useState(articleclient0.date);
	const [openCalendar, setOpenCalendar] = useState(false);
	const openModal = (a: ArticleClient) => {
		setArticleclient0(a);
		setShowModal(true);
	};
	const fournisseursOpen: OpenFournisseurProp = openFournisseurs();
	const fournisseurs: Fournisseur[] = fournisseursOpen.data.content;
	const famillArticlesOpen: OpenArticleProp = openArticles();
	const famillArticles: Article[] = famillArticlesOpen.data.content;
	const save = articleclient0.id == "" ? add : edit;
	const close = () => {
		setShowModal(false);
	};
	useEffect(() => {
		//@ts-ignore
		ref.current = openModal;
	});
	return (
		<Modal
			title={
				articleclient0.id === ""
					? "Nouvel article client"
					: "Mise à jour de l'article client"
			}
			show={showModal}
			format={5}
			close={close}>
			<Form defaultValues={articleclient0} onSubmit={save}>
				<>
					<div className='float-left w-1/2 relative'>
						<Field
							label='design'
							name='design'
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setArticleclient0({
									...articleclient0,
									design: e.target.value,
								});
							}}
						/>
						<Field
							label='Prix'
							name='prix'
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setArticleclient0({ ...articleclient0, prix: +e.target.value });
							}}
						/>
						<Field
							label='Poid'
							name='poid'
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setArticleclient0({ ...articleclient0, poid: +e.target.value });
							}}
						/>
					</div>
					<div className='float-left w-1/2'>
						<Field
							label='Date'
							name='date33'
							value={dateFormat(startDate, "dd-mm-yyyy")}
							onFocus={() => {
								setOpenCalendar(true);
							}}
						/>
						{openCalendar && (
							<DatePicker
								selected={startDate}
								name='date11'
								onChange={(d: Date) => {
									setStartDate(d);
									setArticleclient0({ ...articleclient0, date: d });
									setOpenCalendar(false);
								}}
								dateFormat='dd-MM-yyyy'
								calendarContainer={Calendar}
								inline
							/>
						)}
						<Field
							label='Fournisseur'
							name='idFournisseur'
							as='select'
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								setArticleclient0({
									...articleclient0,
									idFournisseur: e.target.value,
								});
							}}>
							{[f0, ...(fournisseurs || [])]?.map((c: Fournisseur) => (
								<option value={c.id}>{c.design}</option>
							))}
						</Field>
						<Field
							label='Famille Article'
							name='idFamilleArticle'
							as='select'
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								setArticleclient0({
									...articleclient0,
									idFamilleArticle: e.target.value,
								});
							}}>
							{[article0, ...(famillArticles || [])]?.map((c: Article) => (
								<option value={c.id}>{c.design}</option>
							))}
						</Field>
					</div>
					<Bsave
						className='float-right mt-5 b-ajust-r'
						onClick={() => {
							setTimeout(() => {
								refetchList();
								close();
							}, 600);
						}}
					/>
				</>
			</Form>
			<Bcancel
				className='float-right mt-5 b-ajust'
				onClick={() => {
					close();
				}}
			/>
		</Modal>
	);
};

export default forwardRef(FormArticleClient);
