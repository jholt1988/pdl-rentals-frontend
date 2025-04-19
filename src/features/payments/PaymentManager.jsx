import React,{useState} from 'react';
import ResponsiveListTable from '../../components/ResponsiveListTable';
import usePayments from './usePayments';
import PaymentForm from './PaymentForm';
import usePagination from '../../features/pagination/usePagination'
import PaginationControls from '../pagination/PaginationControls';

const PaymentManager = () => {
  const { loading,
    payments,
    addPayment,
    createPayment,
    updatePayment,
    deletePayment } = usePayments();
  
  const {
    paginatedData:paginatedPayments,
    currentPage,
    maxPage,
   nextPage,
    prevPage,
    goToPage } = usePagination(payments,10)
   
  const [editingRequest, setEditingRequest] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false) 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>
      <ResponsiveListTable
        columns={["Date", "Tenant", "Amount", "Method", "Status", "Actions"]}
        data={paginatedPayments}
        keyField="id"
        renderRow={(payment, mode) =>
          mode === "table" ? (
            <tr>
              <td>{payment.date}</td>
              <td>{payment.tenantName}</td>
              <td>${payment.amount}</td>
              <td>{payment.method}</td>
              <td>{payment.status}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingRequest(payment); setIsFormOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deletePayment(payment.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ) : (
            <>
              <div>
                <strong>Date:</strong> {payment.date}
              </div>
              <div>
                <strong>Tenant:</strong> {payment.tenantName}
              </div>
              <div>
                <strong>Amount:</strong> ${payment.amount}
              </div>
              <div>
                      <strong>Method:</strong> {payment.method}
              </div>
              <div>
                <strong>Status:</strong> {payment.status}
              </div>
                <div>
                  <button onClick={() => {
                    setIsFormOpen(true); setEditingRequest(null)
                  }
                  }>Add</button>
                <button
                  onClick={() => {
                      setEditingRequest(payment); setIsFormOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deletePayment(payment.id)}>
                  Delete
                </button>
              </div>
            </>
          )
        }
      />
{isFormOpen && (
        <PaymentForm
          initialData={editingRequest}
          onClose={() => setIsFormOpen(false)}
          onSubmit={async (data) => {
            if (editingRequest) {
              await updatePayment(editingRequest.id, data);
            } else {
              await createPayment(data);
            }
            setIsFormOpen(false);
          }}
        />
      )}
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

export default PaymentManager;
