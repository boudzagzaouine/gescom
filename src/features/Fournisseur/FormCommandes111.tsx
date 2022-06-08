import { BriefcaseIcon } from "@heroicons/react/solid";
import {
  openFournisseurs,
  OpenFournisseurProp,
} from "config/rtk/rtkFournisseur";
import {
  useAddCommandeFournisseurMutation,
  useEditCommandeFournisseurMutation,
} from "config/rtk";
import React, {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useState,
} from "react";
import { style_icon, style_span } from "tools/constStyle";
import {
  CommandeFournisseur,
  f0,
  Fournisseur,
  getFournisseur,
} from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bcyan from "widgets/Bcyan";
import Bsave from "widgets/Bsave";
import Modal from "widgets/Modal";
import NavTabs from "widgets/NavTabs";
import { MenuNavTabs } from "widgets/TypeWidgets";
import ListLigneDeCommande from "./ListLigneDeCommande";
//@ts-ignore
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";
import Calendar from "widgets/Calendar";
import CloseCalendar from "widgets/CloseCalendar";
type CommandesProps = {
  command: CommandeFournisseur;
  fournisseur: Fournisseur;
  fournisseurs: Fournisseur[];
  add: () => void;
  edit: () => void;
  refetchList: () => void;
};

const FormCommandes = (
  {
    command,
    fournisseurs,
    fournisseur,
    add,
    edit,
    refetchList,
  }: CommandesProps,
  ref: Ref<void>
) => {
  const [showModal, setShowModal] = React.useState(false);
  const [command0, setCommand0] = useState(command);
  const [fournisseur0, setFournisseur0] = useState(fournisseur);
  const [startDateLiv, setStartDateLiv] = useState(command0.dateLivraison);
  const [openCalendarLiv, setOpenCalendarLiv] = useState(false);
  const [startDateCommande, setStartDateCommande] = useState(
    command0.dateCommande
  );
  const [openCalendarCommande, setOpenCalendarCommande] = useState(false);
  const openModal = (c: CommandeFournisseur, f: Fournisseur) => {
    setCommand0(c);
    setFournisseur0(f);
    setShowModal(true);
  };
  const save = command0.id == "" ? add : edit;
  const close = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  const commandes: MenuNavTabs[] = [
    {
      id: 1,
      name: (
        <>
          <BriefcaseIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Matières Premières</span>
        </>
      ),
      featured: (
        <ListLigneDeCommande
          idCommandeFournisseur={command0.id}
          idfournisseur={fournisseur0.id}
        />
      ),
    },
  ];
  return (
    <Modal
      title={
        command0.id === ""
          ? "Nouvelle Commande Fournisseur"
          : "Mise à jour de la commande"
      }
      show={showModal}
      format={5}
      close={close}
    >
      <Form defaultValues={command0} onSubmit={save}>
        <CloseCalendar
          open={openCalendarCommande}
          setOpen={setOpenCalendarCommande}
        />
        <CloseCalendar open={openCalendarLiv} setOpen={setOpenCalendarLiv} />
        <>
          <div className="mt-1">
            {fournisseur0.id != "" ? (
              <>
                <Field
                  label="Fournisseur"
                  value={fournisseur0.design}
                  disabled={true}
                />
              </>
            ) : (
              <>
                <Field
                  label="Fournisseur"
                  name="idFournisseur"
                  as="select"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    let idF: string = e.target.value;
                    setCommand0({ ...command0, idFournisseur: idF });
                  }}
                >
                  {[f0, ...(fournisseurs || [])]?.map((f: Fournisseur) => (
                    <option value={f.id}>{f.design}</option>
                  ))}
                </Field>
              </>
            )}
            <Field
              label="Date Commande"
              name="date33"
              value={dateFormat(startDateCommande, "dd-mm-yyyy")}
              onFocus={() => {
                setOpenCalendarCommande(true);
              }}
            />
            {openCalendarCommande && (
              <DatePicker
                selected={startDateCommande}
                name="date11"
                onChange={(d: Date) => {
                  setStartDateCommande(d);
                  setCommand0({ ...command0, dateCommande: d });
                  setOpenCalendarCommande(false);
                }}
                dateFormat="dd-MM-yyyy"
                calendarContainer={Calendar}
                inline
              />
            )}
            <Field
              label="Date de livraison"
              name="date333"
              value={dateFormat(startDateLiv, "dd-mm-yyyy")}
              onFocus={() => {
                setOpenCalendarLiv(true);
              }}
            />
            {openCalendarLiv && (
              <DatePicker
                selected={startDateLiv}
                name="date111"
                onChange={(d: Date) => {
                  setStartDateLiv(d);
                  setCommand0({ ...command0, dateLivraison: d });
                  setOpenCalendarLiv(false);
                }}
                dateFormat="dd-MM-yyyy"
                calendarContainer={Calendar}
                inline
              />
            )}
          </div>
          <Bsave
            className="float-right mt-2 b-ajust-r"
            onClick={() => {
              setTimeout(() => {
                refetchList();
                close();
              }, 600);
            }}
          />
        </>
      </Form>
      <Bcancel
        className="float-right mt-2 b-ajust"
        onClick={() => {
          close();
        }}
      />
      {command0.id != "" && <NavTabs tab={commandes} />}
    </Modal>
  );
};

export default forwardRef(FormCommandes);
