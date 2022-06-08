import Link from "next/link";
import { useRouter } from "next/router";
import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import {
  CLIENT_MANAGER,
  PURCHASE_MANAGER,
  VENDOR_MANAGER,
  BUREAU_DOUANE,
  DECLARANT_GES,
  FAMILLE_ARTICLE,
  FAMILLE_MATIERE_PREMIERE,
  INCOTERM_GES,
  MODE_PAYEMENT,
  REGIME_DOUANIER,
  UNIT_MEASURE,
  DEVISE_MANAGER,
  DOCUMENT_MANAGER,
  PAYS_MANAGER,
  ROLE_MANAGER,
  TRANSPORTEUR_MANAGER,
  TYPE_MANAGER,
  VILLE_MANAGER,
  USER_MANAGER,
  COLISAGE_MANAGER,
} from "tools/consts";
import Icon from "widgets/Icon";
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
      text: "Gestion Fournisseurs",
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
      text: "Gestion Achats",
      link: "/manager/purchase/Reception",
      active:
        route.pathname == "/manager/purchase/Reception" ||
        route.pathname == "/manager/purchase/RightOfReturn" ||
        route.pathname == "/manager/purchase/StockStatus" ||
        route.pathname == "/manager/purchase/InputOutputHistory",
      sous: [],
    },
    {
      id: COLISAGE_MANAGER,
      icon: "shopping-bag",
      text: "Gestion Colisage",
      link: "/manager/colisage/GestionColisage",
      active: route.pathname == "/manager/colisage/GestionColisage",
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
      link: "/reference/unitMeasure",
      active: route.pathname == "/reference/[reference]"|| route.pathname == "/reference2/Role",

      /*  active: route.pathname == "/reference/unitMeasure" || route.pathname == "/reference/article" || route.pathname == "/reference/rawMaterial" || route.pathname == "/reference/bureauDouane" || route.pathname == "/reference/regimeDouanier" || route.pathname == "/reference/payementMode" || route.pathname == "/reference/incoterm" || route.pathname == "/reference/declarant" || route.pathname == "/reference/Transporteur" || route.pathname == "/reference/Document" || route.pathname == "/reference/Devise" || route.pathname == "/reference/Pays" || route.pathname == "/reference/Ville" || route.pathname == "/reference/Type" || route.pathname == "/reference2/Role", */
      sous: [
        {
          id: 1000,
          text: "test coco",
          link: "/reference/coco",
          active: route.asPath == "/reference/coco",
        },
        {
          id: UNIT_MEASURE,
          text: "Unités de Mesure",
          link: "/reference/unitMeasure",
          active: route.asPath == "/reference/unitMeasure",
        },
        {
          id: FAMILLE_ARTICLE,
          text: "Familles Article",
          link: "/reference/article",
          active: route.asPath == "/reference/article",
        },
        {
          id: FAMILLE_MATIERE_PREMIERE,
          text: "Familles Matière première",
          link: "/reference/rawMaterial",
          active: route.asPath == "/reference/rawMaterial",
        },
        {
          id: BUREAU_DOUANE,
          text: "Bureaux de Douane",
          link: "/reference/bureauDouane",
          active: route.asPath == "/reference/bureauDouane",
        },
        {
          id: REGIME_DOUANIER,
          text: "Régimes Douaniers",
          link: "/reference/regimeDouanier",
          active: route.asPath == "/reference/regimeDouanier",
        },
        {
          id: MODE_PAYEMENT,
          text: "Mode De Réglement",
          link: "/reference/payementMode",
          active: route.asPath == "/reference/payementMode",
        },
        {
          id: INCOTERM_GES,
          text: "Incoterms",
          link: "/reference/incoterm",
          active: route.asPath == "/reference/incoterm",
        },
        {
          id: DECLARANT_GES,
          text: "Déclarants",
          link: "/reference/declarant",
          active: route.asPath == "/reference/declarant",
        },
        {
          id: TRANSPORTEUR_MANAGER,
          text: "Transporteurs",
          link: "/reference/Transporteur",
          active: route.asPath == "/reference/Transporteur",
        },
        {
          id: DOCUMENT_MANAGER,
          text: "Documents",
          link: "/reference/Document",
          active: route.asPath == "/reference/Document",
        },
        {
          id: DEVISE_MANAGER,
          text: "Devises",
          link: "/reference/Devise",
          active: route.asPath == "/reference/Devise",
        },
        {
          id: PAYS_MANAGER,
          text: "Pays",
          link: "/reference/Pays",
          active: route.asPath == "/reference/Pays",
        },
        {
          id: VILLE_MANAGER,
          text: "Villes",
          link: "/reference/Ville",
          active: route.asPath == "/reference/Ville",
        },
        {
          id: TYPE_MANAGER,
          text: "Types En-Têtes",
          link: "/reference/Type",
          active: route.asPath == "/reference/Type",
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
      <ul className="nav-horiz bg-[#2B5173] h-full">
        <h2 className="bg-[#000] bg-opacity-10 text-[#fff] w-full float-left py-2.5">
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
                <span className="icon">
                  <Icon i={item.icon} cl="" />
                </span>
                <span className="text">{item.text}</span>
              </a>
            </Link>
            {item.active && (
              <ul className="ml-20 list-[disclosure-closed] mt-8">
                {item.sous.map((sItem) => (
                  <li
                    key={sItem.id}
                    className={
                      "cursor-pointer text-sm text-[#fff] w-full float-left py-2.5 " +
                      (sItem.active
                        ? "border-l-2 border-white bg-opacity-10 bg-[#000]"
                        : "border-l-0 bg-transparent")
                    }
                    onClick={() => updateSel(sItem.id)}
                  >
                    <Link href={sItem.link}>
                      <a>
                        <span className="text">{sItem.text}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <div className="w-full flex justify-center py-5 float-left">
          <img src="/images/logo-4.png" alt="" />
        </div>
      </ul>
    </>
  );
};

export default NavVert;
