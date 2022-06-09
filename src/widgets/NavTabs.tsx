import { Fragment, useState } from 'react';

import { MenuNavTabs } from './TypeWidgets';

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}
type NatabsProps = {
	tab: MenuNavTabs[];
};
const NavTabs = ({ tab }: NatabsProps) => {
	const [selected, setSelected] = useState(1);
	return (
		<div className='bg-white  w-full float-left h-64 mt-2'>
			<ul className='float-left'>
				{tab?.map((t) => (
					<li className='float-left relative'>
						<span
							className={
								"float-left cursor-pointer py-2 px-3 flex items-center " +
								(selected == t.id &&
									"border border-[#CECFD0] border-t border-r border-l")
							}
							onClick={() => {
								setSelected(t.id);
							}}>
							{t.name}
						</span>
						<hr
							className={
								" float-left w-full border-3 border-[#fff] absolute bottom-0 " +
								(selected != t.id && "hidden")
							}
						/>
					</li>
				))}
			</ul>
			<div className='bg-white border-t w-full float-left h-5/6 mt-m-4 overflow-auto'>
				{tab?.map((t) => selected == t.id && t.featured)}
			</div>
		</div>
	);
};

export default NavTabs;
