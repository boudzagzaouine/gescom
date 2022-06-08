import { OpenIdsObjectProp, openIdsObjects } from 'config/rtk/rtkGen';
import React, { ChangeEvent, FC, ReactNode, useRef, useState } from 'react';
import { Attribut, DisplayedIncheckProps, IdsObject, IdsObjectJson, tabProp } from 'tools/types';
import Bcyan from 'widgets/Bcyan';

import Bcyanxl from './Bcyanxl';
import Datagrid from './Datagrid';
import FormModal from './FormModal';
import Section from './Section';
import { MenuNavTabs } from './TypeWidgets';

type ListProp<E extends IdsObject, J extends IdsObjectJson> = {
	title: string;
	mal: boolean;
	body: Attribut[];
	displayedIncheck: DisplayedIncheckProps;
	emptyObject: E;
	path: string;
	avatar: boolean;
	rectoVerso: boolean;
	detailObjects: MenuNavTabs[];
	init: (object: E, refetch: () => void) => void;
};

const List = <E extends IdsObject, J extends IdsObjectJson>({
	title,
	mal,
	body,
	displayedIncheck,
	emptyObject,
	path,
	avatar,
	rectoVerso,
	detailObjects,
	init,
}: ListProp<E, J>) => {
	const open: OpenIdsObjectProp<E, J> = openIdsObjects(path);
	const objJson: J = open.data;
	const list: E[] = open.tab;
	const refetch: () => void = open.refetch;
	const save = open.save;
	const edit = open.edit;
	const [object, setObject] = useState({ ...emptyObject, path: path });
	const [show, setShow] = useState(false);
	const RefForm = useRef(null);
	const load = (e: E) => {
		init(e, refetch);
		//@ts-ignore
		RefForm.current(e);
		setObject(e);
		setShow(true);
	};
	const closed = () => {
		init(emptyObject, refetch);
		setShow(false);
	};

	let arrayFromSelect: tabProp<E>[] = [];
	body.map((b) => {
		if (b.type == "select") {
			const tab = openIdsObjects(b.path)?.tab;
			//@ts-ignore
			arrayFromSelect.push({ path: b.path, tab: tab });
		}
	});
	return (
		<Section>
			{(!show || !rectoVerso) && (
				<>
					{title?.split(" ").length < 2 ? (
						<Bcyan
							className='float-left mt-2'
							onClick={() => {
								load(emptyObject);
							}}>
							{(mal ? "Nouveau " : "Nouvelle ") + title}
						</Bcyan>
					) : (
						<Bcyanxl
							className='float-left mt-2'
							onClick={() => {
								load(emptyObject);
							}}>
							{(mal ? "Nouveau " : "Nouvelle ") + title}
						</Bcyanxl>
					)}
				</>
			)}
			<Datagrid
				body={body}
				//@ts-ignore
				arrayFromSelect={arrayFromSelect}
				path={path}
				title={title}
				list={list}
				load={load}
				rectoVerso={rectoVerso}
				show={show}
			/>
			<FormModal
				body={body}
				detailObjects={detailObjects}
				//@ts-ignore
				arrayFromSelect={arrayFromSelect}
				displayedIncheck={displayedIncheck}
				edit={edit}
				mal={mal}
				objectIn={object}
				refetch={refetch}
				save={save}
				title={title}
				path={path}
				ref={RefForm}
				avatar={avatar}
				rectoVerso={rectoVerso}
				show={show}
				closed={closed}
			/>
		</Section>
	);
};
//b.split("#")[1]=="date"?DateFormat(l[b.split("#")[0]]):l[b]
export default List;
