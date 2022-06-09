import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { HOME } from 'tools/consts';

import Nav from './Nav';
import NavVert from './NavVert';
import NavVertBeta from './NavVertBeta';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const router = useRouter();

	const [selected, setSelected] = useState(HOME);
	const updateSel = (s: number) => {
		setSelected(s);
	};

	const { data: session, status } = useSession();
	//status = unauthenticated
	//status = authenticated
	//status = loading
	//console.log("jwt = " + session?.accessToken + " , status = " + status);
	const [loading, setLoading] = useState(true);
	const securePage = async () => {
		const session = await getSession();
		if (session) {
			setLoading(true);
		} else {
			setLoading(false);
			setTimeout(() => {
				//   signIn("keycloak")
			}, 200);
		}
		//   const token = await getToken()
		//console.log("JSON Web Token ... ::: ", token)
	};
	const securePage2 = async () => {
		const session = await getSession();
		if (!session) {
			signIn("keycloak");
		}
	};

	useEffect(() => {
		//   securePage2();
		//if(loading && !session)window.location.href="/"
		//
	}, []);
	const isBeta = false;
	const block = () => {
		return (
			<section className='bg-slate-100 float-left w-full'>
				<div className='w-1/6 float-left'>
					{!isBeta && <NavVert updateSel={updateSel} />}
					{isBeta && <NavVertBeta updateSel={updateSel} />}
				</div>
				<div className=' py-6 sm:px-6 lg:px-8 w-5/6 float-left'>{children}</div>
			</section>
		);
	};

	return (
		<>
			<Nav selected={selected} loading={true} />
			{
				//loading && session && status === "authenticated" &&  block()
			}
			{block()}
			{/*  {loading && session && <section className="bg-slate-100 float-left w-full">
          <div className="w-1/6 float-left">
            <NavVert updateSel={updateSel} />
          </div>
         <div className=" py-6 sm:px-6 lg:px-8 w-5/6 float-left">{children}</div> 
  
        </section>}
        {loading && !session && <img src="/images/wait.gif" className="w-1/4 float-left" alt="" />}
        {!loading  && !session && <div><h1>gescom</h1></div> } 
        
        */}
		</>
	);
	//
};

export default Layout;
