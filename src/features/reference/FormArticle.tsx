import React, { forwardRef, Ref, useEffect, useState } from "react";
import { Article } from "tools/types";
import { Form, Field } from "widgets";
import classNames from "classnames";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import Bcancel from "widgets/Bcancel";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";

type FormArticleProps = {
  save: () => void;
	edit: () => void;
	refetch: () => void;
	article: Article;
	disable: boolean;
};
const FormArticle = ({save, edit, refetch, article, disable }: FormArticleProps, ref: Ref<void>) => {
  const [disabled, setDisabled] = useState(disable);
	const [article1, setarticle1] = useState(article);
	const [showModal, setShowModal] = useState(false);

	const onSubmit = article1.id == "" ? save : edit;
	const openModal = (d: Article, disable: boolean) => {
		setarticle1(d);
		setShowModal(true);
		setDisabled(disable);
	};
	const close = () => {
		setShowModal(false);
	};
	useEffect(() => {
		//@ts-ignore
		ref.current = openModal;
	}, []);

  return (
      <ModalS
        show={showModal}
        title={
          article1.id == ""
            ? "Nouvelle Famille Article"
            : "Modifier Famille Article"
        }
        format={+classNames("5")}
        close={close}
      >
        <div className="float-left w-full text-sm">
          <Form
            defaultValues={article1} onSubmit={onSubmit}>
            <div className=" float-left w-1/2">
              <Field
                label={<Required msg="Désignation" />}
                name="design"
                disabled={disabled} 
              />
            </div>
            <div className="float-left w-full">
              <div className="float-left w-1/2">
                <Field
                  label={<Required msg="Nomenclature" />}
                  name="nomenclature"
                  disabled={disabled} 
                />
              </div>
              <div className="float-right w-1/2">
                <Field
                  label={<Required msg="Taux de perte" />}
                  name="tauxPertes"
                  disabled={disabled} 
                />
              </div>
            </div>

            <div className="mt-5 b-ajust-r">
              <Bsave
                className="float-right"
                onClick={() => {
                  setTimeout(() => {
                    refetch();
                    close();
                  }, 600);
                }}
              />
              {article1.id == "" && (
                <BsavEndNew
                  className="ml-10 mr-2"
                  onClick={() => {
                    setTimeout(() => {
                      refetch();
                    }, 600);
                  }}
                />
              )}
            </div>
          </Form>
          <Bcancel
            className="float-right mt-5 b-ajust"
            onClick={() => {
              close();
            }}
          />
        </div>
      </ModalS>
  );
};

export default forwardRef(FormArticle);
