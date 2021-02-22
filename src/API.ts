/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTaskInput = {
  id?: string | null,
  meetingId: string,
  title: string,
  description?: string | null,
  updatedAt?: string | null,
};

export type ModelTaskConditionInput = {
  meetingId?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTaskConditionInput | null > | null,
  or?: Array< ModelTaskConditionInput | null > | null,
  not?: ModelTaskConditionInput | null,
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

export type Task = {
  __typename: "Task",
  id?: string,
  meetingId?: string,
  title?: string,
  description?: string | null,
  updatedAt?: string | null,
  createdAt?: string,
  owner?: string | null,
};

export type UpdateTaskInput = {
  id: string,
  meetingId?: string | null,
  title?: string | null,
  description?: string | null,
  updatedAt?: string | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type ModelTaskFilterInput = {
  id?: ModelIDInput | null,
  meetingId?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
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

export type ModelTaskConnection = {
  __typename: "ModelTaskConnection",
  items?:  Array<Task | null > | null,
  nextToken?: string | null,
};

export type CreateTaskMutationVariables = {
  input?: CreateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type CreateTaskMutation = {
  createTask?:  {
    __typename: "Task",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input?: UpdateTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type UpdateTaskMutation = {
  updateTask?:  {
    __typename: "Task",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input?: DeleteTaskInput,
  condition?: ModelTaskConditionInput | null,
};

export type DeleteTaskMutation = {
  deleteTask?:  {
    __typename: "Task",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id?: string,
};

export type GetTaskQuery = {
  getTask?:  {
    __typename: "Task",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks?:  {
    __typename: "ModelTaskConnection",
    items?:  Array< {
      __typename: "Task",
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

export type OnCreateTaskSubscriptionVariables = {
  owner?: string,
};

export type OnCreateTaskSubscription = {
  onCreateTask?:  {
    __typename: "Task",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTaskSubscriptionVariables = {
  owner?: string,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask?:  {
    __typename: "Task",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTaskSubscriptionVariables = {
  owner?: string,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask?:  {
    __typename: "Task",
    id: string,
    meetingId: string,
    title: string,
    description?: string | null,
    updatedAt?: string | null,
    createdAt: string,
    owner?: string | null,
  } | null,
};
