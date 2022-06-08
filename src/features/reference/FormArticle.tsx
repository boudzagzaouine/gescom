import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { Article, article0, ArticleJson } from "tools/types";
import {
  ARCHIVE,
  DEL,
  REQUEST_EDIT,
  REQUEST_SAVE,
  RESTORE,
} from "tools/consts";
import { Form, Field, Button } from "widgets";
import Modal from "widgets/Modal";
import Bcyan from "widgets/Bcyan";
import classNames from "classnames";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import Mitems from "widgets/Mitems";
import {
  ArchiveIcon,
  ClipboardListIcon,
  PencilAltIcon,
  ReplyIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Pagin from "widgets/Pagin";
import Icon from "widgets/Icon";
import { openArticles, OpenArticleProp } from "config/rtk/rtkArticle";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import Bcancel from "widgets/Bcancel";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";
import Action from "widgets/Action";
import MitemsRef from "widgets/MitemsRef";

type FormArticleProps = {
  article: Article;
};
const FormArticle = ({ article }: FormArticleProps, ref: Ref<void>) => {
  const articlesToOpen: OpenArticleProp = openArticles();
  const articleJson: ArticleJson = articlesToOpen.data;
  const articles: Article[] = articleJson.content;
  const refetchArticle: () => void = articlesToOpen.refetch;
  const saveArticle = articlesToOpen.save;
  const editArticle = articlesToOpen.edit;

  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetchArticle();
  };

  //const { data = [], isFetching, refetch } = usePaginationArticlesQuery(0);
  const [article1, setArticle1] = useState<Article>(article0);
  const [request, setRequest] = useState(REQUEST_SAVE);

  //const [save] = useAddArticleMutation();

  const [form, setForm] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const [show, setShow] = useState(false);
  const open = (a: Article) => {
    setArticle1(a);
    setShow(true);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = open;
  });

  const closed = () => {
    setShow(false);
    setDisabled(true);
  };

  const showFormulaire = (article: Article) => {
    setArticle1(article);
    setForm(true);
    setRequest(REQUEST_EDIT);
  };

  const FormAsEdit = (article: Article) => {
    setDisabled(true);
    showFormulaire(article);
  };
  const FormAsUpdate = (article: Article) => {
    setDisabled(false);
    open(article);
  };

  const void_ = () => {};

  //const [updateArticle] = useEditArticleMutation();

  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={restore}
            action={RESTORE}
          />
          <h1>Familles Article</h1>
          <div className="float-left w-full">
            <button
              className="bg-sky-900 p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left"
              onClick={() => {
                setDisabled(false);
                open(article0);
              }}
            >
              Nouvelle Famille Article
            </button>
            <div className="float-right">
              <Button className="bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg">
                <Icon i="search" cl="" />
              </Button>
              <input
                type="text"
                className="py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96"
              />
            </div>
          </div>
          <Table
            className="tab-list float-left w-full mt-8 tab-list float-left w-full"
            thead={
              <tr>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Désignation
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Nomenclature
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  Taux de perte
                </th>
                <th></th>
              </tr>
            }
          >
            {
              //@ts-ignore
              articles?.map((article: Article) => {
                return (
                  //@ts-ignore
                  <tr key={article.id}>
                    <Table.td>{article.design}</Table.td>
                    <Table.td>{article.nomenclature}</Table.td>
                    <Table.td>
                      {article.tauxPertes}
                      {"%"}
                    </Table.td>

                    <Table.td className="cursor-pointer">
                      <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(article.id, article.design);
                        }}
                        /*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
                        del={() => {
                          //@ts-ignore
                          del.current(article.id, article.design);
                        }}
                        obj={article}
                        update={() => {
                          FormAsUpdate(article);
                        }}
                      />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin
            load={loadPage}
            max={articles?.length}
            visible={articles?.length > 0 ? true : false}
          />
        </section>
      )}
      <ModalS
        show={show}
        title={
          article1.id == ""
            ? "Nouvelle Famille Article"
            : "Modifier Famille Article"
        }
        format={+classNames("5")}
        close={closed}
      >
        <div className="float-left w-full text-sm">
          <Form
            defaultValues={article1}
            onSubmit={
              request == REQUEST_SAVE
                ? saveArticle
                : request == REQUEST_EDIT
                ? editArticle
                : void_
            }
          >
            <div className=" float-left w-1/2">
              <Field
                label={<Required msg="Désignation" />}
                name="design"
                disabled={disabled} //required={true}
              />
            </div>
            <div className="float-left w-full">
              <div className="float-left w-1/2">
                <Field
                  label={<Required msg="Nomenclature" />}
                  name="nomenclature"
                  disabled={disabled} //required={true}
                />
              </div>
              <div className="float-right w-1/2">
                <Field
                  label={<Required msg="Taux de perte" />}
                  name="tauxPertes"
                  disabled={disabled} //required={true}
                />
              </div>
            </div>

            <div className="mt-5 b-ajust-r">
              <Bsave
                className="float-right"
                onClick={() => {
                  setTimeout(() => {
                    refetchArticle();
                    closed();
                  }, 500);
                }}
              />
              {article1.id == "" && (
                <BsavEndNew
                  className="ml-10 mr-2"
                  onClick={() => {
                    setTimeout(() => {
                      refetchArticle();
                    }, 500);
                  }}
                />
              )}
            </div>
          </Form>
          <Bcancel
            className="float-right mt-5 b-ajust"
            onClick={() => {
              setDisabled(false);
              setShow(false);
            }}
          />
        </div>
      </ModalS>
    </>
  );
};

export default forwardRef(FormArticle);
