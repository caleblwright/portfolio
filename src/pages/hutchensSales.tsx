import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

interface HutchensSale {
  _id: string;
  fileNumber: string;
  caseNumber: string;
  county: string;
  saleDate: string;
  propertyAddress: string;
  cityStateZip: string;
  trusteeFile: string;
  openingBidAmount: string;
}

export default function HutchensSales() {
  const [sales, setSales] = useState<HutchensSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch(import.meta.env.VITE_HUTCHENS_API_URL, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_HUTCHENS_API_KEY,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        interface RawSale {
          _id: string;
          file_number: string;
          case_number: string;
          county: string;
          sale_date: string;
          property_address: string;
          city_state_zip: string;
          trustee_file: string;
          opening_bid_amount: string;
        }

        const envelope = await res.json();
        const raw = JSON.parse(envelope.body) as RawSale[];

        const camelized = raw.map((item: RawSale) => ({
          _id: item._id,
          fileNumber: item.file_number,
          caseNumber: item.case_number,
          county: item.county,
          saleDate: item.sale_date,
          propertyAddress: item.property_address,
          cityStateZip: item.city_state_zip,
          trusteeFile: item.trustee_file,
          openingBidAmount: item.opening_bid_amount,
        }));

        setSales(camelized);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSales();
  }, []);

  if (loading) return <p>Loading sales data…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hutchens Foreclosure Sales</h1>
      <p className="mb-6">Welcome, {user?.email}</p>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">File #</th>
            <th className="border px-2 py-1 text-left">Case #</th>
            <th className="border px-2 py-1 text-left">County</th>
            <th className="border px-2 py-1 text-left">Sale Date</th>
            <th className="border px-2 py-1 text-left">Address</th>
            <th className="border px-2 py-1 text-left">City State Zip</th>
            <th className="border px-2 py-1 text-left">Trustee File</th>
            <th className="border px-2 py-1 text-right">Opening Bid</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id} className="even:bg-gray-100">
              <td className="border px-2 py-1">{sale.fileNumber}</td>
              <td className="border px-2 py-1">{sale.caseNumber}</td>
              <td className="border px-2 py-1">{sale.county}</td>
              <td className="border px-2 py-1">{sale.saleDate}</td>
              <td className="border px-2 py-1">{sale.propertyAddress}</td>
              <td className="border px-2 py-1">{sale.cityStateZip}</td>
              <td className="border px-2 py-1">{sale.trusteeFile}</td>
              <td className="border px-2 py-1 text-right">
                {sale.openingBidAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
