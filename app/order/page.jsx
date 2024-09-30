import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "./components/delete";

const MyOrdersPage = async () => {
  const cookieStore = cookies();
  const id = cookieStore.get("id")?.value;
  const response = await fetch(`https://chic-avenue1.vercel.app/api/order/user/${id}`);
  const data = await response.json();
  const orders = data.orders;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1>My Orders</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice._id}</TableCell>
              <TableCell>{invoice.createdAt}</TableCell>
              <TableCell className="text-right">
                ${invoice.totalAmount}
              </TableCell>
              <TableCell className="text-right">
                <DeleteButton orderId={invoice._id} userId={id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrdersPage;

export const fetchCache = 'force-no-store';
