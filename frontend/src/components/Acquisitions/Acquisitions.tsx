import { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { getAcquisitions } from "../../services/getAcquisitions";
import { AcquisitionsTypes } from "../../types";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Acquisitions() {
  const { token } = useAuth();
  const [acquisitions, setAcquisitions] = useState<AcquisitionsTypes[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    setError(null);
    getAcquisitions(token)
      .then(setAcquisitions)
      .catch(() => setError("Could not load acquisitions. Try again."));
  }, [token]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const sortedAcquisitions = acquisitions
    .map((acq) => ({
      date: new Date(acq.timestamp * 1000),
      ore_sites: acq.ore_sites,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl mb-4">Satellite Acquisitions</h2>
      {error && <p className="text-red-500">{error}</p>}

      <p className="text-gray-600 mb-2">
        This chart shows the number of ore extraction sites based on satellite
        acquisition dates.
      </p>

      <div
        className="w-full max-w-2xl h-80"
        style={{ height: 350 }}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <LineChart
            data={sortedAcquisitions.map((acq) => ({
              date: formatDate(acq.date.getTime() / 1000),
              ore_sites: acq.ore_sites,
            }))}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{
                value: "Acquisition Date",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: "Number of Ore Sites",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="top"
            />
            <Line
              type="monotone"
              dataKey="ore_sites"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Acquisitions;
