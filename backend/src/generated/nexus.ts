/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UserInput: { // input type
    id?: number | null; // Int
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Bookmark: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  BookmarkResults: { // root type
    results: NexusGenRootTypes['Bookmark'][]; // [Bookmark!]!
    total: number; // Int!
  }
  Character: { // root type
    dimension?: string | null; // String
    gender?: string | null; // String
    id: number; // Int!
    image?: string | null; // String
    name?: string | null; // String
    origin?: string | null; // String
    species?: string | null; // String
    status?: string | null; // String
  }
  Episode: { // root type
    airDate: string; // String!
    episode: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  LoginResponse: { // root type
    sessionId: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    id: number; // Int!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Bookmark: { // field return type
    character: NexusGenRootTypes['Character'] | null; // Character
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  BookmarkResults: { // field return type
    results: NexusGenRootTypes['Bookmark'][]; // [Bookmark!]!
    total: number; // Int!
  }
  Character: { // field return type
    dimension: string | null; // String
    episodes: Array<NexusGenRootTypes['Episode'] | null> | null; // [Episode]
    gender: string | null; // String
    id: number; // Int!
    image: string | null; // String
    isBookmarked: boolean | null; // Boolean
    name: string | null; // String
    origin: string | null; // String
    species: string | null; // String
    status: string | null; // String
  }
  Episode: { // field return type
    airDate: string; // String!
    episode: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  LoginResponse: { // field return type
    sessionId: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    bookmarkCharacter: NexusGenRootTypes['Bookmark']; // Bookmark!
    loginOrSignup: NexusGenRootTypes['LoginResponse']; // LoginResponse!
    unbookmarkCharacter: NexusGenRootTypes['Bookmark']; // Bookmark!
  }
  Query: { // field return type
    bookmarks: NexusGenRootTypes['BookmarkResults']; // BookmarkResults!
    characters: Array<NexusGenRootTypes['Character'] | null> | null; // [Character]
    me: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    bookmarks: Array<NexusGenRootTypes['Bookmark'] | null> | null; // [Bookmark]
    id: number; // Int!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Bookmark: { // field return type name
    character: 'Character'
    createdAt: 'DateTime'
    id: 'Int'
    updatedAt: 'DateTime'
  }
  BookmarkResults: { // field return type name
    results: 'Bookmark'
    total: 'Int'
  }
  Character: { // field return type name
    dimension: 'String'
    episodes: 'Episode'
    gender: 'String'
    id: 'Int'
    image: 'String'
    isBookmarked: 'Boolean'
    name: 'String'
    origin: 'String'
    species: 'String'
    status: 'String'
  }
  Episode: { // field return type name
    airDate: 'String'
    episode: 'String'
    id: 'Int'
    name: 'String'
  }
  LoginResponse: { // field return type name
    sessionId: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    bookmarkCharacter: 'Bookmark'
    loginOrSignup: 'LoginResponse'
    unbookmarkCharacter: 'Bookmark'
  }
  Query: { // field return type name
    bookmarks: 'BookmarkResults'
    characters: 'Character'
    me: 'User'
  }
  User: { // field return type name
    bookmarks: 'Bookmark'
    id: 'Int'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    bookmarkCharacter: { // args
      characterId: number; // Int!
    }
    loginOrSignup: { // args
      data: NexusGenInputs['UserInput']; // UserInput!
    }
    unbookmarkCharacter: { // args
      characterId: number; // Int!
    }
  }
  Query: {
    bookmarks: { // args
      page: number | null; // Int
    }
    characters: { // args
      page: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}