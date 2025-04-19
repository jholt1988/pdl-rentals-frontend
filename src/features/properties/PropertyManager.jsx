import React, { useState} from 'react';
import ResponsiveListTable from '../../components/ResponsiveListTable';
import useProperties from '../../features/properties/useProperties';
import usePagination from '../pagination/usePagination';
import PaginationControls from '../pagination/PaginationControls';
import PropertyForm from './PropertyForm';
const PropertyManager = () => {
  const {
    loading,
    properties,
    createProperties,
    updateProperties,
    deleteProperties,
  } = useProperties();

  const {
    paginatedData: paginatedProperties,
    currentPage,
    maxPage,
    nextPage,
    prevPage,
    goToPage
  } = usePagination(properties, 10);

  

  const [editingRequest, setEditingRequest] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Properties</h2>
      <ResponsiveListTable
        columns={['Name', 'Address', 'Type', 'Units', 'Actions']}
        data={paginatedProperties}
        keyField="id"
        renderRow={(property, mode) =>
          mode === 'table' ? (
            <>
              <td>{property.name}</td>
              <td>{property.address}</td>
              <td>{property.type}</td>
              <td>{property.unitCount}</td>
              <td>
                <button onClick={() => {setEditingRequest(property); setIsFormOpen(true);}}>Edit</button>
                <button onClick={() => deleteProperties(property.id)}>Delete</button>
              </td>
            </>
          ) : (
            <>
              <div><strong>Name:</strong> {property.name}</div>
              <div><strong>Address:</strong> {property.address}</div>
              <div><strong>Type:</strong> {property.type}</div>
              <div><strong>Units:</strong> {property.unitCount}</div>
                <div>
                <button onClick={() => {setEditingRequest(null); setIsFormOpen(true);}}>Add</button>
                  <button onClick={() => { setEditingRequest(property); setIsFormOpen(true)}}>Edit</button>
                <button onClick={() => deleteProperties(property.id)}>Delete</button>
              </div>
            </>
          )
        }
      />
      {isFormOpen && (<PropertyManager
        initialData={editingRequest}
        onClose={() => setIsFormOpen(false)}
        onSubmit={async (data) => {
          if (editingRequest) {
            await updateProperties(editingRequest.id, data);
          } else {
            await createProperties(data);
          }
          setIsFormOpen(false);
        }}
      />)}
      <PaginationControls
        currentPage={currentPage}
        maxPage={maxPage}
        onNext={nextPage}
        onPrev={prevPage}
        onGoTo={goToPage}
      />
    </div>
  );
}


export default PropertyManager;
