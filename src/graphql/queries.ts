/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
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
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        meetingId
        title
        description
        updatedAt
        createdAt
        owner
      }
      nextToken
    }
  }
`;
