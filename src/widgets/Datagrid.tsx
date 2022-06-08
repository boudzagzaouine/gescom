import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { ARCHIVE, DEL, RESTORE } from 'tools/consts';
import { DateFormat, getLine, getList } from 'tools/Methodes';
import { Attribut, IdsObject, IdsObjectJson, tabProp } from 'tools/types';

import Action from './Action';
import MitemsRef from './MitemsRef';
import Table from './Table';

type ListProp<E extends IdsObject, J extends IdsObjectJson> = {
	title: string;
	body: Attribut[];
	path: string;
	list: E[];
	load: (e: E) => void;
	rectoVerso: boolean;
	show: boolean;
	arrayFromSelect: tabProp<E>;
};

const Datagrid = <E extends IdsObject, J extends IdsObjectJson>({
	title,
	body,
	list,
	path,
	load,
	rectoVerso,
	show,
	arrayFromSelect,
}: ListProp<E, J>) => {
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);

	const getDesign = (id: string, path: string) => {
		try {
			if (id != "") {
				//@ts-ignore
				let tab: E[] = getList(path, arrayFromSelect);
				//console.log("tab ...path "+path+" :"+JSON.stringify(tab))

				//@ts-ignore
				let obj = getLine(id, tab);
				return obj?.design;
			} else return "";
		} catch (error) {
			return "" + error;
		}
	};
	const getTd = (b: Attribut, l: E) => {
		switch (b.type) {
			case "attr":
				//@ts-ignore
				return l[b.attr];
				break;
			case "attrArea":
				//@ts-ignore
				return l[b.attr];
				break;
			case "date":
				//@ts-ignore
				return DateFormat(l[b.attr]);
				break;
			case "select":
				//@ts-ignore
				return getDesign(l[b.attr], b.path);
				break;
			case "join":
				//@ts-ignore
				return b.join;
				break;
			default:
				return "";
				break;
		}
	};
	return (
		<>
			{(!show || !rectoVerso) && (
				<>
					<Action
						id=''
						path={path}
						design=''
						type={title}
						ref={del}
						action={DEL}
					/>
					<Action
						id=''
						path={path}
						design=''
						type={title}
						ref={archive}
						action={ARCHIVE}
					/>
					<Action
						id=''
						path={path}
						design=''
						type={title}
						ref={restore}
						action={RESTORE}
					/>

					<Table
						className='tab-list float-left w-full mt-2'
						thead={
							<tr>
								{body?.map(
									(b) => b.displayed && <Table.th>{b.label}</Table.th>,
								)}
								<Table.th></Table.th>
							</tr>
							//b.split("#")[2]=="attr"?l[b.split("#")[1]]:b.split("#")[2]=="date"?DateFormat(l[b.split("#")[1]]):b.split("#")[2]=="select"?getDesign(l[b.split("#")[1]],b.split("#")[3]):b.split("#")[2]=="join"?b.split("#")[3]:""
						}>
						{list?.map((l) => (
							<tr key={l.id}>
								{
									//@ts-ignore
									body?.map(
										(b: Attribut) =>
											b.displayed && <Table.td>{getTd(b, l)}</Table.td>,
									)
								}
								<Table.td>
									<MitemsRef
										archive={() => {
											//@ts-ignoregetDesign(l[b.split("#")[1]],l[b.split("#")[3]])
											archive.current(l.id, l.design);
										}}
										del={() => {
											//@ts-ignore
											del.current(l.id, l.design);
										}}
										obj={l}
										update={() => {
											load(l);
										}}
									/>
								</Table.td>
							</tr>
						))}
					</Table>
				</>
			)}
		</>
	);
};

export default Datagrid;
