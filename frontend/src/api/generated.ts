import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Bookmark = {
  __typename?: 'Bookmark';
  character?: Maybe<Character>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type Character = {
  __typename?: 'Character';
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Origin>;
  species?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  dimension?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  sessionId: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkCharacter: Bookmark;
  loginOrSignup: LoginResponse;
};


export type MutationBookmarkCharacterArgs = {
  characterId: Scalars['Int']['input'];
};


export type MutationLoginOrSignupArgs = {
  data: UserInput;
};

export type Origin = {
  __typename?: 'Origin';
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  bookmarks: Array<Bookmark>;
  characters?: Maybe<Array<Maybe<Character>>>;
};

export type User = {
  __typename?: 'User';
  bookmarks?: Maybe<Array<Maybe<Bookmark>>>;
  id: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type BookmarkFragment = { __typename?: 'Bookmark', id: number, character?: { __typename?: 'Character', gender?: string | null, id: number, image?: string | null, name?: string | null, species?: string | null, status?: string | null, location?: { __typename?: 'Location', dimension?: string | null } | null, origin?: { __typename?: 'Origin', name?: string | null } | null } | null };

export type CharacterFragment = { __typename?: 'Character', gender?: string | null, id: number, image?: string | null, name?: string | null, species?: string | null, status?: string | null, location?: { __typename?: 'Location', dimension?: string | null } | null, origin?: { __typename?: 'Origin', name?: string | null } | null };

export type UserFragment = { __typename?: 'User', id: number, username: string };

export type BookmarkCharacterMutationVariables = Exact<{
  characterId: Scalars['Int']['input'];
}>;


export type BookmarkCharacterMutation = { __typename?: 'Mutation', bookmarkCharacter: { __typename?: 'Bookmark', id: number, character?: { __typename?: 'Character', gender?: string | null, id: number, image?: string | null, name?: string | null, species?: string | null, status?: string | null, location?: { __typename?: 'Location', dimension?: string | null } | null, origin?: { __typename?: 'Origin', name?: string | null } | null } | null } };

export type LoginOrSignupMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginOrSignupMutation = { __typename?: 'Mutation', loginOrSignup: { __typename?: 'LoginResponse', sessionId: string, user: { __typename?: 'User', id: number, username: string, bookmarks?: Array<{ __typename?: 'Bookmark', id: number } | null> | null } } };

export type BookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarksQuery = { __typename?: 'Query', bookmarks: Array<{ __typename?: 'Bookmark', id: number, user?: { __typename?: 'User', id: number, username: string } | null, character?: { __typename?: 'Character', gender?: string | null, id: number, image?: string | null, name?: string | null, species?: string | null, status?: string | null, location?: { __typename?: 'Location', dimension?: string | null } | null, origin?: { __typename?: 'Origin', name?: string | null } | null } | null }> };

export const CharacterFragmentDoc = gql`
    fragment character on Character {
  gender
  id
  image
  location {
    dimension
  }
  name
  origin {
    name
  }
  species
  status
}
    `;
export const BookmarkFragmentDoc = gql`
    fragment bookmark on Bookmark {
  id
  character {
    ...character
  }
}
    ${CharacterFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  username
}
    `;
export const BookmarkCharacterDocument = gql`
    mutation bookmarkCharacter($characterId: Int!) {
  bookmarkCharacter(characterId: $characterId) {
    ...bookmark
  }
}
    ${BookmarkFragmentDoc}`;
export type BookmarkCharacterMutationFn = Apollo.MutationFunction<BookmarkCharacterMutation, BookmarkCharacterMutationVariables>;

/**
 * __useBookmarkCharacterMutation__
 *
 * To run a mutation, you first call `useBookmarkCharacterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkCharacterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkCharacterMutation, { data, loading, error }] = useBookmarkCharacterMutation({
 *   variables: {
 *      characterId: // value for 'characterId'
 *   },
 * });
 */
export function useBookmarkCharacterMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkCharacterMutation, BookmarkCharacterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkCharacterMutation, BookmarkCharacterMutationVariables>(BookmarkCharacterDocument, options);
      }
export type BookmarkCharacterMutationHookResult = ReturnType<typeof useBookmarkCharacterMutation>;
export type BookmarkCharacterMutationResult = Apollo.MutationResult<BookmarkCharacterMutation>;
export type BookmarkCharacterMutationOptions = Apollo.BaseMutationOptions<BookmarkCharacterMutation, BookmarkCharacterMutationVariables>;
export const LoginOrSignupDocument = gql`
    mutation loginOrSignup($data: UserInput!) {
  loginOrSignup(data: $data) {
    sessionId
    user {
      ...user
      bookmarks {
        id
      }
    }
  }
}
    ${UserFragmentDoc}`;
export type LoginOrSignupMutationFn = Apollo.MutationFunction<LoginOrSignupMutation, LoginOrSignupMutationVariables>;

/**
 * __useLoginOrSignupMutation__
 *
 * To run a mutation, you first call `useLoginOrSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginOrSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginOrSignupMutation, { data, loading, error }] = useLoginOrSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginOrSignupMutation(baseOptions?: Apollo.MutationHookOptions<LoginOrSignupMutation, LoginOrSignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginOrSignupMutation, LoginOrSignupMutationVariables>(LoginOrSignupDocument, options);
      }
export type LoginOrSignupMutationHookResult = ReturnType<typeof useLoginOrSignupMutation>;
export type LoginOrSignupMutationResult = Apollo.MutationResult<LoginOrSignupMutation>;
export type LoginOrSignupMutationOptions = Apollo.BaseMutationOptions<LoginOrSignupMutation, LoginOrSignupMutationVariables>;
export const BookmarksDocument = gql`
    query bookmarks {
  bookmarks {
    id
    user {
      ...user
    }
    character {
      ...character
    }
  }
}
    ${UserFragmentDoc}
${CharacterFragmentDoc}`;

/**
 * __useBookmarksQuery__
 *
 * To run a query within a React component, call `useBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookmarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookmarksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<BookmarksQuery, BookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, options);
      }
export function useBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookmarksQuery, BookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, options);
        }
export function useBookmarksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BookmarksQuery, BookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookmarksQuery, BookmarksQueryVariables>(BookmarksDocument, options);
        }
export type BookmarksQueryHookResult = ReturnType<typeof useBookmarksQuery>;
export type BookmarksLazyQueryHookResult = ReturnType<typeof useBookmarksLazyQuery>;
export type BookmarksSuspenseQueryHookResult = ReturnType<typeof useBookmarksSuspenseQuery>;
export type BookmarksQueryResult = Apollo.QueryResult<BookmarksQuery, BookmarksQueryVariables>;