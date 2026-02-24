const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../content/possibility_os/master_nodes.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Map of invalid names used in the JSON to valid lucide-react names
const iconMap = {
    "SolarPanel": "Sun",
    "Robot": "Bot",
    "Seedling": "Sprout",
    "City": "Building2",
    "Heartbeat": "Activity",
    "ChartLine": "LineChart",
    "Government": "Landmark",
    "Scales": "Scale",
    "Airplane": "Plane",
    "Airdrop": "Droplets",
    "FilmPlay": "Film",
    "Earth": "Globe2",
    "BarChart2": "BarChart",
};

let updated = 0;
data.forEach(node => {
    if (iconMap[node.icon]) {
        node.icon = iconMap[node.icon];
        updated++;
    }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Updated ${updated} icons in master_nodes.json`);
