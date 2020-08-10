import React from 'react';
import { Query } from 'react-apollo';

import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';

const PleaseSignin = props => (
  <Query
    query={CURRENT_USER_QUERY}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In To Sell An Item</p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignin;