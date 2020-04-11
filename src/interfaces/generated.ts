export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export interface Mutation {
  test?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['Boolean']>;
}

export type MutationTestArgs = {
  name?: Maybe<Scalars['String']>;
};

export type MutationCreateUserArgs = {
  request?: Maybe<SignUpRequestInput>;
};

export interface Query {
  hello?: Maybe<Scalars['String']>;
}

export interface SignUpRequestInput {
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['Int'];
}
