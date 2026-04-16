import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
    { name: "A", value: 40 },
    { name: "B", value: 30 }
];

export default function Donut({ difference, user }) {

    const renderCenter = ({ cx, cy }) => {
        return (
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                <tspan x={cx} dy="-30" fontSize="30">{user}</tspan>
                <tspan x={cx} dy="50" fontSize="50">{difference}</tspan>
                <tspan x={cx} dy="40" fontSize="15">euros en positif</tspan>
            </text>
        );
    };

    return (
        <PieChart width={300} height={300}>
            <Pie
                data={data}
                dataKey="value"
                innerRadius={120}
                outerRadius={150}
                labelLine={false}
                label={renderCenter}
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={["#8884d8", "#f472b6"][index]} />
                ))}
            </Pie>
        </PieChart>
    );
}