import { XIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import React, { ElementType } from 'react';

type XcloseProp = {
	close: () => void;
};
const calculClass = (className: string) => {
	return cn(className);
};
//x-close absolute top-1 right-1 cursor-pointer p-2.5 bg-transparent
const Xclose = ({ close }: XcloseProp) => {
	return (
		<button
			className={cn("absolute top-1 right-1 cursor-pointer  bg-transparent")}
			onClick={() => {
				close();
			}}>
			<XIcon
				className='h-8 w-8 text-[#C1BFBF] group-hover:text-gray-500'
				aria-hidden='true'
			/>
		</button>
	);
};
/*
PROD:
NEXTAUTH_URL=https://gescom.frimakers.com
# Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
NEXTAUTH_SECRET=b09acfb0047fe8d75a32d30b577c5c646a174e2aebcfa069df8fbcb29d5509bf

KEYCLOAK_ID=client
KEYCLOAK_SECRET=jsobRD42pYHjys1a8uzTI02JOwvtSRLc
KEYCLOAK_ISSUER=http://gescom-kc.frimakers.com/realms/gescom

NEXT_PUBLIC_URL=https://gescom-api.frimakers.com/api/v1
NEXT_URL_API=https://gescom-api.frimakers.com/api/v1

DEV:
NEXTAUTH_URL=http://localhost:3000
# Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
NEXTAUTH_SECRET=b09acfb0047fe8d75a32d30b577c5c646a174e2aebcfa069df8fbcb29d5509bf

KEYCLOAK_ID=client-dev
KEYCLOAK_SECRET=XEPoBmNel93ml9kH44V75pVJGE8Bn0kZ
KEYCLOAK_ISSUER=http://gescom-kc.frimakers.com/realms/gescom

NEXT_PUBLIC_URL=http://localhost:1000/api/v1
NEXT_URL_API=http://localhost:4003/
*/
export default Xclose;
