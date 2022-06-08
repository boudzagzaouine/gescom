import cn from 'classnames';
import React, { forwardRef, ReactNode, Ref, useEffect } from 'react';

import Xclose from './Xclose';

type ModalProps = {
	children: ReactNode;
	title: string;
	show: boolean;
	format:number;
	close: () => void;
};
const calculClass = ({ className }: any) => {
	return cn(
		"bg-cyan-800 p-3 text-white rounded border border-cyan-900 py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
		className,
	);
};
const ModalS = ({ children, title, show, format, close }: ModalProps) => {
	const modal=true
	const [showModal, setShowModal] = React.useState(show);
	const open = () => {
		//setShowModal(true);
	};
	useEffect(() => {
		//@ts-ignore
		// ref.current = open; className={"relative w-full my-6 mx-auto max-w-" + format + "xl"}
		setShowModal(show);
	}); //
	/*
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }*/
	return (
		<>
			{modal ? (
				<>
					{showModal && (
						<>
							<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
								<div
									className={
										"relative xs:w-full sm:w-full md:w-full lg:w-full xl:w-11/12 2xl:w-1/2  my-6 "
									}>
									{/*content*/}
									<div className='border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
										<Xclose close={close} />
										{/*header*/}
										<div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 '>
											<h3 className='text-3xl font-semibold'>{title}</h3>
										</div>
										{/*body*/}
										<div className='relative p-6 flex-auto'>{children}</div>
										{/*footer*/}
										<div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 '></div>
									</div>
								</div>
							</div>
							<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
						</>
					)}
				</>
			) : (
				<>{children}</>
			)}
		</>
	);
};
export default ModalS;
