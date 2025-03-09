import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchProperties } from "../../services/apiService";
import { getToken } from "../../services/authService";
import "../../theme.css"

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
       
        fetchProperties();
    }, []);

    return (
        <div className="container">
        <div className="card">
            <h2 className="text-center">Properties</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Address</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id}>
                            <td>{property.id}</td>
                            <td>{property.address}</td>
                            <td>{property.units}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default PropertyList;
