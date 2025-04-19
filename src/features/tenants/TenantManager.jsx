
import React from 'react'; 
import ResponsiveListTable from '../../components/ResponsiveListTable';
import usePagination from '../../features/pagination/usePagination';
import PaginationControls from '../../features/pagination/PaginationControls';
import useTenants from  './useTenants';

const TenantManager = () => {
  const {loading, 
    tenants, 
    createTenant, 
    updateTenant,
    deleteTenant} = useTenants();
  
  const {
    paginatedData: paginatedTenants,
    currentPage,
    maxPage,
    nextPage,
    prevPage,
    goToPage
  } = usePagination(tenants, 10);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tenants</h2>

      <ResponsiveListTable
        columns={['Name', 'Email', 'Phone', 'Actions']}
        data={paginatedTenants}
        keyField="id"
        renderRow={(tenant, mode) =>
          mode === 'table' ? (
            <>
              <td>{tenant.name}</td>
              <td>{tenant.email}</td>
              <td>{tenant.phone}</td>
              <td>
                <button onClick={() => updateTenant(tenant)}>Edit</button>
                <button onClick={() => deleteTenant(tenant.id)}>Delete</button>
              </td>
            </>
          ) : (
            <>
              <div><strong>Name:</strong> {tenant.name}</div>
              <div><strong>Email:</strong> {tenant.email}</div>
              <div><strong>Phone:</strong> {tenant.phone}</div>
              <div>
                <button onClick={() => updateTenant(tenant)}>Edit</button>
                <button onClick={() => deleteTenant(tenant.id)}>Delete</button>
              </div>
            </>
          )
        }
      />

      <PaginationControls
        currentPage={currentPage}
        maxPage={maxPage}
        onNext={nextPage}
        onPrev={prevPage}
        onGoTo={goToPage}
      />
    </div>
  );
};

export default TenantManager;
