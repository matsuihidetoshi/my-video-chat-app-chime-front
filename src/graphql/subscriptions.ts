/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting($owner: String!) {
    onCreateMeeting(owner: $owner) {
      id
      meetingId
      title
      description
      updatedAt
      createdAt
      owner
    }
  }
`;
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting($owner: String!) {
    onUpdateMeeting(owner: $owner) {
      id
      meetingId
      title
      description
      updatedAt
      createdAt
      owner
    }
  }
`;
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting($owner: String!) {
    onDeleteMeeting(owner: $owner) {
      id
      meetingId
      title
      description
      updatedAt
      createdAt
      owner
    }
  }
`;
