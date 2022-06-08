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
      text: "Gestion de Clients",
      link: "/manager/client/ClientManager",
      active:
        route.pathname == "/manager/client/ClientManager" ||
        route.pathname == "/manager/client/CommandeClientManager" ||
        route.pathname == "/manager/client/SoldeCommandeClientManager",
      sous: [],
    },
    {
      id: VENDOR_MANAGER,
      icon: "truck",
      text: "Gestion de Fournisseurs",
      link: "/manager/vendor/VendorManager",
      active:
        route.pathname == "/manager/vendor/VendorManager" ||
        route.pathname == "/manager/vendor/CommandeVendor" ||
        route.pathname == "/manager/vendor/RawMaterielManager" ||
        route.pathname == "/manager/vendor/CommandeVendorManager",
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
      text: "Gestion d'achats",
      link: "/manager/purchase/Reception",
      active:
        route.pathname == "/manager/purchase/Reception" ||
        route.pathname == "/manager/purchase/RightOfReturn" ||
        route.pathname == "/manager/purchase/StockStatus" ||
        route.pathname == "/manager/purchase/InputOutputHistory",
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
      link: "/reference/unitMeasure/NewUnitMeasure",
      active:
        route.pathname == "/reference/unitMeasure/NewUnitMeasure" ||
        route.pathname == "/reference/article/NewArticle" ||
        route.pathname == "/reference/rawMaterial/NewRawMaterial" ||
        route.pathname == "/reference/bureauDouane/NewBureauDouane" ||
        route.pathname == "/reference/regimeDouanier/NewRegimeDouanier" ||
        route.pathname == "/reference/payementMode/NewPayementMode" ||
        route.pathname == "/reference/incoterm/NewIncoterm" ||
        route.pathname == "/reference/declarant/NewDeclarant" ||
        route.pathname == "/reference2/Transporteur" ||
        route.pathname == "/reference2/Document" ||
        route.pathname == "/reference2/Devise" ||
        route.pathname == "/reference2/Pays" ||
        route.pathname == "/reference2/Ville" ||
        route.pathname == "/reference2/Type" ||
        route.pathname == "/reference2/Role",
      sous: [
        {
          id: UNIT_MEASURE,
          text: "Unités de Mesure",
          link: "/reference/unitMeasure/NewUnitMeasure",
          active: route.pathname == "/reference/unitMeasure/NewUnitMeasure",
        },
        {
          id: FAMILLE_ARTICLE,
          text: "Familles Article",
          link: "/reference/article/NewArticle",
          active: route.pathname == "/reference/article/NewArticle",
        },
        {
          id: FAMILLE_MATIERE_PREMIERE,
          text: "Familles Matière première",
          link: "/reference/rawMaterial/NewRawMaterial",
          active: route.pathname == "/reference/rawMaterial/NewRawMaterial",
        },
        {
          id: BUREAU_DOUANE,
          text: "Bureaux de Douane",
          link: "/reference/bureauDouane/NewBureauDouane",
          active: route.pathname == "/reference/bureauDouane/NewBureauDouane",
        },
        {
          id: REGIME_DOUANIER,
          text: "Régimes Douaniers",
          link: "/reference/regimeDouanier/NewRegimeDouanier",
          active:
            route.pathname == "/reference/regimeDouanier/NewRegimeDouanier",
        },
        {
          id: MODE_PAYEMENT,
          text: "Mode De Réglement",
          link: "/reference/payementMode/NewPayementMode",
          active: route.pathname == "/reference/payementMode/NewPayementMode",
        },
        {
          id: INCOTERM_GES,
          text: "Incoterms",
          link: "/reference/incoterm/NewIncoterm",
          active: route.pathname == "/reference/incoterm/NewIncoterm",
        },
        {
          id: DECLARANT_GES,
          text: "Déclarants",
          link: "/reference/declarant/NewDeclarant",
          active: route.pathname == "/reference/declarant/NewDeclarant",
        },
        {
          id: TRANSPORTEUR_MANAGER,
          text: "Transporteurs",
          link: "/reference2/Transporteur",
          active: route.pathname == "/reference2/Transporteur",
        },
        {
          id: DOCUMENT_MANAGER,
          text: "Documents",
          link: "/reference2/Document",
          active: route.pathname == "/reference2/Document",
        },
        {
          id: DEVISE_MANAGER,
          text: "Devises",
          link: "/reference2/Devise",
          active: route.pathname == "/reference2/Devise",
        },
        {
          id: PAYS_MANAGER,
          text: "Pays",
          link: "/reference2/Pays",
          active: route.pathname == "/reference2/Pays",
        },
        {
          id: VILLE_MANAGER,
          text: "Villes",
          link: "/reference2/Ville",
          active: route.pathname == "/reference2/Ville",
        },
        {
          id: TYPE_MANAGER,
          text: "Types En-Têtes",
          link: "/reference2/Type",
          active: route.pathname == "/reference2/Type",
        },
        {
          id: ROLE_MANAGER,
          text: "Rôles",
          link: "/reference2/Role",
          active: route.pathname == "/reference2/Role",
        },
      ],
    },
  ];
 
	
	useEffect(() => {});
	return (
		<>
			<ul className='nav-horiz bg-[#2B5173] h-full'>
				<h2 className='bg-[#000] bg-opacity-10 text-[#fff] w-full float-left py-2.5'>
					GESTION COMMERCIAL{" "}
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
