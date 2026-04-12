
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LanguageBreakdown } from './LanguageBreakdown'
import styles from './LanguageChart.module.css';

const COLORS = [
    '#7C3AED',
    '#A78BFA',
    '#2563EB',
    '#38BDF8',
    '#059669',
    '#34D399',
    '#D97706',
    '#FB923C'
];

export function LanguageChart({ languages }) {
    if (!languages.length) return null;
    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                     <h3 className={styles.title}>Top Languages</h3>
                     <LanguageBreakdown languages={languages}/>
                </div>
           
            <ResponsiveContainer className={styles.graph} width="80%" height={290}> 
                <PieChart>
                    <Pie data={languages} dataKey="value" nameKey="name"
                        cx="45%" outerRadius={100} innerRadius={35}>
                            {languages.map((_,i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                    </Pie>
                    <Tooltip />
                    <Legend 
                        verticalAlign='bottom'
                        align='center'
                        iconType='circle'
                        iconSize={10}
                        wrapperStyle={{paddingRight: '30px'}}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}