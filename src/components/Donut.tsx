import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
    { name: "A", value: 50 },
    { name: "B", value: 50 }
];

type DonutProps = {
    difference: string;
    user: string;
};

export default function Donut({ difference, user }: DonutProps) {

    const renderCenter = ({ cx, cy }: { cx: number; cy: number }) => {
        return (
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                <tspan x={cx} dy="-35" fontSize="30">{user}</tspan>
                <tspan x={cx} dy="40" fontSize="50">{difference}</tspan>
                <tspan x={cx} dy="35" fontSize="15">euros en positif</tspan>
            </text>
        );
    };

    return (
        <PieChart width={300} height={300}>
            <Pie
                data={data}
                dataKey="value"
                cx={150}
                cy={150}
                innerRadius={100}
                outerRadius={130}
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