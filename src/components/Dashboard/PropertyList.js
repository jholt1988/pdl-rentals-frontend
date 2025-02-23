import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../services/authService";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/properties", {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div>
            <h2>Properties</h2>
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
    );
};

export default PropertyList;
