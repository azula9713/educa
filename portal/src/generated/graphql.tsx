import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  students: Array<Student>;
  studentAuth: Scalars['String'];
  hello: Scalars['String'];
  viewBatches: Array<Batch>;
  viewBatch: Batch;
  lecturers: Array<Lecturer>;
  lecAuth: Scalars['String'];
};


export type QueryViewBatchArgs = {
  batch_id: Scalars['Int'];
};

export type Student = {
  __typename?: 'Student';
  stu_id: Scalars['Int'];
  batch_name: Scalars['Int'];
  stu_first_name: Scalars['String'];
  stu_last_name: Scalars['String'];
  stu_email: Scalars['String'];
  stu_mobile: Scalars['String'];
  stu_is_approved: Scalars['Boolean'];
  stu_is_allowed: Scalars['Boolean'];
  stu_reg_date: Scalars['DateTime'];
};


export type Batch = {
  __typename?: 'Batch';
  batch_id: Scalars['Int'];
  batch_name: Scalars['String'];
};

export type Lecturer = {
  __typename?: 'Lecturer';
  lec_id: Scalars['Int'];
  lec_first_name: Scalars['String'];
  lec_last_name: Scalars['String'];
  lec_email: Scalars['String'];
  lec_mobile: Scalars['String'];
  lec_reg_date: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  revokeStudentRefreshToken: Scalars['Boolean'];
  studentLogin: StudentLoginResponse;
  studentRegister: Array<Scalars['String']>;
  createBatch: Scalars['String'];
  revokeLecRefreshToken: Scalars['Boolean'];
  lecLogin: LecLoginResponse;
  lecRegister: Array<Scalars['String']>;
};


export type MutationRevokeStudentRefreshTokenArgs = {
  stuId: Scalars['Int'];
};


export type MutationStudentLoginArgs = {
  stu_password: Scalars['String'];
  stu_email: Scalars['String'];
};


export type MutationStudentRegisterArgs = {
  stu_is_allowed: Scalars['Boolean'];
  stu_is_approved: Scalars['Boolean'];
  batch_name: Scalars['String'];
  stu_mobile: Scalars['String'];
  stu_last_name: Scalars['String'];
  stu_first_name: Scalars['String'];
  stu_password: Scalars['String'];
  stu_email: Scalars['String'];
};


export type MutationCreateBatchArgs = {
  batch_name: Scalars['String'];
};


export type MutationRevokeLecRefreshTokenArgs = {
  lecId: Scalars['Int'];
};


export type MutationLecLoginArgs = {
  lec_password: Scalars['String'];
  lec_email: Scalars['String'];
};


export type MutationLecRegisterArgs = {
  lec_mobile: Scalars['String'];
  lec_last_name: Scalars['String'];
  lec_first_name: Scalars['String'];
  lec_password: Scalars['String'];
  lec_email: Scalars['String'];
};

export type StudentLoginResponse = {
  __typename?: 'studentLoginResponse';
  accessToken: Scalars['String'];
  student: Student;
};

export type LecLoginResponse = {
  __typename?: 'lecLoginResponse';
  accessToken: Scalars['String'];
  lecturer: Lecturer;
};

export type BatchRevealQueryVariables = Exact<{
  batch_id: Scalars['Int'];
}>;


export type BatchRevealQuery = (
  { __typename?: 'Query' }
  & { viewBatch: (
    { __typename?: 'Batch' }
    & Pick<Batch, 'batch_id' | 'batch_name'>
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LecLoginMutationVariables = Exact<{
  lec_email: Scalars['String'];
  lec_password: Scalars['String'];
}>;


export type LecLoginMutation = (
  { __typename?: 'Mutation' }
  & { lecLogin: (
    { __typename?: 'lecLoginResponse' }
    & Pick<LecLoginResponse, 'accessToken'>
    & { lecturer: (
      { __typename?: 'Lecturer' }
      & Pick<Lecturer, 'lec_id' | 'lec_email' | 'lec_mobile' | 'lec_first_name' | 'lec_last_name' | 'lec_reg_date'>
    ) }
  ) }
);

export type StudentLoginMutationVariables = Exact<{
  stu_email: Scalars['String'];
  stu_password: Scalars['String'];
}>;


export type StudentLoginMutation = (
  { __typename?: 'Mutation' }
  & { studentLogin: (
    { __typename?: 'studentLoginResponse' }
    & Pick<StudentLoginResponse, 'accessToken'>
    & { student: (
      { __typename?: 'Student' }
      & Pick<Student, 'stu_id' | 'stu_email' | 'stu_first_name' | 'stu_last_name' | 'batch_name' | 'stu_mobile' | 'stu_is_approved' | 'stu_is_allowed' | 'stu_reg_date'>
    ) }
  ) }
);

export type StudentRegisterMutationVariables = Exact<{
  stu_email: Scalars['String'];
  stu_password: Scalars['String'];
  stu_first_name: Scalars['String'];
  stu_last_name: Scalars['String'];
  stu_mobile: Scalars['String'];
  batch_name: Scalars['String'];
  stu_is_approved: Scalars['Boolean'];
  stu_is_allowed: Scalars['Boolean'];
}>;


export type StudentRegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'studentRegister'>
);

export type StudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsQuery = (
  { __typename?: 'Query' }
  & { students: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'stu_id' | 'stu_email' | 'batch_name' | 'stu_first_name' | 'stu_last_name' | 'stu_mobile' | 'stu_is_approved' | 'stu_is_allowed' | 'stu_reg_date'>
  )> }
);

export type ViewBatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewBatchesQuery = (
  { __typename?: 'Query' }
  & { viewBatches: Array<(
    { __typename?: 'Batch' }
    & Pick<Batch, 'batch_id' | 'batch_name'>
  )> }
);


export const BatchRevealDocument = gql`
    query BatchReveal($batch_id: Int!) {
  viewBatch(batch_id: $batch_id) {
    batch_id
    batch_name
  }
}
    `;

/**
 * __useBatchRevealQuery__
 *
 * To run a query within a React component, call `useBatchRevealQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchRevealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchRevealQuery({
 *   variables: {
 *      batch_id: // value for 'batch_id'
 *   },
 * });
 */
export function useBatchRevealQuery(baseOptions: Apollo.QueryHookOptions<BatchRevealQuery, BatchRevealQueryVariables>) {
        return Apollo.useQuery<BatchRevealQuery, BatchRevealQueryVariables>(BatchRevealDocument, baseOptions);
      }
export function useBatchRevealLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchRevealQuery, BatchRevealQueryVariables>) {
          return Apollo.useLazyQuery<BatchRevealQuery, BatchRevealQueryVariables>(BatchRevealDocument, baseOptions);
        }
export type BatchRevealQueryHookResult = ReturnType<typeof useBatchRevealQuery>;
export type BatchRevealLazyQueryHookResult = ReturnType<typeof useBatchRevealLazyQuery>;
export type BatchRevealQueryResult = Apollo.QueryResult<BatchRevealQuery, BatchRevealQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LecLoginDocument = gql`
    mutation LecLogin($lec_email: String!, $lec_password: String!) {
  lecLogin(lec_email: $lec_email, lec_password: $lec_password) {
    accessToken
    lecturer {
      lec_id
      lec_email
      lec_mobile
      lec_first_name
      lec_last_name
      lec_reg_date
    }
  }
}
    `;
export type LecLoginMutationFn = Apollo.MutationFunction<LecLoginMutation, LecLoginMutationVariables>;

/**
 * __useLecLoginMutation__
 *
 * To run a mutation, you first call `useLecLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLecLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lecLoginMutation, { data, loading, error }] = useLecLoginMutation({
 *   variables: {
 *      lec_email: // value for 'lec_email'
 *      lec_password: // value for 'lec_password'
 *   },
 * });
 */
export function useLecLoginMutation(baseOptions?: Apollo.MutationHookOptions<LecLoginMutation, LecLoginMutationVariables>) {
        return Apollo.useMutation<LecLoginMutation, LecLoginMutationVariables>(LecLoginDocument, baseOptions);
      }
export type LecLoginMutationHookResult = ReturnType<typeof useLecLoginMutation>;
export type LecLoginMutationResult = Apollo.MutationResult<LecLoginMutation>;
export type LecLoginMutationOptions = Apollo.BaseMutationOptions<LecLoginMutation, LecLoginMutationVariables>;
export const StudentLoginDocument = gql`
    mutation StudentLogin($stu_email: String!, $stu_password: String!) {
  studentLogin(stu_email: $stu_email, stu_password: $stu_password) {
    accessToken
    student {
      stu_id
      stu_email
      stu_first_name
      stu_last_name
      batch_name
      stu_mobile
      stu_is_approved
      stu_is_allowed
      stu_reg_date
    }
  }
}
    `;
export type StudentLoginMutationFn = Apollo.MutationFunction<StudentLoginMutation, StudentLoginMutationVariables>;

/**
 * __useStudentLoginMutation__
 *
 * To run a mutation, you first call `useStudentLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudentLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studentLoginMutation, { data, loading, error }] = useStudentLoginMutation({
 *   variables: {
 *      stu_email: // value for 'stu_email'
 *      stu_password: // value for 'stu_password'
 *   },
 * });
 */
export function useStudentLoginMutation(baseOptions?: Apollo.MutationHookOptions<StudentLoginMutation, StudentLoginMutationVariables>) {
        return Apollo.useMutation<StudentLoginMutation, StudentLoginMutationVariables>(StudentLoginDocument, baseOptions);
      }
export type StudentLoginMutationHookResult = ReturnType<typeof useStudentLoginMutation>;
export type StudentLoginMutationResult = Apollo.MutationResult<StudentLoginMutation>;
export type StudentLoginMutationOptions = Apollo.BaseMutationOptions<StudentLoginMutation, StudentLoginMutationVariables>;
export const StudentRegisterDocument = gql`
    mutation StudentRegister($stu_email: String!, $stu_password: String!, $stu_first_name: String!, $stu_last_name: String!, $stu_mobile: String!, $batch_name: String!, $stu_is_approved: Boolean!, $stu_is_allowed: Boolean!) {
  studentRegister(
    stu_email: $stu_email
    stu_password: $stu_password
    stu_first_name: $stu_first_name
    stu_last_name: $stu_last_name
    stu_mobile: $stu_mobile
    batch_name: $batch_name
    stu_is_approved: $stu_is_approved
    stu_is_allowed: $stu_is_allowed
  )
}
    `;
export type StudentRegisterMutationFn = Apollo.MutationFunction<StudentRegisterMutation, StudentRegisterMutationVariables>;

/**
 * __useStudentRegisterMutation__
 *
 * To run a mutation, you first call `useStudentRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudentRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studentRegisterMutation, { data, loading, error }] = useStudentRegisterMutation({
 *   variables: {
 *      stu_email: // value for 'stu_email'
 *      stu_password: // value for 'stu_password'
 *      stu_first_name: // value for 'stu_first_name'
 *      stu_last_name: // value for 'stu_last_name'
 *      stu_mobile: // value for 'stu_mobile'
 *      batch_name: // value for 'batch_name'
 *      stu_is_approved: // value for 'stu_is_approved'
 *      stu_is_allowed: // value for 'stu_is_allowed'
 *   },
 * });
 */
export function useStudentRegisterMutation(baseOptions?: Apollo.MutationHookOptions<StudentRegisterMutation, StudentRegisterMutationVariables>) {
        return Apollo.useMutation<StudentRegisterMutation, StudentRegisterMutationVariables>(StudentRegisterDocument, baseOptions);
      }
export type StudentRegisterMutationHookResult = ReturnType<typeof useStudentRegisterMutation>;
export type StudentRegisterMutationResult = Apollo.MutationResult<StudentRegisterMutation>;
export type StudentRegisterMutationOptions = Apollo.BaseMutationOptions<StudentRegisterMutation, StudentRegisterMutationVariables>;
export const StudentsDocument = gql`
    query Students {
  students {
    stu_id
    stu_email
    batch_name
    stu_first_name
    stu_last_name
    stu_mobile
    stu_is_approved
    stu_is_allowed
    stu_reg_date
  }
}
    `;

/**
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentsQuery(baseOptions?: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
        return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, baseOptions);
      }
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
          return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, baseOptions);
        }
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>;
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>;
export type StudentsQueryResult = Apollo.QueryResult<StudentsQuery, StudentsQueryVariables>;
export const ViewBatchesDocument = gql`
    query ViewBatches {
  viewBatches {
    batch_id
    batch_name
  }
}
    `;

/**
 * __useViewBatchesQuery__
 *
 * To run a query within a React component, call `useViewBatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewBatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewBatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewBatchesQuery(baseOptions?: Apollo.QueryHookOptions<ViewBatchesQuery, ViewBatchesQueryVariables>) {
        return Apollo.useQuery<ViewBatchesQuery, ViewBatchesQueryVariables>(ViewBatchesDocument, baseOptions);
      }
export function useViewBatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewBatchesQuery, ViewBatchesQueryVariables>) {
          return Apollo.useLazyQuery<ViewBatchesQuery, ViewBatchesQueryVariables>(ViewBatchesDocument, baseOptions);
        }
export type ViewBatchesQueryHookResult = ReturnType<typeof useViewBatchesQuery>;
export type ViewBatchesLazyQueryHookResult = ReturnType<typeof useViewBatchesLazyQuery>;
export type ViewBatchesQueryResult = Apollo.QueryResult<ViewBatchesQuery, ViewBatchesQueryVariables>;