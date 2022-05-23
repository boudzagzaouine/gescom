import { TrashIcon } from '@heroicons/react/outline';
import { ArchiveIcon, ClipboardListIcon, PencilAltIcon, ReplyIcon } from '@heroicons/react/solid';
import ArchivePays from 'components/reference2/ArchivePays';
import DeletePays from 'components/reference2/DeletePays';
import RestorePays from 'components/reference2/RestorePays';
import { usePaginationPaysQuery } from 'config/rtk';
import React, { useRef, useState } from 'react';
import { REQUEST_SAVE } from 'tools/consts';
import Section from 'widgets/Section';
import { MenuItems } from 'widgets/TypeWidgets';
import { REQUEST_EDIT } from 'tools/consts';
import { p0, Pays } from 'tools/types';
import Bcyan from 'widgets/Bcyan';
import { Button } from 'widgets/Button';
import Icon from 'widgets/Icon';
import Mitems from 'widgets/Mitems';
import Pagin from 'widgets/Pagin';
import Table from 'widgets/Table';
import FormPaysManager from './FormPaysManager';
function ListPaysManager() {
    const search = (key: string, obj: Pays[]): Pays[] => {
        const Payssearch: Pays[] = obj.filter(
            (o: Pays) => {
                return o.id.match(key) != null ||
                    o.designation.match(key) != null
            }
        );
        return Payssearch
    }
    const [form, setForm] = useState(false)
    const [Pays0, setPays0] = useState(p0)
    const [requesp0, setRequesp0] = useState(REQUEST_SAVE)
    const [page, setPage] = useState(0);
    const { data = [], isFetching, refetch } = usePaginationPaysQuery(page)
    const [button, setButton] = useState("")
    const loadPage = (p: number) => {
        setPage(p);
        refetch();
    };
    const [disabled, setDisabled] = useState(true);
    const del = useRef(null);
    const archive = useRef(null);
    const restore = useRef(null);

    const showFormulaire = (Pays: Pays) => {
        setPays0(Pays);
        setForm(true);
        setRequesp0(REQUEST_EDIT);
    };
    const FormAsAdd = () => {
        setDisabled(false);
        setPays0(p0);
        setForm(true);
        setRequesp0(REQUEST_SAVE);
    };
    const FormAsEdit = (Pays: Pays) => {
        setDisabled(true);
        showFormulaire(Pays);
    };
    const FormAsUpdate = (Pays: Pays) => {
        setDisabled(false);
        showFormulaire(Pays);
    };
    const menu = (Pays: Pays): MenuItems[] => {
        return [
            {
                icon: (
                    <ClipboardListIcon
                        className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Détail",
                action: () => {
                    FormAsEdit(Pays);
                },
            },
            {
                icon: (
                    <PencilAltIcon
                        className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Modifier",
                action: () => {
                    FormAsUpdate(Pays);
                },
            },
            {
                icon: (
                    <TrashIcon
                        className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Supprimer",
                action: () => {
                    //@ts-ignore
                    del.current(Pays.id);
                },
            },
            {
                icon: (
                    <ArchiveIcon
                        className="mr-3 h-8 w-8 text-gray-800 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Archiver",
                action: () => {
                    //@ts-ignore
                    archive.current(Pays.id);
                },
            },
            {
                icon: (
                    <ReplyIcon
                        className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Restorer",
                action: () => {
                    //@ts-ignore
                    restore.current(Pays.id);
                },
            },
        ];
    };

    return (
        <>
            {form && (
                <FormPaysManager
                    request={requesp0}
                    Pays={Pays0}
                    closed={() => {
                        setForm(false);
                        setRequesp0(REQUEST_SAVE);
                        refetch();
                    }}
                    disable={disabled}
                />
            )}
            {!form && (
                <Section>
                    <DeletePays refetch={refetch} id={""} ref={del} />
                    <ArchivePays id={""} ref={archive} />
                    <RestorePays id={""} ref={restore} />
                    <div className="float-left w-full">
                        <Bcyan
                            className="float-left"
                            onClick={() => {
                                //setClienp0(c0);
                                //setForm(true);
                                FormAsAdd()
                            }}
                        >
                            ajouter pays
                        </Bcyan>

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
                    <Table className="tab-list float-left w-full mt-8"
                        thead={
                            <tr>
                                <Table.th>id</Table.th>
                                <Table.th>designation</Table.th>
                                <Table.th></Table.th>
                            </tr>
                        }
                    >
                        {

                            //@ts-ignore
                            data.content?.map((Pays) => (
                                //   data?.map((client) => (
                                <tr key={Pays.id}>
                                    <Table.td>
                                        {Pays.id}
                                    </Table.td>
                                    <Table.td>{Pays.designation}
                                    </Table.td>

                                    <Table.td>
                                        <Mitems menu={menu(Pays)} />
                                    </Table.td>
                                </tr>
                            ))
                        }
                    </Table>


                    <Pagin load={loadPage} />
                </Section>
            )}
        </>
    )
}

export default ListPaysManager