import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import { Skeleton } from "@mui/material";

const GET_CATEGORIES = gql`
  {
    categories(filters: {}) {
      items {
        name
        id
        description
        image
        created_at
      }
    }
  }
`;

const Categories = () => {
  const response = useQuery(GET_CATEGORIES);
  const { loading, data, error } = response;

  //   const

  if (loading) {
    return (
      <div>
        <Navbar />
        <br />
        <br />
        <div className="container mt-3">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {[...Array(12)].map((x, index) => (
              <div className="col" style={{margin: "0px", height: "400px"}}>
                <Skeleton style={{
                    width: "100%",
                    height: "400px"
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log(data);
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <h2 style={{ color: "#FFF" }}>Popular Movie</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {data.categories.items.map((item, index) => (
            <div className="col">
              <Link passHref href={`categories/${item.id}`} key={index}>
                <div className="card h-100 hoverable">
                  {item.image != null ? (
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt="Skyscrapers"
                    />
                  ) : (
                    <img
                      src="https://pngimage.net/wp-content/uploads/2018/05/default-png-5.png"
                      className="card-img-top"
                      alt="Skyscrapers"
                    />
                  )}
                  <div className="img_description_layer">
                    <p className="img_description">
                      <i className="bi bi-eye-fill"></i>&nbsp;Preview
                    </p>
                  </div>
                  <div className="card-body bg-dark-card">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Created At {item.created_at}
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
