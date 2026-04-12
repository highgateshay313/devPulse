
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './ActivityChart.module.css';

export  function ActivityChart({ chartData, loading}) {
    if (loading) return <Skeleton height="200px" borderRadius="10px" />;
    // if (!chartData.length) return <p>No recent activity.</p>

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Recent Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" tick={{ fill: "#8B949E", fontSize: 11}} />
                    <YAxis tick={{ fill: "#8B949E", fontSize: 11}} />
                    <Tooltip 
                        contentStyle={
                            {
                                background: '#161B22',
                                border: '1px solid #30363D',

                            }}
                        labelStyle={{ color: '#E6EDF3' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#3Ce30e"
                            fill="url(#activityGrad)" strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}