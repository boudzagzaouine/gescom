import { openFamilleF, OpenRawMaterialProp, openRawMaterials } from "config/rtk/rtkRawMaterial";
import { useRef, useState } from "react";
import { RawMaterial, rawMaterial0, RawMaterialJson } from "tools/types";
import Action from "widgets/Action";
import Section from "widgets/Section";
import { ARCHIVE, DEL, RESTORE } from 'tools/consts';
import Bcyanxl from "widgets/Bcyanxl";
import FormRawMaterial from "./FormRawMaterial";
import { Button } from "widgets";
import Icon from "widgets/Icon";
import Table from "widgets/Table";
import Pagin from "widgets/Pagin";
import MitemsRef from "widgets/MitemsRef";
import { getLine } from "tools/Methodes";

function ListRawMaterialManager() {
	const [page, setPage] = useState(0);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
	};

	const rawMaterialsToOpen: OpenRawMaterialProp = openRawMaterials(page);
	const rawMaterialJson: RawMaterialJson = rawMaterialsToOpen.data;
	const rawMaterials: RawMaterial[] = rawMaterialJson.content;
	const refetch: () => void = rawMaterialsToOpen.refetch;
	const save = rawMaterialsToOpen.save;
	const edit = rawMaterialsToOpen.edit;
	const refCom = useRef(null);
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);
	const tabFamille: RawMaterial[] = openFamilleF().data.content;
	return (
		<>
			<Section>
                    <Action
						id=''
						path='rawMaterials'
						design=''
						type='Famille Matière Première'
						ref={del}
						action={DEL}
					/>
					<Action
						id=''
						path='rawMaterials'
						design=''
						type='Famille Matière Première'
						ref={archive}
						action={ARCHIVE}
					/>
					<Action
						id=''
						path='rawMaterials'
						design=''
						type='Famille Matière Première'
						ref={restore}
						action={RESTORE}
					/>
					<h1>Familles Matière première</h1>
                    <div className='float-left w-full'>
					<Bcyanxl
						className='float-left'
						onClick={() => {
							//@ts-ignore
							refCom.current(rawMaterial0, false);
						}}>
						Nouvelle Famille Matière première
					</Bcyanxl>
					<FormRawMaterial
						refetch={refetch}
						save={save}
						edit={edit}
						rawMaterial={rawMaterial0}
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
							<Table.th>Nomenclature</Table.th>
							<Table.th>Taux de perte</Table.th>
							<Table.th>Famille</Table.th>
							<Table.th></Table.th>
						</tr>
					}>
						{
							rawMaterials?.map((rawMaterial: RawMaterial) => {
								return (
									<tr key={rawMaterial.id}>
										<Table.td>{rawMaterial.design}</Table.td>
										<Table.td>{rawMaterial.nomenclature}</Table.td>
										<Table.td>
											{rawMaterial.tauxPertes}
											{"%"}
										</Table.td>
										<Table.td>{getLine(rawMaterial.family, tabFamille)?.design}
										</Table.td>
										<Table.td className='cursor-pointer'>
											<MitemsRef
												archive={() => {
													//@ts-ignore
													archive.current(rawMaterial.id, rawMaterial.design);
												}}
												/*   restore={() => {
                                               //@ts-ignore
                                                  restore.current(client.id,client.design);
                                                 }} */
												del={() => {
													//@ts-ignore
													del.current(rawMaterial.id, rawMaterial.design);
												}}
												obj={rawMaterial}
												update={() => {
													//@ts-ignore
													refCom.current(rawMaterial, false);
												}}
											/>
										</Table.td>
									</tr>
								);
							})
						}
					</Table>
					<Pagin
						load={loadPage}
						max={rawMaterials?.length}
						visible={rawMaterials?.length > 0}
					/>
				</Section>
            </>
	);
}

export default ListRawMaterialManager;