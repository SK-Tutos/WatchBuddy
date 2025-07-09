import { gql } from "@apollo/client";

export const GET_BOOK_INFOS = gql`
  query GetBook($title: String!) {
    book(title: $title) {
      title
      author
      publishDate
      cover
    }
  }
`;
