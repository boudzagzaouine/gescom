import classNames from 'classnames';
import { useOpenIdsObjects } from 'config/rtk/rtkGen';
import dateFormat from 'dateformat';
import React, { ChangeEvent, forwardRef, ReactNode, Ref, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Attribut, DisplayedIncheckProps, IdsObject, IdsObjectJson, tabProp } from 'tools/types';
import Calendar from 'widgets/Calendar';

import Avatar from './Avatar';
import Bcancel from './Bcancel';
import Bsave from './Bsave';
import BsavEndNew from './BsavEndNew';
import CloseCalendar from './CloseCalendar';
import { Field } from './Field';
import { Form } from './Form';
import ModalGeneric from './ModalGeneric';
import NavTabs from './NavTabs';
import Required from './Required';
import ShowCheckedsField from './ShowCheckedsField';
import Title from './Title';
import { MenuNavTabs } from './TypeWidgets';
import Xclose from './Xclose';

//@ts-ignore
type ListProp<E extends IdsObject, J extends IdsObjectJson> = {
	title: string;
	mal: boolean;
	body: Attribut[];
	displayedIncheck: DisplayedIncheckProps;
	objectIn: E;
	save: () => void;
	edit: () => void;
	refetch: () => void;
	path: string;
	avatar: boolean;
	rectoVerso: boolean;
	show: boolean;
	closed: () => void;
	arrayFromSelect: tabProp<E>;
	detailObjects: MenuNavTabs[];
};
/* const tabSelect = (path: string) => {
  const obj0=openIdsObjects(path)
  //const obj = useSelector(state=>state.obj0);
  return obj0?.tab||[{id:"",design:"fofo"}];
}; */

type GenericSelectProp<E extends IdsObject, J extends IdsObjectJson> = {
	disabled: boolean;
	b: Attribut;
	object: E;
	setObject: (o: E) => void;
};
const GenericSelect = <E extends IdsObject, J extends IdsObjectJson, Ref>({
	disabled,
	b,
	object,
	setObject,
}: GenericSelectProp<E, J>) => {
	const openSel = useOpenIdsObjects(b.path);
	//@ts-ignore
	const list: E[] = openSel.tab;
	return (
		<Field
			disabled={disabled}
			label={b.required ? <Required msg={b.label} /> : b.label}
			name={b.attr}
			as='select'
			onChange={(e: ChangeEvent<HTMLSelectElement>) => {
				let o: E = { ...object };
				let key: string = b.attr;
				//@ts-ignore
				o[key] = e.target.value;
				setObject(o);
			}}>
			{
				//@ts-ignore
				["", ...(list || [])]?.map(
					//@ts-ignore
					(c: E) => (
						<option key={c.id} value={c.id}>
							{c.design}
						</option>
					),
				)
			}
		</Field>
	);
};

const FormModal = <E extends IdsObject, J extends IdsObjectJson, Ref>(
	{
		title,
		mal,
		body,
		displayedIncheck,
		arrayFromSelect,
		objectIn,
		save,
		edit,
		refetch,
		path,
		avatar,
		rectoVerso,
		show,
		closed,
		detailObjects,
	}: ListProp<E, J>,
	ref: Ref,
) => {
	try {
		const [disabled, setDisabled] = useState(false);
		const [object, setObject] = useState<E>(objectIn);

		//getList(b.path,arrayFromSelect)

		//  console.log("tabs = "+JSON.stringify(arrayFromSelect))
		//@ts-ignore
		const [startDate, setStartDate] = useState(object?.date);
		const [openCalendar, setOpenCalendar] = useState(false);

		const load = (u: E) => {
			setObject({ ...u, path: path });
		};

		useEffect(() => {
			//@ts-ignore
			ref.current = load;
		});
		const getField = (b: Attribut) => {
			switch (b.type) {
				case "attr":
					return (
						<Field
							label={b.required ? <Required msg={b.label} /> : b.label}
							name={b.attr}
							disabled={disabled}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								let o: E = { ...object };
								let key: string = b.attr;
								//@ts-ignore
								o[key] = e.target.value;
								setObject(o);
							}}
						/>
					);
					break;
				case "attrArea":
					return (
						<Field
							label={b.required ? <Required msg={b.label} /> : b.label}
							name={b.attr}
							as='textarea'
							disabled={disabled}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								let o: E = { ...object };
								let key: string = b.attr;
								//@ts-ignore
								o[key] = e.target.value;
								setObject(o);
							}}
						/>
					);
					break;
				case "select":
					return (
						<GenericSelect
							b={b}
							disabled={disabled}
							object={object}
							setObject={setObject}
						/>
					);
					break;
				case "date":
					return (
						<>
							<Field
								disabled={disabled}
								label={b.required ? <Required msg={b.label} /> : b.label}
								name='date33'
								value={dateFormat(startDate, "dd-mm-yyyy")}
								onFocus={() => {
									setOpenCalendar(true);
								}}
							/>
							{openCalendar && (
								<>
									<DatePicker
										selected={startDate}
										name='date11'
										onChange={(d: Date) => {
											setStartDate(d);
											setObject({ ...object, date: d });
											setOpenCalendar(false);
										}}
										dateFormat='dd-MM-yyyy'
										calendarContainer={Calendar}
										inline
									/>
								</>
							)}
						</>
					);
					break;
				default:
					return <></>;
					break;
			}
		};
		return (
			<ModalGeneric
				show={show}
				title={
					object.id == ""
						? (mal ? "Nouveau " : "Nouvelle ") + title
						: "Modifier " + title
				}
				modal={!rectoVerso}
				close={closed}>
				{show && (
					<div className='float-left w-full text-xs'>
						{rectoVerso && (
							<>
								<Title msg={title} id={object.id} edit={disabled} />
								<Xclose close={closed} />
							</>
						)}
						<Form
							//@ts-ignore
							defaultValues={object}
							onSubmit={object?.id == "" ? save : edit}>
							<CloseCalendar open={openCalendar} setOpen={setOpenCalendar} />

							<div
								className={classNames(
									"float-left",
									avatar ? "w-5/6" : "w-full",
								)}>
								{body?.map((b: Attribut) => (
									<div className={classNames(b.css)}>{getField(b)}</div>
								))}
								{displayedIncheck?.tab?.length > 0 && (
									<div className={classNames(displayedIncheck.css)}>
										<ShowCheckedsField
											msg={displayedIncheck.msg}
											isAdd={object.id == ""}>
											{displayedIncheck?.tab?.map((b: Attribut) => (
												<div className={classNames(b.css)}>{getField(b)}</div>
											))}
										</ShowCheckedsField>
									</div>
								)}
							</div>

							{avatar && (
								<div className='float-left w-1/6'>
									<Avatar />
								</div>
							)}
							<div className='mt-5 b-ajust-r'>
								<Bsave
									className='float-right'
									onClick={() => {
										setTimeout(() => {
											refetch();
											closed();
										}, 500);
									}}
								/>
								<BsavEndNew
									className='ml-10 mr-2'
									onClick={() => {
										setTimeout(() => {
											refetch();
										}, 500);
									}}
								/>
							</div>
						</Form>
						<Bcancel
							className='float-right mt-5 b-ajust'
							onClick={() => {
								closed();
							}}
						/>
					</div>
				)}
				{object.id != "" && show && detailObjects.length > 0 && (
					<NavTabs tab={detailObjects} />
				)}
			</ModalGeneric>
		);
	} catch (error) {
		return <></>;
	}
};

export default forwardRef(FormModal);
