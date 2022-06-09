import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IdsObject, IdsObjectJson } from 'tools/types';

export const crudGeneric = createApi({
	reducerPath: "crud-generic",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_URL,
		prepareHeaders(headers) {
			return headers;
		},
	}),
	tagTypes: ["IdsObject", "UNAUTHORIZED", "UNKNOWN_ERROR"],
	endpoints(builder) {
		return {
			/****************************************************************************/
			/*************************IdsObject*******************************************/
			/****************************************************************************/
			fetch: builder.query<IdsObject[], string>({
				query: (path) => `/${path}`,
			}),

			add: builder.mutation<
				IdsObject,
				Partial<IdsObject> & Pick<IdsObject, "path">
			>({
				query: (body) => ({
					url: `/${body.path}`,
					method: "POST",
					body,
				}),
			}),
			edit: builder.mutation<
				IdsObject,
				Partial<IdsObject> & Pick<IdsObject, "path"> & Pick<IdsObject, "id">
			>({
				query: (body) => ({
					url: `/${body.path}/${body.id}`,
					method: "PUT",
					body,
				}),
			}),
			delete: builder.mutation<{ success: boolean; id: number }, number>({
				//@ts-ignore
				query(id: Num) {
					return {
						url: `/IdsObjects/${id.id}`,
						method: "DELETE",
					};
				},
			}),
			archiveIdsObject: builder.mutation<
				IdsObject,
				Partial<IdsObject> & Pick<IdsObject, "id">
			>({
				query: (id) => ({
					url: `/IdsObjects/${id}/archive`,
					method: "PUT",
				}),
			}),
			restoreIdsObject: builder.mutation<
				IdsObject,
				Partial<IdsObject> & Pick<IdsObject, "id">
			>({
				query: (id) => ({
					url: `/IdsObjects/${id}/restore`,
					method: "PUT",
				}),
			}),
		};
	},
});
export const { useFetchQuery, useAddMutation, useEditMutation } = crudGeneric;
/*******************************************/
export type OpenIdsObjectProp<E extends IdsObject, J extends IdsObjectJson> = {
	data: J;
	tab: E[];
	isFetching: boolean;
	refetch: () => void;
	save: () => void;
	edit: () => void;
	isSuccess: boolean;
	isError: any;
	isLoading: any;
	isUninitialized: any;
	status: any;
	currentData: any;
	endpointName: any;
	error: any;
	fulfilledTimeStamp: any;
	originalArgs: any;
	requestId: any;
	startedTimeStamp: any;
};
export type OpenIdsObjectByIdClientProp<E extends IdsObject> = {
	data: E[];
	isSuccess: boolean;
	refetch: () => void;
	save: () => void;
	edit: () => void;
	isFetching: any;
	isError: any;
	isLoading: any;
	isUninitialized: any;
	status: any;
	currentData: any;
	endpointName: any;
	error: any;
	fulfilledTimeStamp: any;
	originalArgs: any;
	requestId: any;
	startedTimeStamp: any;
};

//const openIdsObjectsFw = {};

export const useOpenIdsObjects = <E extends IdsObject, J extends IdsObjectJson>(
	path: string,
): OpenIdsObjectProp<E, J> => {
	/*
	// @ts-ignore
	if (openIdsObjectsFw[path]) {
		// @ts-ignore
		return openIdsObjectsFw[path];
	}
*/
	//try {
	const {
		data = [],
		refetch,
		isSuccess,
		isFetching,
		isError,
		isLoading,
		isUninitialized,
		status,
		currentData,
		endpointName,
		error,
		fulfilledTimeStamp,
		originalArgs,
		requestId,
		startedTimeStamp,
	} = useFetchQuery(path);
	//@ts-ignore
	const tab: E[] = data.content;
	const [save] = useAddMutation();
	const [edit] = useEditMutation();
	//@ts-ignore
	const out: OpenIdsObjectProp = {
		tab,
		data,
		refetch,
		save,
		edit,
		isSuccess,
		isFetching,
		isError,
		isLoading,
		isUninitialized,
		status,
		currentData,
		endpointName,
		error,
		fulfilledTimeStamp,
		originalArgs,
		requestId,
		startedTimeStamp,
	};
	// @ts-ignore
	//openIdsObjectsFw[path] = out;
	return out;
	/* 	} catch (Error) {
		console.log("Eror rtk " + Error);
		//@ts-ignore
		return null;
	} */
};
export const openIdsObject = <E extends IdsObject, J extends IdsObjectJson>(
	path: string,
	id: string,
): OpenIdsObjectProp<E, J> => {
	try {
		const { data = [], refetch, isFetching } = useFetchQuery(path + "/" + id);
		//@ts-ignore
		const tab: E = data.content;
		const [save] = useAddMutation();
		const [edit] = useEditMutation();
		const pathh = path + "/" + id;
		//@ts-ignore
		const out: OpenIdsObjectProp = {
			pathh,
			tab,
			data,
			refetch,
			save,
			edit,
			isFetching,
		};
		return out;
	} catch (error) {
		//@ts-ignore
		return null;
	}
};
