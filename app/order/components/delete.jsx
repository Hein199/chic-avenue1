'use client'

const DeleteButton = ({ orderId, userId }) => {
  const deleteOrder = async () => {
    const response = await fetch(`http://localhost:3000/api/order/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ orderId, userId }),
    });

    if (response.ok) {
      alert('Order deleted');
      window.location.reload();
    } else {
      alert('Failed to delete order');
    }
  };
  
  return (
    <button onClick={deleteOrder} className="delete">
      Delete
    </button>
  );
}

export default DeleteButton;