import { useAddFournisseurMutation, useEditFournisseurMutation } from 'config/rtk';
import { openDevises } from 'config/rtk/rtkDevise';
import { openIncoterms } from 'config/rtk/rtkIncoterm';
import { openPayementModes } from 'config/rtk/rtkPayementMode';
import React, { useState } from 'react';
import { REQUEST_EDIT, REQUEST_SAVE } from 'tools/consts';
import { Devise, Fournisseur, Incoterm, PayementMode } from 'tools/types';
import { Field, Form } from 'widgets';
import Avatar from 'widgets/Avatar';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';
import Bupdate from 'widgets/Bupdate';
import Required from 'widgets/Required';
import Section from 'widgets/Section';
import ShowCheckedsField from 'widgets/ShowCheckedsField';
import Title from 'widgets/Title';
import Xclose from 'widgets/Xclose';

import ListCommandeFournisseur from './ListCommandeFournisseur';

type FormFournisseurManagerProp = {
	closed: () => void;
	fournisseur: Fournisseur;
	request: number;
	disable: boolean;
};
const FormFournisseurManager = ({
	closed,
	fournisseur,
	request,
	disable,
}: FormFournisseurManagerProp) => {
	const [save] = useAddFournisseurMutation();
	const [edit] = useEditFournisseurMutation();
	const tabDevises: Devise[] = openDevises(0).data.content;
	const devises: string[] = tabDevises?.map((d) => d.symbole);
	const tabIncoterms: Incoterm[] = openIncoterms().data.content;
	const tabPayementModes: PayementMode[] = openPayementModes().data.content;
	const incoterms = tabIncoterms?.map((d) => d.code);
	const payementModes = tabPayementModes?.map((d) => d.code);
	const onSubmit =
		request == REQUEST_SAVE ? save : request == REQUEST_EDIT ? edit : undefined;
	const [disabled, setDisabled] = useState(disable);
	return (
		<Section>
			<Xclose close={closed} />
			<Title msg='fournisseur' id={fournisseur.id} edit={disabled} />
			<div className='text-xs'>
				<Form defaultValues={fournisseur} onSubmit={onSubmit}>
					<div className='float-left w-5/6'>
						<div className='float-left w-1/2'>
							{request == REQUEST_EDIT && <Field type='hidden' name='id' />}
							<Field
								label={<Required msg='Nom du Fournisseur' />}
								name='design'
								disabled={disabled}
							/>
							<Field label='Contact' name='contact' disabled={disabled} />
							<Field label='Téléphone' name='tel' disabled={disabled} />
							<Field label='Email' name='email' disabled={disabled} />
							<Field
								label={<Required msg='Adresse' />}
								name='adresse'
								as='textarea'
								disabled={disabled}
							/>
						</div>
						<div className='float-left w-1/2'>
							<Field
								label={<Required msg='Mode de Règlement' />}
								name='modeDeReglements'
								as='select'
								options={payementModes}
								disabled={disabled}
							/>
							<Field
								label={<Required msg='Incoterm' />}
								name='incoterm'
								as='select'
								options={incoterms}
								disabled={disabled}
							/>
							<Field
								label={<Required msg='Devise' />}
								name='devise'
								as='select'
								options={devises}
								disabled={disabled}
							/>

							<ShowCheckedsField
								msg='les coordonnées bancaires du fournisseur'
								isAdd={fournisseur.id == ""}>
								<Field label='Banque' name='nomBanque' disabled={disabled} />
								<Field label='RIB' name='ribBanque' disabled={disabled} />
								<Field label='SWIFT' name='swift' disabled={disabled} />
							</ShowCheckedsField>
						</div>
					</div>
					<div className='float-left w-1/6'>
						<Avatar />
					</div>
					<div className='float-left w-full mt-1'>
						{!disabled && (
							<Bsave
								className='float-right b-ajust-r'
								onClick={() => {
									setTimeout(() => {
										closed();
									}, 500);
								}}
							/>
						)}
					</div>
				</Form>
			</div>
			{!disabled && (
				<Bcancel
					className={
						"float-right b-ajust " + (request == REQUEST_SAVE && "b-ajustf")
					}
					onClick={() => {
						if (fournisseur.id != "") setDisabled(true);
						else closed();
					}}
				/>
			)}

			{disabled && (
				<Bupdate
					className='float-right'
					onClick={() => {
						setDisabled(false);
					}}
				/>
			)}
			{fournisseur.id != "" && (
				<ListCommandeFournisseur fournisseur={fournisseur} />
			)}
		</Section>
	);
};
export default FormFournisseurManager;
