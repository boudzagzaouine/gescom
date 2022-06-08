import React, { useEffect } from 'react';
import { AdressLiv } from 'tools/types';
import { Field, Form } from 'widgets';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';
import Table from 'widgets/Table';

type FormAdressLivraisonsProp = {
	adressLiv: AdressLiv;
	saveAdressLiv: (art: AdressLiv) => void;
	close: () => void;
	refetch: () => void;
}; //
const FormAdressLivraisons = ({
	adressLiv,
	saveAdressLiv,
	close,
	refetch,
}: FormAdressLivraisonsProp) => {
	return (
		<>
			<tr className='relative'>
				<div className='absolute left-0 top-0 bg-[#ccc] pr-2'>
					<Form defaultValues={adressLiv} onSubmit={saveAdressLiv}>
						{/* <Table.td>cf45d616-39c6-4317-96dd-da3b82ee13d8</Table.td> */}
						<Table.td>
							<span className='block float-left py-2.5'>
								XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
							</span>{" "}
						</Table.td>
						<Table.td>
							<Field name='country' placeholder='country' />
						</Table.td>
						<Table.td>
							<Field name='city' placeholder='city' />
						</Table.td>
						<Table.td>
							<Field name='adress' placeholder='adress' />
						</Table.td>
						<Table.td>
							<div className='float-right w-full'>
								<Bsave
									onClick={() => {
										setTimeout(() => {
											refetch();
										}, 500);
									}}
								/>
							</div>
						</Table.td>
					</Form>
					<div className='float-right w-full'>
						<Bcancel
							className='absolute right-0'
							onClick={() => {
								close();
							}}
						/>
					</div>
				</div>
			</tr>
		</>
	);
};

export default FormAdressLivraisons;
