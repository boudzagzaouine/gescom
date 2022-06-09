import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import {
    BUREAU_DOUANE,
    CLIENT_MANAGER,
    COLISAGE_MANAGER,
    DECLARANT_GES,
    DEVISE_MANAGER,
    DOCUMENT_MANAGER,
    FAMILLE_ARTICLE,
    FAMILLE_MATIERE_PREMIERE,
    INCOTERM_GES,
    MODE_PAYEMENT,
    PAYS_MANAGER,
    PURCHASE_MANAGER,
    REGIME_DOUANIER,
    ROLE_MANAGER,
    TRANSPORTEUR_MANAGER,
    TYPE_MANAGER,
    UNIT_MEASURE,
    VENDOR_MANAGER,
    VILLE_MANAGER,
} from 'tools/consts';
import Icon from 'widgets/Icon';

type NavVertProps = {
	updateSel: (s: number) => void;
};
const NavVert = ({ updateSel }: NavVertProps) => {
	const route = useRouter();
	const [sous, setSous] = useState(-1);
	const prev = useRef(-1);
	//  console.log("route = " + JSON.stringify(route));
	useEffect(() => {
		prev.current = sous;
	}, []);

	const menuVert = [
		{
			id: 7,
			icon: "home",
			text: "Acceuil",
			link: "/",
			active: route.pathname == "/",
			sous: [],
		},
		{
			id: CLIENT_MANAGER,
			icon: "user-circle",
			text: "Gestion Clients",
			link: "/manager/client-beta/ClientManager",
			active:
				route.pathname == "/manager/client-beta/ClientManager" ||
				route.pathname == "/manager/client-beta/CommandeClientManager" ||
				route.pathname == "/manager/client-beta/SoldeCommandeClientManager",
			sous: [],
		},
		{
			id: VENDOR_MANAGER,
			icon: "truck",
			text: "Gestion Fournisseurs",
			link: "/manager/vendor-beta/VendorManager",
			active:
				route.pathname == "/manager/vendor-beta/VendorManager" ||
				route.pathname == "/manager/vendor-beta/CommandeVendor" ||
				route.pathname == "/manager/vendor-beta/RawMaterielManager" ||
				route.pathname == "/manager/vendor-beta/CommandeVendorManager",
			sous: [],
		},
		/* {id:USER_MANAGER,
      icon: "user-circle",
      text: "Gestion Utilisateur",
      link: "/gestionutilisateur/GestionUtilisateur",
      active: route.pathname == "/gestionutilisateur/GestionUtilisateur",
      sous:[]
    }, */
		{
			id: PURCHASE_MANAGER,
			icon: "shopping-bag",
			text: "Gestion Achats",
			link: "/manager/purchase-beta/Reception",
			active:
				route.pathname == "/manager/purchase-beta/Reception" ||
				route.pathname == "/manager/purchase-beta/RightOfReturn" ||
				route.pathname == "/manager/purchase-beta/StockStatus" ||
				route.pathname == "/manager/purchase-beta/InputOutputHistory",
			sous: [],
		},
		{
			id: COLISAGE_MANAGER,
			icon: "shopping-bag",
			text: "Gestion Colisage",
			link: "/manager/colisage-beta/GestionColisage",
			active: route.pathname == "/manager/colisage-beta/GestionColisage",
			sous: [],
		},
		/* {
      id: 11,
      icon: "home",
      text: "test",
      link: "/Test",
      active: route.pathname == "/Test",
      sous: []
    },
    {
      id: 12,
      icon: "home",
      text: "liste des icons",
      link: "/documentation/ListIcons",
      active: route.pathname == "/ee",
      sous: []
    }, */
		{
			id: 13,
			icon: "table",
			text: "Gestion des Tables",
			link: "/reference-beta/unitMeasure",
			active:
				route.pathname == "/reference-beta/[reference]" ||
				route.pathname == "/reference2/Role",

			/*  active: route.pathname == "/reference-beta/unitMeasure" || route.pathname == "/reference-beta/article" || route.pathname == "/reference-beta/rawMaterial" || route.pathname == "/reference-beta/bureauDouane" || route.pathname == "/reference-beta/regimeDouanier" || route.pathname == "/reference-beta/payementMode" || route.pathname == "/reference-beta/incoterm" || route.pathname == "/reference-beta/declarant" || route.pathname == "/reference-beta/Transporteur" || route.pathname == "/reference-beta/Document" || route.pathname == "/reference-beta/Devise" || route.pathname == "/reference-beta/Pays" || route.pathname == "/reference-beta/Ville" || route.pathname == "/reference-beta/Type" || route.pathname == "/reference2/Role", */
			sous: [
				/*  {
          id: 1000,
          text: "test coco",
          link: "/reference-beta/coco",
          active: route.asPath == "/reference-beta/coco",
        }, */
				{
					id: UNIT_MEASURE,
					text: "Unités de Mesure",
					link: "/reference-beta/unitMeasure",
					active: route.asPath == "/reference-beta/unitMeasure",
				},
				{
					id: FAMILLE_ARTICLE,
					text: "Familles Article",
					link: "/reference-beta/article",
					active: route.asPath == "/reference-beta/article",
				},
				{
					id: FAMILLE_MATIERE_PREMIERE,
					text: "Familles Matière première",
					link: "/reference-beta/rawMaterial",
					active: route.asPath == "/reference-beta/rawMaterial",
				},
				{
					id: BUREAU_DOUANE,
					text: "Bureaux de Douane",
					link: "/reference-beta/bureauDouane",
					active: route.asPath == "/reference-beta/bureauDouane",
				},
				{
					id: REGIME_DOUANIER,
					text: "Régimes Douaniers",
					link: "/reference-beta/regimeDouanier",
					active: route.asPath == "/reference-beta/regimeDouanier",
				},
				{
					id: MODE_PAYEMENT,
					text: "Mode De Réglement",
					link: "/reference-beta/payementMode",
					active: route.asPath == "/reference-beta/payementMode",
				},
				{
					id: INCOTERM_GES,
					text: "Incoterms",
					link: "/reference-beta/incoterm",
					active: route.asPath == "/reference-beta/incoterm",
				},
				{
					id: DECLARANT_GES,
					text: "Déclarants",
					link: "/reference-beta/declarant",
					active: route.asPath == "/reference-beta/declarant",
				},
				{
					id: TRANSPORTEUR_MANAGER,
					text: "Transporteurs",
					link: "/reference-beta/Transporteur",
					active: route.asPath == "/reference-beta/Transporteur",
				},
				{
					id: DOCUMENT_MANAGER,
					text: "Documents",
					link: "/reference-beta/Document",
					active: route.asPath == "/reference-beta/Document",
				},
				{
					id: DEVISE_MANAGER,
					text: "Devises",
					link: "/reference-beta/Devise",
					active: route.asPath == "/reference-beta/Devise",
				},
				{
					id: PAYS_MANAGER,
					text: "Pays",
					link: "/reference-beta/Pays",
					active: route.asPath == "/reference-beta/Pays",
				},
				{
					id: VILLE_MANAGER,
					text: "Villes",
					link: "/reference-beta/Ville",
					active: route.asPath == "/reference-beta/Ville",
				},
				{
					id: TYPE_MANAGER,
					text: "Types En-Têtes",
					link: "/reference-beta/Type",
					active: route.asPath == "/reference-beta/Type",
				},
				{
					id: ROLE_MANAGER,
					text: "Rôles",
					link: "/reference2/Role",
					active: route.asPath == "/reference2/Role",
				},
			],
		},
	];
	useEffect(() => {});
	return (
		<>
			<ul className='nav-horiz bg-[#2B5173] h-full'>
				<h2 className='bg-[#000] bg-opacity-10 text-[#fff] w-full float-left py-2.5'>
					GESTION COMMERCIAL BETA{" "}
				</h2>
				{menuVert.map((item) => (
					<li
						key={item.icon}
						className={
							"cursor-pointer text-sm text-[#fff] w-full float-left py-2.5 " +
							(item.active
								? "border-l-2 border-white bg-opacity-10 bg-[#000]"
								: "border-l-0 bg-transparent")
						}
						/*  onClick={() => {
              updateSel(item.id);
              setSous(item.id);
           }} */
					>
						<Link href={item.link || ""}>
							<a>
								<span className='icon'>
									<Icon i={item.icon} cl='' />
								</span>
								<span className='text'>{item.text}</span>
							</a>
						</Link>
						{item.active && (
							<ul className='ml-20 list-[disclosure-closed] mt-8'>
								{item.sous.map((sItem) => (
									<li
										key={sItem.id}
										className={
											"cursor-pointer text-sm text-[#fff] w-full float-left py-2.5 " +
											(sItem.active
												? "border-l-2 border-white bg-opacity-10 bg-[#000]"
												: "border-l-0 bg-transparent")
										}
										onClick={() => updateSel(sItem.id)}>
										<Link href={sItem.link}>
											<a>
												<span className='text'>{sItem.text}</span>
											</a>
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
				<div className='w-full flex justify-center py-5 float-left'>
					<img src='/images/logo-4.png' alt='' />
				</div>
			</ul>
		</>
	);
};

export default NavVert;
