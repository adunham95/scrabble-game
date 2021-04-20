export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['ID'];
  tiles?: Maybe<Array<Maybe<Tile>>>;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
  color: Scalars['String'];
  icon: Scalars['String'];
  points: Scalars['Int'];
  tiles?: Maybe<Array<Maybe<Tile>>>;
};

export type Tile = {
  __typename?: 'Tile';
  id: Scalars['ID'];
  pointValue: Scalars['Int'];
  letter: Scalars['String'];
};
