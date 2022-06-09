import classNames from 'classnames';
import { openFamilleF } from 'config/rtk/rtkRawMaterial';
import { openUnitF } from 'config/rtk/rtkUnitMeasure';
import React, { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react';
import { RawMaterial, UnitMeasure } from 'tools/types';
import { Field, Form } from 'widgets';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';
import BsavEndNew from 'widgets/BsavEndNew';
import ModalS from 'widgets/ModalS';
import Required from 'widgets/Required';

type FormRawMaterialProps = {
	save: () => void;
	edit: () => void;
	refetch: () => void;
	rawMaterial: RawMaterial;
	disable: boolean;	
};
const FormRawMaterial = ({ save, edit, refetch, rawMaterial, disable }: FormRawMaterialProps,ref: Ref<void>,) => {
	const [disabled, setDisabled] = useState(disable);
	const [rawMaterial1, setrawMaterial1] = useState(rawMaterial);
	const [showModal, setShowModal] = useState(false);
	const tabUnit: UnitMeasure[] = openUnitF().data.content;
	const tabFamille: RawMaterial[] = openFamilleF().data.content;
	const onSubmit = rawMaterial1.id == "" ? save : edit;
	const openModal = (d: RawMaterial, disable: boolean) => {
		setrawMaterial1(d);
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
				title={
					rawMaterial1.id == ""
						? "Nouvelle Famille Matière première"
						: "Modifier Famille Matière première"
				}
				format={+classNames("5")}
				close={close}>
				<div className='float-left w-full text-sm'>
					<Form
						defaultValues={rawMaterial1} onSubmit={onSubmit}>
						<div className=' float-left w-1/2'>
							<Field
								label={<Required msg='Désignation' />}
								name='design'
								disabled={disabled}
								onChange={(e: ChangeEvent<HTMLSelectElement>) => {
									setrawMaterial1({ ...rawMaterial1, design: e.target.value });
								}}
							/>
						</div>
						<div className='float-left w-full'>
							<div className='float-left w-1/2'>
								<Field
									label={<Required msg='Nomenclature' />}
									name='nomenclature'
									disabled={disabled}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => {
										setrawMaterial1({ ...rawMaterial1, nomenclature: e.target.value });
									}}
								/>
							</div>
							<div className='float-right w-1/2'>
								<Field
							disabled={disabled}
							label='Famille Mère'
							name='family'
							as='select'
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								setrawMaterial1({ ...rawMaterial1, family: e.target.value });
							}}>
							{
								//@ts-ignore
								["", ...(tabFamille || [])]?.map((c: RawMaterial) => (
									<option key={c.id} value={c.id}>
										{c.design}
									</option>
								))
							}
						</Field>
							</div>
						</div>
						<div className='float-left w-full'>
							<div className='float-left w-1/2'>
								<Field
							disabled={disabled}
							label={<Required msg='Unité De Mesure' />}
							name='measureUnit'
							as='select'
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								setrawMaterial1({ ...rawMaterial1, measureUnit: e.target.value });
							}}>
							{
								//@ts-ignore
								["", ...(tabUnit || [])]?.map((c: UnitMeasure) => (
									<option key={c.id} value={c.id}>
										{c.design}
									</option>
								))
							}
						</Field>
							</div>
							<div className='float-right w-1/2'>
								<Field
									label={<Required msg='Taux de perte' />}
									name='tauxPertes'
									disabled={disabled}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => {
										setrawMaterial1({ ...rawMaterial1, tauxPertes: +e.target.value });
									}}
								/>
							</div>
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
							{rawMaterial1.id == "" && (
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

export default forwardRef(FormRawMaterial);
