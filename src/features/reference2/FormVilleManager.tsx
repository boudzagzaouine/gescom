import { openpaysv } from 'config/rtk/rtkPays';
import React, { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react';
import { Pays, Ville } from 'tools/types';
import { Field, Form } from 'widgets';
import Bcancel from 'widgets/Bcancel';
import Bcyan from 'widgets/Bcyan';
import Bsave from 'widgets/Bsave';
import BsavEndNew from 'widgets/BsavEndNew';
import ModalS from 'widgets/ModalS';
import Required from 'widgets/Required';

type FormVilleManagerProp = {
	save: () => void;
	edit: () => void;
	refetch: () => void;
	ville: Ville;
	disable: boolean;
};
const FormVilleManager = (
	{ save, edit, refetch, ville, disable }: FormVilleManagerProp,
	ref: Ref<void>
) => {
	const [disabled, setDisabled] = useState(disable);
	const [ville1, setVille1] = useState(ville);
	const [showModal, setShowModal] = useState(false);
	const pays: Pays[] = openpaysv().data.content;

	const onSubmit = ville1.id == "" ? save : edit;
	const openModal = (d: Ville, disable: boolean) => {
		setVille1(d);
		setShowModal(true);
		setDisabled(disable);
	};
	const close = () => {
		setShowModal(false);
	};
	useEffect(() => {
		//@ts-ignore
		ref.current = openModal;
	}, []);
	return (
		<ModalS
			show={showModal}
			title={ville1.id == "" ? "Nouvelle Ville" : "Modifier Ville"}
			format={5}
			close={close}>
			<div className='float-left w-full'>
				<Form defaultValues={ville1} onSubmit={onSubmit}>
					<div className='float-left w-full'>
						<Field
							label={<Required msg='Désignation' />}
							name='design'
							disabled={disabled}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								setVille1({ ...ville1, design: e.target.value });
							}}
						/>

						<Field
							disabled={disabled}
							label={<Required msg='Pays' />}
							name='pays'
							as='select'
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								setVille1({ ...ville1, pays: e.target.value });
							}}>
							{
								//@ts-ignore
								["", ...(pays || [])]?.map((c: Pays) => (
									<option key={c.id} value={c.id}>
										{c.design}
									</option>
								))
							}
						</Field>
					</div>
					<div className='mt-5 b-ajust-r'>
						<Bsave
							className='float-right'
							onClick={() => {
								setTimeout(() => {
									refetch();
									close();
								}, 600);
							}}
						/>
						{ville1.id == "" && (
							<BsavEndNew
								className='ml-10 mr-2'
								onClick={() => {
									setTimeout(() => {
										refetch();
									}, 600);
								}}
							/>
						)}
					</div>
				</Form>
				<Bcancel
					className='float-right mt-5 b-ajust'
					onClick={() => {
						close();
					}}
				/>
			</div>
		</ModalS>
	);
};

export default forwardRef(FormVilleManager);
