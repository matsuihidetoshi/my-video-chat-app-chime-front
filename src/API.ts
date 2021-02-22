/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMeetingInput = {
  id?: string | null,
  meetingId: string,
  title: string,
  description?: string | null,
  updatedAt?: string | null,
};

export type ModelMeetingConditionInput = {
  meetingId?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMeetingConditionInput | null > | null,
  or?: Array< ModelMeetingConditionInput | null > | null,
  not?: ModelMeetingConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Meeting = {
  __typename: "Meeting",
  id?: string,
  meetingId?: string,
  title?: string,
  description?: string | null,
  updatedAt?: string | null,
  createdAt?: string,
  owner?: string | null,
};

export type UpdateMeetingInput = {
  id: string,
  meetingId?: string | null,
  title?: string | null,
  description?: string | null,
  updatedAt?: string | null,
};

export type DeleteMeetingInput = {
  id?: string | null,
};

export type ModelMeetingFilterInput = {
  id?: ModelIDInput | null,
  meetingId?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMeetingFilterInput | null > | null,
  or?: Array< ModelMeetingFilterInput | null > | null,
  not?: ModelMeetingFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelMeetingConnection = {
  __typename: "ModelMeetingConnection",
  items?:  Array<Meeting | null > | null,
  nextToken?: string | null,
};

export type CreateMeetingMutationVariables = {
  input?: CreateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type CreateMeetingMutation = {
  createMeeting?:  {
    __typename: "Meeting",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateMeetingMutationVariables = {
  input?: UpdateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type UpdateMeetingMutation = {
  updateMeeting?:  {
    __typename: "Meeting",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteMeetingMutationVariables = {
  input?: DeleteMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type DeleteMeetingMutation = {
  deleteMeeting?:  {
    __typename: "Meeting",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type GetMeetingQueryVariables = {
  id?: string,
};

export type GetMeetingQuery = {
  getMeeting?:  {
    __typename: "Meeting",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type ListMeetingsQueryVariables = {
  filter?: ModelMeetingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMeetingsQuery = {
  listMeetings?:  {
    __typename: "ModelMeetingConnection",
    items?:  Array< {
      __typename: "Meeting",
      id: string,
      meetingId: string,
      title: string,
      description?: string | null,
      updatedAt?: string | null,
      createdAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMeetingSubscriptionVariables = {
  owner?: string,
};

export type OnCreateMeetingSubscription = {
  onCreateMeeting?:  {
    __typename: "Meeting",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMeetingSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateMeetingSubscription = {
  onUpdateMeeting?:  {
    __typename: "Meeting",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMeetingSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteMeetingSubscription = {
  onDeleteMeeting?:  {
    __typename: "Meeting",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};
