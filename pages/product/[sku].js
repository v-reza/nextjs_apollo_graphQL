import React from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { PRODUCT_FILTER_BY_SKU } from "../categories/schema";
const ProductBySKU = () => {
  const router = useRouter();
  const { sku } = router.query;

  const { loading, data, error } = useQuery(PRODUCT_FILTER_BY_SKU, {
    variables: {
      sku: sku,
    },
  });

  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const responseData = data.products.items[0];
  console.log(responseData);
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <div className="card mt-3 hoverable" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={responseData.image.url}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{responseData.name}</h5>
                <p className="card-text">{responseData.description.html}</p>
              </div>
            </div>
          </div>
          <div className="col-sm mt-3">
            <h3>Price</h3>
            <table className="table">
              <thead>
                <tr className="table-primary">
                  <th scope="col">Regular Price</th>
                  <th scope="col">Discount</th>
                  <th scope="col">Final Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {
                      responseData.price_range.maximum_price.regular_price
                        .currency
                    }{" "}
                    -{" "}
                    {responseData.price_range.maximum_price.regular_price.value}
                  </td>
                  <td>
                    {
                      responseData.price_range.maximum_price.discount
                        .percent_off
                    }
                    % (
                    {responseData.price_range.maximum_price.discount.amount_off}
                    )
                  </td>
                  <td>
                    {
                      responseData.price_range.maximum_price.final_price
                        .currency
                    }{" "}
                    - {responseData.price_range.maximum_price.final_price.value}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm mt-3">
            <h3>&nbsp;</h3>
          </div>
          <div className="col-sm mt-3">
            <h3>&nbsp;</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBySKU;
