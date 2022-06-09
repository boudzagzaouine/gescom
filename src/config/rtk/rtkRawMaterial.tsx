import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PAGE_SIZE } from "tools/consts";
import { RawMaterial, RawMaterialJson } from "tools/types";

export const crudRawMaterial = createApi({
  reducerPath: "crud-rawMaterial",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  tagTypes: ["RawMaterial", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints(builder) {
    return {
      /*****************************************************************************/
      /*********************************RawMaterial**************************************/
      /*****************************************************************************/
      fetchRawMaterials: builder.query<RawMaterial[], void>({
        query: () => `/rawMaterials`,
      }),
      paginationRawMaterials: builder.query<RawMaterial[], number>({
        query: (page) => `/rawMaterials?page=${page}&size=${PAGE_SIZE}`,
      }),
      fetchOneRawMaterial: builder.query<RawMaterial, string>({
        query: (id) => `/rawMaterials/${id}`,
      }),
      addRawMaterial: builder.mutation<RawMaterial, Partial<RawMaterial>>({
        query: (body) => ({
          url: "/rawMaterials",
          method: "POST",
          body,
        }),
      }),
      editRawMaterial: builder.mutation<
        RawMaterial,
        Partial<RawMaterial> & Pick<RawMaterial, "id">
      >({
        query: (body) => ({
          url: `/rawMaterials/${body.id}`,
          method: "PUT",
          body,
        }),
      }),
      deleteRawMaterial: builder.mutation<
        { success: boolean; id: number },
        number
      >({
        //@ts-ignore
        query(id: Num) {
          //  if (confirm(`do you want delete Client number ${id.id} ?`))
          return {
            url: `/rawMaterials/${id.id}`,
            method: "DELETE",
          };
        },
      }),
      archiveRawMaterial: builder.mutation<
        RawMaterial,
        Partial<RawMaterial> & Pick<RawMaterial, "id">
      >({
        query: (id) => ({
          url: `/rawMaterials/${id}/archive`,
          method: "PUT",
        }),
      }),
      restoreRawMaterial: builder.mutation<
        RawMaterial,
        Partial<RawMaterial> & Pick<RawMaterial, "id">
      >({
        query: (id) => ({
          url: `/rawMaterials/${id}/restore`,
          method: "PUT",
        }),
      }),
    };
  },
});

export const {
  useFetchRawMaterialsQuery,
  usePaginationRawMaterialsQuery,
  useFetchOneRawMaterialQuery,
  useAddRawMaterialMutation,
  useEditRawMaterialMutation,
  useDeleteRawMaterialMutation,
  useArchiveRawMaterialMutation,
  useRestoreRawMaterialMutation,
  /*******************************************************/
  /*******************************************************/
} = crudRawMaterial;
export type OpenRawMaterialProp = {
  data: RawMaterialJson;
  refetch: () => void;
  save: () => void;
  edit: () => void;
};
export const openRawMaterials = (page:number): OpenRawMaterialProp => {
  const { data = [], refetch } = usePaginationRawMaterialsQuery(page);
  const [save] = useAddRawMaterialMutation();
  const [edit] = useEditRawMaterialMutation();
  //@ts-ignore
  const out: OpenRawMaterialProp = { data, refetch, save, edit };
  return out;
};
export const openFamilleF = (): OpenRawMaterialProp => {
  const { data = [], refetch } = usePaginationRawMaterialsQuery(0);
  const [save] = useAddRawMaterialMutation();
  const [edit] = useEditRawMaterialMutation();
  //@ts-ignore
  const out: OpenRawMaterialProp = { data, refetch, save, edit };
  return out;
};
