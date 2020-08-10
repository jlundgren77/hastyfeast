import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';
import formatMony from '../lib/formatMoney';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String
    $description: String
    $price: Int
    $id: ID!
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;
class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hastyfeast');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dpeyakigu/image/upload',
      {
        method: 'POST',
        body: data
      }
    );

    const file = await res.json();

    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();

    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };
  render() {
    return (
      <div>
        <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
          {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (!data.item) return <p>No Item Found</p>;
            return (
              <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                {(updateItem, { loading, error }) => (
                  <Form onSubmit={e => this.updateItem(e, updateItem)}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="title"
                          defaultValue={data.item.title}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <label htmlFor="price">
                        Price
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder="Price"
                          defaultValue={data.item.price}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <label htmlFor="description">
                        Description
                        <input
                          type="textarea"
                          id="description"
                          name="description"
                          placeholder="Enter a description"
                          defaultValue={data.item.description}
                          onChange={this.handleChange}
                          required
                        />
                      </label>
                      <button type="submit">Save Changes</button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
